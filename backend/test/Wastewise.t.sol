// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {WasteWise} from "../src/Wastewise.sol";
import {RwasteWise} from "../src/RwasteWise.sol";

import {MarketPlace} from "../src/MarketPlace.sol";
import {Helpers} from "./Helpers.sol";

contract WastewiseTest is Helpers {
    WasteWise wasteWise;
    RwasteWise wasteToken;
    MarketPlace marketPlace;

    // Test Users Address
    address userA;
    address userB;
    address userC;
    address userD;
    address userE;
    address userF;

    uint pKeyA;
    uint pKeyB;
    uint pKeyC;
    uint pKeyD;
    uint pKeyE;
    uint pKeyF;

    address[] admins;

    WasteWise.User uObject; // Admin User
    WasteWise.User aObject; // Admin User
    WasteWise.User vObject; // Verifier User
    MarketPlace.ItemInfo itemInfo;

    function setUp() public {
        (userA, pKeyA) = mkaddr("USERA");
        (userB, pKeyB) = mkaddr("USERB");
        (userC, pKeyC) = mkaddr("USERC");
        (userD, pKeyD) = mkaddr("USERD");
        (userE, pKeyE) = mkaddr("USERE");
        (userF, pKeyF) = mkaddr("USERF");
        switchSigner(userA);
        admins.push(userA);
        admins.push(userB);
        admins.push(userC);
        admins.push(userD);
        admins.push(userE);

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
            email: "mayowa@gmail.com",
            timeJoined: block.timestamp,
            referral: address(0),
            tokenQty: 10,
            isAdmin: true,
            role: WasteWise.Role.ADMINS
            // approvalCount: 5
        });

        vObject = WasteWise.User({
            id: 2,
            userAddr: userF,
            name: "Blessed",
            country: "Nigeria",
            gender: WasteWise.Gender.Male,
            phoneNo: 18087989548,
            email: "mayowa2@gmail.com",
            timeJoined: block.timestamp,
            referral: address(0),
            tokenQty: 10,
            isAdmin: false,
            role: WasteWise.Role.VERIFIERS
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

    function testCreateMultipleUser() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        switchSigner(userB);
        wasteWise.createUserAcct(
            "Blessed",
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        assertEq(wasteWise.getAllUsers().length, 2);
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
        assertEq(user.id, 1);
        assertEq(user.name, uObject.name);
        assertEq(user.country, uObject.country);
        assertEq(uint(user.gender), uint(uObject.gender));
        assertEq(user.phoneNo, uObject.phoneNo);
        assertEq(user.email, uObject.email);
    }

    function testCreateMultipleUserData() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        WasteWise.User memory user = wasteWise.getUser();
        assertEq(user.id, 1);
        assertEq(user.name, uObject.name);
        assertEq(user.country, uObject.country);
        assertEq(uint(user.gender), uint(uObject.gender));
        assertEq(user.phoneNo, uObject.phoneNo);
        assertEq(user.email, uObject.email);

        switchSigner(userB);
        wasteWise.createUserAcct(
            "Blessed",
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        WasteWise.User memory user2 = wasteWise.getUser();
        assertEq(user2.id, 2);
        assertEq(user2.name, "Blessed");
        assertEq(user2.country, uObject.country);
        assertEq(uint(user2.gender), uint(uObject.gender));
        assertEq(user2.phoneNo, uObject.phoneNo);
        assertEq(user2.email, uObject.email);
    }

    function testCreateMultipleUserStatistics() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        // switch user
        switchSigner(userB);
        wasteWise.createUserAcct(
            "Blessed",
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        // Test the statistics
        WasteWise.Statistics memory _stats = wasteWise.getStatistics();
        // 5 admins created at constructor + 2 admins created above = 4 users
        assertEq(_stats.totalUsers, admins.length + 2);
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
        wasteWise.depositPlastic(10, 1);
    }

    function testFailDepositPlasticModifier() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.depositPlastic(1, 1);
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
        wasteWise.depositPlastic(0, 1);
        vm.expectRevert(WasteWise.ZeroAmountNotAllow.selector);
    }

    function testDepositPlasticTransactionLength() public {
        wasteWise.createUserAcct(
            vObject.name,
            vObject.country,
            vObject.gender,
            vObject.phoneNo,
            vObject.email
        );
        WasteWise.User memory user2 = wasteWise.getUser();
        wasteWise.addVerifiers(user2.userAddr);
        vm.startPrank(user2.userAddr);
        wasteWise.depositPlastic(4, 1);
        WasteWise.Transaction[] memory transaction = wasteWise
            .getUserTransactions();
        assertEq(transaction.length, 2);
    }

    function testDepositPlasticStatistics() public {
        wasteWise.createUserAcct(
            vObject.name,
            vObject.country,
            vObject.gender,
            vObject.phoneNo,
            vObject.email
        );
        WasteWise.User memory user2 = wasteWise.getUser();
        wasteWise.addVerifiers(user2.userAddr);
        vm.startPrank(user2.userAddr);
        wasteWise.depositPlastic(4, 1);

        WasteWise.Statistics memory _stats = wasteWise.getStatistics();
        assertEq(_stats.totalTransactions, 2);
        assertEq(_stats.totalRecycled, 4);
        assertEq(_stats.totalMinted, 4);
    }

    function testDepositPlasticTransactionQtyCount() public {
        wasteWise.createUserAcct(
            vObject.name,
            vObject.country,
            vObject.gender,
            vObject.phoneNo,
            vObject.email
        );
        WasteWise.User memory user2 = wasteWise.getUser();
        wasteWise.addVerifiers(user2.userAddr);
        switchSigner(user2.userAddr);
        wasteWise.depositPlastic(4, 1);
        WasteWise.Transaction[] memory transaction = wasteWise
            .getUserTransactions();
        assertEq(transaction[1].numberOfTokens, 4);
    }

    function testFailDepositPlasticTransactionQtyCount() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        WasteWise.User memory user2 = wasteWise.getUser();
        wasteWise.addVerifiers(user2.userAddr);
        switchSigner(user2.userAddr);
        wasteWise.depositPlastic(4, 1);
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
        WasteWise.User memory user2 = wasteWise.getUser();
        wasteWise.addVerifiers(user2.userAddr);
        switchSigner(user2.userAddr);
        wasteWise.depositPlastic(4, 1);
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
        WasteWise.User memory user2 = wasteWise.getUser();
        wasteWise.addVerifiers(user2.userAddr);
        switchSigner(user2.userAddr);
        wasteWise.depositPlastic(4, 1);
        wasteWise.depositPlastic(8, 1);

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
        WasteWise.User memory user2 = wasteWise.getUser();
        wasteWise.addVerifiers(user2.userAddr);
        switchSigner(user2.userAddr);
        wasteWise.depositPlastic(4, 1);
        wasteWise.depositPlastic(8, 1);

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

    function testEditUserStatistics() public {
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

        WasteWise.Statistics memory _stats = wasteWise.getStatistics();
        assertEq(_stats.totalTransactions, 1);
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

    function testFailAddAdmins() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        wasteWise.addAdmins(vObject.userAddr);
    }

    function testFailNonAdminAddAdmins() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        wasteWise.addAdmins(userA);
    }

    function testAddAdmins() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        wasteWise.addAdmins(uObject.userAddr);
        WasteWise.AdminRequest memory _adminReq = wasteWise.getAdminRequest(1);
        assertEq(_adminReq.requestStatus, false);
    }

    function testFailApproveAdmins() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        wasteWise.addAdmins(uObject.userAddr);
        wasteWise.approveNewAdmin(uObject.userAddr);
        WasteWise.AdminRequest memory _adminReq = wasteWise.getAdminRequest(1);
        assertEq(_adminReq.requestStatus, false);
    }

    function testApproveAdminsPending() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        wasteWise.addAdmins(uObject.userAddr);
        wasteWise.approveNewAdmin(userF);
        WasteWise.AdminRequest memory _adminReq = wasteWise.getAdminRequest(1);
        assertEq(_adminReq.requestStatus, false);
    }

    function testApproveAdmins() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.addAdmins(uObject.userAddr);

        switchSigner(userB);
        wasteWise.approveNewAdmin(userF);
        switchSigner(userC);
        wasteWise.approveNewAdmin(userF);
        WasteWise.AdminRequest memory _adminReq = wasteWise.getAdminRequest(1);
        assertEq(_adminReq.requestStatus, true);
    }

    function testApproveAdminsPendingStatistics() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        wasteWise.addAdmins(uObject.userAddr);
        wasteWise.approveNewAdmin(userF);
        WasteWise.AdminRequest memory _adminReq = wasteWise.getAdminRequest(1);
        assertEq(_adminReq.requestStatus, false);

        WasteWise.Statistics memory _stats = wasteWise.getStatistics();
        assertEq(_stats.totalAdmins, admins.length);
    }

    function testApproveAdminsStatistics() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );
        wasteWise.addAdmins(uObject.userAddr);

        switchSigner(userB);
        wasteWise.approveNewAdmin(userF);
        switchSigner(userC);
        wasteWise.approveNewAdmin(userF);
        WasteWise.AdminRequest memory _adminReq = wasteWise.getAdminRequest(1);
        assertEq(_adminReq.requestStatus, true);

        WasteWise.Statistics memory _stats = wasteWise.getStatistics();
        assertEq(_stats.totalAdmins, admins.length + 1);
    }

    function testFailAddVerifiers() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        wasteWise.addVerifiers(vObject.userAddr);
    }

    function testFailExistsAddVerifiers() public {
        wasteWise.createUserAcct(
            uObject.name,
            uObject.country,
            uObject.gender,
            uObject.phoneNo,
            uObject.email
        );

        wasteWise.addVerifiers(userA);
        wasteWise.addVerifiers(userA);
    }

    function testAddVerifiers() public {
        switchSigner(userF);
        wasteWise.createUserAcct(
            vObject.name,
            vObject.country,
            vObject.gender,
            vObject.phoneNo,
            vObject.email
        );

        switchSigner(userA);
        wasteWise.addVerifiers(vObject.userAddr);
        assertEq(uint(vObject.role), uint(WasteWise.Role.VERIFIERS));
    }

    function testAddVerifiersStatistics() public {
        switchSigner(userF);
        wasteWise.createUserAcct(
            vObject.name,
            vObject.country,
            vObject.gender,
            vObject.phoneNo,
            vObject.email
        );

        switchSigner(userA);
        wasteWise.addVerifiers(vObject.userAddr);

        WasteWise.Statistics memory _stats = wasteWise.getStatistics();
        assertEq(_stats.totalTransactions, 1);
        assertEq(uint(vObject.role), uint(WasteWise.Role.VERIFIERS));
    }

    function testAddVerifiersLength() public {
        switchSigner(userF);
        wasteWise.createUserAcct(
            vObject.name,
            vObject.country,
            vObject.gender,
            vObject.phoneNo,
            vObject.email
        );

        switchSigner(userA);
        wasteWise.addVerifiers(vObject.userAddr);

        WasteWise.User[] memory verifiers = wasteWise.getVerifiers();
        assertEq(verifiers.length, 1);
        assertEq(uint(vObject.role), uint(WasteWise.Role.VERIFIERS));
    }

    function testRemoveVerifiers() public {
        switchSigner(userF);
        wasteWise.createUserAcct(
            vObject.name,
            vObject.country,
            vObject.gender,
            vObject.phoneNo,
            vObject.email
        );

        switchSigner(userA);
        wasteWise.addVerifiers(vObject.userAddr);
        wasteWise.removeVerifiers(vObject.userAddr);
        assertEq(uint(vObject.role), uint(WasteWise.Role.VERIFIERS));
    }

    function testRemoveVerifiersStatistics() public {
        switchSigner(userF);
        wasteWise.createUserAcct(
            vObject.name,
            vObject.country,
            vObject.gender,
            vObject.phoneNo,
            vObject.email
        );

        switchSigner(userA);
        wasteWise.addVerifiers(vObject.userAddr);
        wasteWise.removeVerifiers(vObject.userAddr);

        WasteWise.Statistics memory _stats = wasteWise.getStatistics();
        assertEq(_stats.totalTransactions, 0);
    }

    function testRemoveVerifiersLength() public {
        switchSigner(userF);
        wasteWise.createUserAcct(
            vObject.name,
            vObject.country,
            vObject.gender,
            vObject.phoneNo,
            vObject.email
        );

        switchSigner(userA);
        wasteWise.addVerifiers(vObject.userAddr);
        wasteWise.removeVerifiers(vObject.userAddr);

        WasteWise.User[] memory verifiers = wasteWise.getVerifiers();
        assertEq(verifiers.length, 0);
    }
}
