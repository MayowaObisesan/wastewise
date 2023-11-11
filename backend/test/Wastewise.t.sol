// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {WasteWise} from "../src/Wastewise.sol";
import {RwasteWise} from "../src/RwasteWise.sol";
import {Helpers} from "./Helpers.sol";

contract WastewiseTest is Helpers {
    WasteWise wasteWise;
    RwasteWise wasteToken;

    // Test Users Address
    address userA;
    address userB;
    address userC;

    uint pKeyA;
    uint pKeyB;
    uint pKeyC;

    address[] admins;

    WasteWise.User uObject;

    function setUp() public {
        (userA, pKeyA) = mkaddr("USERA");
        (userB, pKeyB) = mkaddr("USERB");
        switchSigner(userA);
        admins.push(userA);
        admins.push(userB);

        wasteToken = new RwasteWise();
        wasteWise = new WasteWise(address(wasteToken), admins);

        wasteToken.mint(userA, 10 ether);

        uObject = WasteWise.User({
            id: 1,
            userAddr: address(0),
            name: "Mayowa",
            country: "Nigeria",
            gender: WasteWise.Gender.Male,
            phoneNo: 18087989548,
            email: "mayowaobi74@gmail.com",
            timeJoined: block.timestamp,
            referral: address(0),
            tokenQty: 10,
            isAdmin: true,
            role: WasteWise.Role.ADMINS
        });
    }

    function testCreateUser() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        assertEq(wasteWise.getAllUsers().length, 1);
    }

    function testCreateUserData() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        WasteWise.User memory user = wasteWise.getUser();
        assertEq(user.name, uObject.name);
        assertEq(user.country, uObject.country);
        assertEq(uint(user.gender), uint(uObject.gender));
        assertEq(user.phoneNo, uObject.phoneNo);
        assertEq(user.email, uObject.email);
    }

    function testUserIsAdmin() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        WasteWise.User memory user = wasteWise.getUser();
        assertEq(user.isAdmin, true);
    }

    function testFailCreateUser() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        vm.expectRevert(WasteWise.UserAccountAlreadyExist.selector);
    }

    function testFailDepositPlastic() public {
        // Don't create a user before trying to deposit plastic. This test will fail
        wasteWise.depositPlastic(10);
    }

    function testFailDepositPlasticModifier() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.depositPlastic(1);
        WasteWise.User memory user = wasteWise.getUser();
        vm.expectRevert(WasteWise.ZeroAmountNotAllow.selector);
    }

    function testFailDepositPlasticZeroAmount() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.depositPlastic(0);
        vm.expectRevert(WasteWise.ZeroAmountNotAllow.selector);
    }

    function testDepositPlasticTransactionLength() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.depositPlastic(4);
        WasteWise.Transaction[] memory transaction = wasteWise
            .getUserTransactions();
        assertEq(transaction.length, 1);
    }

    function testDepositPlasticTransactionQtyCount() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.depositPlastic(4);
        WasteWise.Transaction[] memory transaction = wasteWise
            .getUserTransactions();
        assertEq(transaction[0].numberOfTokens, 4);
    }

    function testFailDepositPlasticTransactionQtyCount() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.depositPlastic(4);
        WasteWise.Transaction[] memory transaction = wasteWise
            .getUserTransactions();
        assertEq(transaction[0].numberOfTokens, 1);
    }

    function testDepositPlasticRecycledQtyCount() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.depositPlastic(4);
        WasteWise.Recycled[] memory recycled = wasteWise.getUserRecycles();
        assertEq(recycled[0].qtyRecycled, 4);
    }

    function testDepositPlasticUserTotalQtyCount() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.depositPlastic(4);
        wasteWise.depositPlastic(8);

        // Test the user's totalQuantity count if it increases with every user deposit
        WasteWise.User memory user = wasteWise.getUser();
        assertEq(user.tokenQty, 12);
    }

    function testDepositPlasticMintBalance() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.depositPlastic(4);
        wasteWise.depositPlastic(8);

        // Test the user's wiseToken as a receipt for depositing Tokens
        // The balance will be the initial minted token + this deposit accrued token quantity
        uint balance = wasteToken.balanceOf(userA);
        assertEq(balance, 22 ether);
    }

    function testEditUser() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        WasteWise.User memory user = wasteWise.getUser();
        user.name = "Blessed";
        wasteWise.editUser(user);
        assertEq(user.name, "Blessed");
    }

    function testFailEditUserFail() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        WasteWise.User memory user = wasteWise.getUser();
        user.name = "Blessed";
        wasteWise.editUser(user);
        assertEq(user.name, "Mayowa");
    }

    function testFailEditUserRevert() public {
        WasteWise.User memory user = wasteWise.getUser();
        user.name = "Blessed";
        wasteWise.editUser(user);
        assertEq(user.name, "Mayowa");
    }

    function testFuzz_SetNumber(uint256 x) public {
        // counter.setNumber(x);
        // assertEq(counter.number(), x);
    }
}
