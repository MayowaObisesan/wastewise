// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {RwasteWise} from "./RwasteWise.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title WasteWise: A smart contract for managing user recycling information and rewards.
contract WasteWise {
    RwasteWise rwasteWise; // An instance of RwasteWise contract.

    /// @dev Structure to represent a user in the system.
    struct User {
        uint Id;
        address userAddr;
        string name;
        string country;
        Gender gender;
        uint phone_no;
        string email; 
        uint timeJoined;
        address referral; 
        uint tokenQty; 
    }

    enum Gender {
        Female, Male
    }

    /// @dev Structure to represent a recycling transaction.
    struct Recycled {
        uint timeRecycled; // Timestamp when the recycling took place.
        uint qtyRecycled; 
    }

    /// @dev Mapping to track recycling transactions for each user.
    mapping(address => Recycled[]) RecycledMap;

    /// @dev Mapping to store user data.
    mapping(address => User) UserMap;

    User[] allUsers; // An array to store all user data.
    uint public userId; // A counter to track the number of users in the system.

    // Custom Errors
    error UserAcctNotCreated(); // Custom error for when a user account is not created.
    error ZeroAmountNotAllow();

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

    event UserEditted(
        string name,
        string country,
        string email,
        uint256 phone_no,
        Gender gender
    );

    constructor() {}

    /// @dev Create a new user account.
    /// @param _name The user's name.
    /// @param _country The user's country.
    /// @param _gender The user's gender (0 for Female, 1 for Male).
    /// @param _phone The user's phone number.
    /// @param _email The user's email address.
    function createUserAcct(
        string memory _name,
        string memory _country,
        Gender _gender,
        uint _phone,
        string memory _email
    ) external {
        userId++;
        User storage user = UserMap[msg.sender];
        user.Id = userId;
        user.name = _name;
        user.userAddr = msg.sender;
        user.country = _country;
        user.gender = _gender;
        user.phone_no = _phone;
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

        Recycled memory recycled;
        recycled.qtyRecycled = _qtyrecycled;
        recycled.timeRecycled = block.timestamp;
        RecycledMap[msg.sender].push(recycled);

        // Updates user TokenQty
        user.tokenQty = user.tokenQty + _qtyrecycled;

        // Create a new contract instance
        rwasteWise = new RwasteWise();
        // Mints receiptTokens of the same amount, `_qtyrecycled`, to the user upon successful recycling
        rwasteWise.mintReceipt(msg.sender, _qtyrecycled);

        emit PlasticDeposited(
            msg.sender,
            _qtyrecycled,
            block.timestamp,
            user.tokenQty
        );
    }

    /// @dev Get all recycling transactions for the user.
    /// @return An array of recycling transactions for the user.
    function getAllUserTransaction() public view returns (Recycled[] memory) {
        return RecycledMap[msg.sender];
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
        user.phone_no = _user.phone_no;
        user.gender = _user.gender;

        emit UserEditted(
            user.name,
            user.country,
            user.email,
            user.phone_no,
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
    function getUser() public view returns (User) {
        return UserMap[msg.sender];
    }
}
