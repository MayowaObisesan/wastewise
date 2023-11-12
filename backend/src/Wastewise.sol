// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import {RwasteWise} from "./RwasteWise.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title WasteWise: A smart contract for managing user recycling information and rewards.
contract WasteWise {
    RwasteWise rwasteWise; // An instance of RwasteWise contract.

    enum Role {
        ADMINS,
        VERIFIERS,
        USERS
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
        Purchase
    }

    /// @dev Structure to represent a recycling transaction.
    struct Recycled {
        uint timeRecycled; // Timestamp when the recycling took place.
        uint qtyRecycled;
    }

    /// @dev Mapping to track recycling transactions for each user.
    mapping(address => Recycled[]) RecycledMap;

    mapping(address => Transaction[]) transactionsMap;

    /// @dev Mapping to store user data.
    mapping(address => User) public UserMap;

    User[] allUsers; // An array to store all user data.
    address[] public allAdmins; // An array to store all admins
    uint public userId; // A counter to track the number of users in the system.

    // Custom Errors
    error UserAcctNotCreated();
    error ZeroAmountNotAllow();
    error UserAccountAlreadyExist();

    // Events
    event UserAccountCreated(
        uint256 userId,
        string _name,
        string _country,
        Gender _gender,
        uint256 _phone,
        string _email,
        address user,
        uint256 timeJoined
    );

    event PlasticDeposited(
        address depositor,
        uint256 _qtyrecycled,
        uint timeRecycled,
        uint256 tokenQty
    );

    event UserEdited(
        string name,
        string country,
        string email,
        uint256 phoneNo,
        Gender gender
    );

    event AdminSeeded(address adminAddress);

    // MODIFIERS
    modifier onlyVerifiers() {
        require(
            UserMap[msg.sender].role == Role.VERIFIERS ||
                UserMap[msg.sender].role == Role.ADMINS,
            "Only the verifiers can call this function"
        );
        _;
    }

    modifier onlyAdmins() {
        require(
            UserMap[msg.sender].role == Role.ADMINS,
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
            // User storage newAdmin;
            allAdmins.push(_admins[i]);
        }
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
        user.id = userId;
        user.name = _name;
        user.userAddr = msg.sender;
        user.country = _country;
        user.gender = _gender;
        user.phoneNo = _phone;
        user.email = _email;
        user.timeJoined = block.timestamp;

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
        allUsers.push(user);
    }

    /// @dev Record a plastic recycling transaction for the user.
    /// @param _qtyrecycled The quantity of plastic recycled.
    function depositPlastic(uint _qtyrecycled) external {
        User storage user = UserMap[msg.sender];
        if (user.userAddr != msg.sender) {
            revert UserAcctNotCreated();
        }

        if (_qtyrecycled == 0) revert ZeroAmountNotAllow();

        // Create a new transaction
        Transaction memory transaction;
        transaction.date = block.timestamp;
        transaction.typeOfTransaction = Type.Recycle;
        transaction.numberOfTokens = _qtyrecycled;

        // Store the transaction for the user
        transactionsMap[msg.sender].push(transaction);

        // Create a new Recycled struct
        Recycled memory recycled;
        recycled.qtyRecycled = _qtyrecycled;
        recycled.timeRecycled = block.timestamp;
        RecycledMap[msg.sender].push(recycled);

        // Update user TokenQty
        user.tokenQty = user.tokenQty + _qtyrecycled;

        // Mint receiptTokens of the same amount, `_qtyrecycled`, to the user upon successful recycling
        rwasteWise.mintReceipt(msg.sender, _qtyrecycled * 10 ** 18);

        emit PlasticDeposited(
            msg.sender,
            _qtyrecycled,
            block.timestamp,
            user.tokenQty
        );
    }

    /// @dev Get all recycling transactions for the user.
    /// @return An array of recycling transactions for the user.
    function getUserRecycles() public view returns (Recycled[] memory) {
        return RecycledMap[msg.sender];
    }

    /// @dev Get all recycling transactions for the user.
    /// @return An array of recycling transactions for the user.
    function getAllUserRecycles() public view returns (Recycled[] memory) {
        User[] memory _users = allUsers;
        Recycled[] memory allRecycled;
        for (uint i = 0; i < _users.length; ) {
            // Recycled[] memory myRecycled = RecycledMap[_users[i].userAddr];
            // for (uint j = 0; j < myRecycled.length; ) {
            //     allRecycled.push(myRecycled[j]);
            // }
            // i++;
        }
        return allRecycled;
    }

    function getUserTransactions() public view returns (Transaction[] memory) {
        return transactionsMap[msg.sender];
    }

    /// @dev Edit user information.
    /// @param _user The updated user information.
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

        emit UserEdited(
            user.name,
            user.country,
            user.email,
            user.phoneNo,
            user.gender
        );
    }

    /// @dev Get all user data.
    /// @return An array of all users' data.
    function getAllUsers() public view returns (User[] memory) {
        return allUsers;
    }

    /// @dev Get the user's data.
    /// @return The user's data.
    function getUser() public view returns (User memory) {
        return UserMap[msg.sender];
    }

    function getAdmin() public view returns (address[] memory) {
        return allAdmins;
    }

    function addAdmins(address _addr) public view onlyAdmins {
        // TODO: Add address to admin array
        // TODO: Must be approved by 2/3 of the admins
    }

    function approveNewAdmin(address _addr) public view onlyAdmins {
        // TODO:Only admins can call this function.
        // TODO: Check that the address to be called is added to the admin array
        // uint i;
        // for (i = 0; i < allAdmins.length; ) {
        //     if (allAdmins[i].userAddr == _addr) {
        //         // TODO: Increase the approval count for this address
        //     }
        // }
    }
}
