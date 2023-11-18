// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import {RwasteWise} from "./RwasteWise.sol";
import {console2} from "forge-std/Test.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title  WasteWise: A smart contract for managing user recycling information and rewards.
 * @author Marcellus Ifeanyi, Mayowa Obisesan, Biliqis Onikoyi, Isaac Wanger, konyeri Joshua
 */
contract WasteWise {
    RwasteWise rwasteWise; // An instance of RwasteWise contract.

    // Create state variables that will be used for statistics
    struct Statistics {
        uint totalUsers;
        uint totalAdmins;
        uint totalVerifiers;
        uint totalRecycled;
        uint totalTransactions;
        uint totalMarketplaceEvents;
        uint totalExpiredMarketplaceEvents;
        uint totalMinted;
        uint totalSupply;
    }

    enum Role {
        USERS,
        ADMINS,
        VERIFIERS
    }

    /// @dev Structure to represent a user in the system.
    struct User {
        uint id;
        address userAddr;
        string name;
        string country;
        Gender gender;
        uint phoneNo;
        string email;
        uint timeJoined;
        address referral;
        uint tokenQty;
        bool isAdmin;
        Role role;
        // uint approvalCount;
    }

    struct Transaction {
        uint date;
        Type typeOfTransaction;
        uint numberOfTokens;
        TxStatus status;
    }

    enum TxStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    enum Gender {
        Female,
        Male
    }

    enum Type {
        Recycle,
        Purchase,
        User
    }

    /// @dev Structure to represent a recycling transaction.
    struct Recycled {
        uint timeRecycled; // Timestamp when the recycling took place.
        uint qtyRecycled;
    }

    struct AdminRequest {
        uint approvalCount;
        bool requestStatus;
    }

    /// @dev Mapping to track recycling transactions for each user.
    mapping(address => Recycled[]) RecycledMap;

    mapping(address => Transaction[]) public transactionsMap;

    /// @dev Mapping to store user data.
    mapping(address => User) public UserMap;

    mapping(uint => AdminRequest) adminRequest;
    mapping(address => mapping(address => bool)) hasApprovedAdmin;
    mapping(uint => address) IdToAddress;

    Statistics public statistics;

    uint adminReqId;

    User[] allUsers; // An array to store all user data.
    //User[] allAdmins; // An array to store all admins
    User[] verifiers;
    address[] public allAdmins; // An array to store all admins

    uint public userId; // A counter to track the number of users in the system.

    // Custom Errors
    error UserAcctNotCreated();
    error ZeroAmountNotAllow();
    error UserAccountAlreadyExist();
    error UserDoesNotExist();
    error ExpectNonAdmin();
    error AdminAlreadyApproved(address _addr);
    error TheAddressIsNotInTheAdminArray();
    error VerifierAlreadyExist();
    error UserIsNotVerifier();

    // Events
    event UserAccountCreated(
        uint256 indexed userId,
        string _name,
        string _country,
        Gender _gender,
        uint256 _phone,
        string indexed _email,
        address indexed user,
        uint256 timeJoined
    );

    event PlasticDeposited(
        address indexed depositor,
        uint256 indexed _qtyrecycled,
        uint timeRecycled,
        uint256 indexed tokenQty
    );

    event UserEdited(
        address indexed userAddr,
        string indexed name,
        string indexed email,
        string country,
        uint256 phoneNo,
        Gender gender
    );

    event AdminSeeded(address indexed adminAddress);
    event AdminAdded(address indexed newAdmin, address indexed admins);
    event NewAdminApproved(address indexed newAdmin, address indexed admins);
    event VerifierAdded(address indexed verifier, address indexed admins);
    event VerifierRemoved(address indexed verifier, address indexed admins);
    event StatisticsUpdated(Statistics _statistics);

    error OnlyTheVerifiersCanCallThisFunction();

    // MODIFIERS
    modifier onlyVerifiers() {
        require(
            UserMap[msg.sender].role == Role.VERIFIERS,
            "Only the verifiers can call this function"
        );
        _;
    }

    modifier onlyAdmins() {
        require(
            UserMap[msg.sender].role == Role.ADMINS &&
                UserMap[msg.sender].isAdmin,
            "Only the Admin can call this function"
        );
        _;
    }

    constructor(address tokenAddress, address[] memory _admins) {
        rwasteWise = RwasteWise(tokenAddress);
        // Set each address in _admins as an admin
        for (uint i = 0; i < _admins.length; i++) {
            User storage user = UserMap[_admins[i]];
            user.isAdmin = true;
            user.role = Role.ADMINS;
            // User storage newAdmin;
            allAdmins.push(_admins[i]);
        }

        Statistics memory _stats;
        _stats.totalAdmins = statistics.totalAdmins + _admins.length;
        _stats.totalUsers = statistics.totalUsers + _admins.length;
        statistics.totalAdmins = _stats.totalAdmins;
        statistics.totalUsers = _stats.totalUsers;
    }

    function createUserAcct(
        string memory _name,
        string memory _country,
        Gender _gender,
        uint _phone,
        string memory _email
    ) public {
        userId++;

        if (UserMap[msg.sender].userAddr == msg.sender) {
            revert UserAccountAlreadyExist();
        }
        User storage user = UserMap[msg.sender];

        // TODO: Email should be unique.
        // TODO: Implement the test as well

        user.id = userId;
        user.name = _name;
        user.userAddr = msg.sender;
        user.country = _country;
        user.gender = _gender;
        user.phoneNo = _phone;
        user.email = _email;
        user.timeJoined = block.timestamp;
        IdToAddress[userId] = msg.sender;

        allUsers.push(user);

        // Avoid reading and updating Statistics from state directly.
        Statistics memory _stats;
        _stats.totalUsers = statistics.totalUsers + 1;
        statistics.totalUsers = _stats.totalUsers;

        emit UserAccountCreated(
            userId,
            _name,
            _country,
            _gender,
            _phone,
            _email,
            msg.sender,
            block.timestamp
        );
        emit StatisticsUpdated(statistics);
    }

    /**
     * @param _qtyrecycled _qtyrecycled The quantity of plastic recycled.
     * @param _userId the unique Id of the User
     * @dev Record a plastic recycling transaction for the user.
     */

    function depositPlastic(
        uint _qtyrecycled,
        uint _userId
    ) external onlyVerifiers {
        address _userAddr = IdToAddress[_userId];
        if (_userAddr == address(0)) {
            revert UserDoesNotExist();
        }

        User storage user = UserMap[_userAddr];

        if (_qtyrecycled == 0) revert ZeroAmountNotAllow();

        // Create a new Recycled struct
        Recycled memory recycled;
        recycled.qtyRecycled = _qtyrecycled;
        recycled.timeRecycled = block.timestamp;
        RecycledMap[_userAddr].push(recycled);

        // Create a new transaction
        Transaction memory transaction;
        transaction.date = block.timestamp;
        transaction.typeOfTransaction = Type.Recycle;
        transaction.numberOfTokens = _qtyrecycled;

        // Store the transaction for the user
        transactionsMap[_userAddr].push(transaction);

        // Update user TokenQty
        user.tokenQty = user.tokenQty + _qtyrecycled;

        // Mint receiptTokens of the same amount, `_qtyrecycled`, to the user upon successful recycling
        rwasteWise.mintReceipt(_userAddr, _qtyrecycled * 10 ** 18);

        // Avoid updating Statistics from state directly.
        Statistics memory _stats;
        // Increase the minted statistics, recycled and transactions
        _stats.totalMinted = statistics.totalMinted + _qtyrecycled;
        _stats.totalRecycled = statistics.totalRecycled + _qtyrecycled;
        _stats.totalTransactions = statistics.totalTransactions + 1;
        statistics.totalMinted = _stats.totalMinted;
        statistics.totalRecycled = _stats.totalRecycled;
        statistics.totalTransactions = _stats.totalTransactions;

        emit PlasticDeposited(
            _userAddr,
            _qtyrecycled,
            block.timestamp,
            user.tokenQty
        );
    }

    /**
     * @dev Get all recycling transactions for the user.
     * @return An array of recycling transactions for the user.
     */
    function getUserRecycles() public view returns (Recycled[] memory) {
        return RecycledMap[msg.sender];
    }

    function getUserTransactions() public view returns (Transaction[] memory) {
        return transactionsMap[msg.sender];
    }

    /**
     * @param _user The updated user information.
     * @dev Edit user information.
     */
    function editUser(User calldata _user) public {
        if (UserMap[_user.userAddr].userAddr != _user.userAddr) {
            revert UserAcctNotCreated();
        }
        User storage user = UserMap[_user.userAddr];
        user.name = _user.name;
        user.country = _user.country;
        user.email = _user.email;
        user.phoneNo = _user.phoneNo;
        user.gender = _user.gender;

        // Create a new transaction
        Transaction memory transaction;
        transaction.date = block.timestamp;
        transaction.typeOfTransaction = Type.User;

        // Store the transaction for the user
        transactionsMap[msg.sender].push(transaction);

        // Avoid updating Statistics from state directly.
        Statistics memory _stats;
        _stats.totalTransactions = statistics.totalTransactions + 1;
        statistics.totalTransactions = _stats.totalTransactions;

        emit UserEdited(
            user.userAddr,
            user.name,
            user.email,
            user.country,
            user.phoneNo,
            user.gender
        );
    }

    /**
     * @dev Get all user data.
     * @return An array of all users' data.
     */
    function getAllUsers() public view returns (User[] memory) {
        return allUsers;
    }

    /**
     * @dev Get all user data.
     * @return An array of all verifiers' data.
     */
    function getVerifiers() public view returns (User[] memory) {
        return verifiers;
    }

    /**
     * @dev Get the user's data.
     * @return The user's data.
     */
    function getUser() public view returns (User memory) {
        return UserMap[msg.sender];
    }

    function getUserById(uint256 _userId) public view returns (User memory) {
        address userAddr = IdToAddress[_userId];
        return UserMap[userAddr];
    }

    function getAdmins() public view returns (address[] memory) {
        return allAdmins;
    }

    function addAdmins(address _addr) public onlyAdmins {
        // Check that the User has been created
        if (_addr != UserMap[_addr].userAddr) {
            revert UserDoesNotExist();
        }
        // checks that `address of the user` is not already an Admin, before adding it to the admin list
        if (UserMap[_addr].isAdmin) {
            revert ExpectNonAdmin();
        }

        // Create a Request for that user to add as admin
        ++adminReqId;
        AdminRequest storage _adminReq = adminRequest[adminReqId];
        _adminReq.requestStatus = false;

        // Emit an event for when that user is enlisted as an admin
        emit AdminAdded(_addr, msg.sender);

        // Automatically approve the user address as the admin being added
        approveNewAdmin(_addr);
    }

    function approveNewAdmin(address _addr) public onlyAdmins {
        // Check that this user has not already approved this user before.
        if (hasApprovedAdmin[_addr][msg.sender]) {
            revert AdminAlreadyApproved(_addr);
        }

        hasApprovedAdmin[_addr][msg.sender] = true;

        AdminRequest storage _adminReq = adminRequest[adminReqId];
        _adminReq.approvalCount += 1;

        // Get 2/3 of admins from allAdmins array.
        uint twoThirdAdmins = (2 * allAdmins.length) / 3;
        if (_adminReq.approvalCount >= twoThirdAdmins) {
            // Automatically add that user as an admin to the admin array

            UserMap[_addr].role = Role.ADMINS;
            allAdmins.push(_addr);
            _adminReq.requestStatus = true;

            Statistics memory _stats;
            _stats.totalAdmins = statistics.totalAdmins + 1;
            statistics.totalAdmins = _stats.totalAdmins;
        }

        emit NewAdminApproved(_addr, msg.sender);
    }

    function addVerifiers(address _addr) public onlyAdmins {
        if (_addr != UserMap[_addr].userAddr) {
            revert UserDoesNotExist();
        }

        if (UserMap[_addr].role == Role.VERIFIERS) {
            revert VerifierAlreadyExist();
        }

        UserMap[_addr].role = Role.VERIFIERS;
        verifiers.push(UserMap[_addr]);

        // Create a new transaction
        Transaction memory transaction;
        transaction.date = block.timestamp;
        transaction.typeOfTransaction = Type.User;

        // Store the transaction for the user
        transactionsMap[msg.sender].push(transaction);

        Statistics memory _stats;
        // Increase the transactions
        _stats.totalTransactions = statistics.totalTransactions + 1;
        statistics.totalTransactions = _stats.totalTransactions;

        emit VerifierAdded(_addr, msg.sender);
    }

    function removeVerifiers(address _addr) public onlyAdmins {
        if (_addr != UserMap[_addr].userAddr) {
            revert UserDoesNotExist();
        }

        if (UserMap[_addr].role != Role.VERIFIERS) {
            revert UserIsNotVerifier();
        }

        // Remove the user from the verifiers array
        for (uint i = 0; i < verifiers.length; i++) {
            if (verifiers[i].userAddr == _addr) {
                verifiers[i] = verifiers[verifiers.length - 1];
                verifiers.pop();
                break;
            }
        }

        // Update the user's role
        UserMap[_addr].role = Role.VERIFIERS;

        Statistics memory _stats;
        // Increase the minted statistics, recycled and transactions
        _stats.totalTransactions = statistics.totalTransactions - 1;
        statistics.totalTransactions = _stats.totalTransactions;

        emit VerifierRemoved(_addr, msg.sender);
    }

    function getStatistics() public view returns (Statistics memory) {
        return statistics;
    }

    function getAdminRequest(
        uint id
    ) public view returns (AdminRequest memory) {
        return adminRequest[id];
    }
}
