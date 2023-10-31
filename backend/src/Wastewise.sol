// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract WasteWise{
    struct User{
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
    enum Gender{
        Female, Male
    }
    struct Recycled{
        uint timeRecycled;
        uint qtyRecycled;
    }
    mapping(address => Recycled) RecycledMap;
    mapping(address => User) UserMap;

    uint public userId;

    error UserAcctNotCreated();
    function createUserAcct(string memory _name, string memory _country, Gender _gender, uint _phone,string memory _email) external {
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
    function  depositPlastic(uint _qtyrecycled) external{
        User storage user = UserMap[msg.sender];
        Recycled storage recycled = RecycledMap[msg.sender];
        if(user.userAddr != msg.sender){
            revert UserAcctNotCreated();
        }
    
        recycled.qtyRecycled = _qtyrecycled;
        recycled.timeRecycled = block.timestamp;        
    }

    function editUser(User calldata _user) public {
        if(UserMap[_user.userAddr].userAddr != _user.userAddr){
            revert UserAcctNotCreated();
        }
        User storage user = UserMap[_user.userAddr];
        user.name = _user.name;
        user.country = _user.country;
        user.email = _user.email;
        user.phone_no = _user.phone_no;
        user.gender = _user.gender;

    }

    
}