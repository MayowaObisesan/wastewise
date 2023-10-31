// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
import {RwasteWise} from "./RwasteWise.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title WasteWise: A smart contract for managing user recycling information.
contract WasteWise {
    struct User {
        uint Id;
        address userAddr;
        string name;
        string country;
        Gender gender;
        Recycled recycled;
        uint phone_no;
        string email;
        uint timeJoined;
        string referral;
        uint TokenQty;
    }

    enum Gender {
        Female, Male
    }

    struct Recycled {
        uint timeRecycled;
        uint qtyRecycled;
    }

    /// @dev Mapping to track recycled data for each user.
    mapping(address => Recycled) RecycledMap;

    /// @dev Mapping to store user data.
    mapping(address => User) UserMap;

    uint public userId; // Variable to keep track of the total number of users.

    error UserAcctNotCreated(); // Custom error for when a user account is not created.

    /// @dev Create a new user account.
    /// @param _name The user's name.
    /// @param _country The user's country.
    /// @param _gender The user's gender (0 for Female, 1 for Male).
    /// @param _phone The user's phone number.
    /// @param _email The user's email address.
    function createUserAcct(string memory _name, string memory _country, Gender _gender, uint _phone, string memory _email) external {
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
    }

    /// @dev Record the quantity of plastic recycled by a user.
    /// @param _qtyrecycled The quantity of plastic recycled.
    function depositPlastic(uint _qtyrecycled) external {
        User storage user = UserMap[msg.sender];
        Recycled storage recycled = RecycledMap[msg.sender];
        if (user.userAddr != msg.sender) {
            revert UserAcctNotCreated(); // Revert if the user account does not exist.
        }

        recycled.qtyRecycled = _qtyrecycled;
        recycled.timeRecycled = block.timestamp;
    }

    /// @dev Edit user information.
    /// @param _user The updated user information.
    function editUser(User calldata _user) public {
        if (UserMap[_user.userAddr].userAddr != _user.userAddr) {
            revert UserAcctNotCreated(); // Revert if the user account does not exist.
        }
        User storage user = UserMap[_user.userAddr];
        user.name = _user.name;
        user.country = _user.country;
        user.email = _user.email;
        user.phone_no = _user.phone_no;
        user.gender = _user.gender;
    }
}