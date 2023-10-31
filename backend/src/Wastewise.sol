// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;
import {RwasteWise} from "./RwasteWise.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WasteWise {
    RwasteWise rwasteWise;
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
        Female,
        Male
    }
    struct Recycled {
        uint timeRecycled;
        uint qtyRecycled;
    }
    mapping(address => Recycled) RecycledMap;
    mapping(address => User) UserMap;

    uint public userId;

    // Custom Errors
    error UserAcctNotCreated();

    constructor() {}

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
    }

    function depositPlastic(uint _qtyrecycled) external {
        User storage user = UserMap[msg.sender];
        Recycled storage recycled = RecycledMap[msg.sender];
        if (user.userAddr != msg.sender) {
            revert UserAcctNotCreated();
        }

        recycled.qtyRecycled = _qtyrecycled;
        recycled.timeRecycled = block.timestamp;

        // Updates user TokenQty
        user.TokenQty = user.TokenQty + _qtyrecycled;
        // create new contract instance
        rwasteWise = new RwasteWise();
        // mints receiptTokens of the same amount, `_qtyrecycled` to user upon successful recycling
        rwasteWise.mintReceipt(msg.sender, _qtyrecycled);
    }
}
