// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {RwasteWise} from "../src/RwasteWise.sol";
import {WasteWise} from "../src/Wastewise.sol";

import {MarketPlace} from "../src/MarketPlace.sol";
import {Helpers} from "./Helpers.sol";

contract MarketPlaceTest is Helpers {
    MarketPlace marketPlace;
    RwasteWise wasteToken;
    WasteWise wasteWise;

    MarketPlace.ItemInfo itemInfo;

    // Test Users Address
    address userA;
    address userB;

    uint pKeyA;
    uint pKeyB;

    WasteWise.User uObject;
    address[] admins = new address[](2);

    function setUp() public {
        admins[0] = address(0x3333);
        admins[1] = address(0x4444);
        wasteToken = new RwasteWise();
        wasteWise = new WasteWise(address(wasteToken), admins);
        marketPlace = new MarketPlace(address(wasteToken), address(wasteWise));
        vm.prank(address(6));
        wasteWise.createUserAcct(
            "ola",
            "nig",
            WasteWise.Gender.Male,
            987654,
            "@gmail.com"
        );
    }

    function testCreateListing() public {
        vm.prank(address(0x3333));
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e18,
            30000000
        );
        assertEq(marketPlace.getItemInfo(1).name, "merch");
    }

    function testFailNotAdminCreateListing() public {
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e18,
            30000000
        );
        // vm.expectRevert("Not admin");
        assertEq(marketPlace.getItemInfo(1).name, "merch");
    }

    function testFailLowPrice() public {
        vm.prank(address(0x3333));
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e15,
            30000000
        );
        vm.expectRevert("price to low");
    }

    function testFailDuration() public {
        vm.prank(address(0x3333));
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e18,
            0
        );
        vm.expectRevert("time cannot be 0");
        // assertEq(marketPlace.getItemInfo(1).name, "merch");
    }

    function testFailDurations() public {
        vm.prank(address(0x3333));
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e18,
            3500
        );
        vm.expectRevert("tme cannot be less than 60 mins");
    }

    function testCreateAcct() public {
        wasteWise.createUserAcct(
            "ola",
            "nig",
            WasteWise.Gender.Male,
            987654,
            "@gmail.com"
        );
        WasteWise.User memory user = wasteWise.getUser();
        assertEq(user.name, "ola");
    }

    function testDepositPlastic() public {
        vm.prank(admins[0]);
        wasteWise.addVerifiers(address(6));
        vm.startPrank(address(6));
        wasteWise.depositPlastic(2, 1);
        wasteToken.approve(
            address(marketPlace),
            wasteToken.balanceOf(address(6))
        );
        vm.stopPrank();
        vm.prank(address(0x3333));
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e18,
            30000000
        );
        vm.prank(address(6));
        marketPlace.buyListing(1, 2);

        assertEq(wasteToken.balanceOf(address(6)), 0);
    }

    function testFailNoApprovalDepositPlastic() public {
        vm.startPrank(address(6));
        wasteWise.depositPlastic(2, 1);
        vm.stopPrank();
        vm.prank(address(0x3333));
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e18,
            30000000
        );
        vm.prank(address(6));
        marketPlace.buyListing(1, 2);
        assertEq(
            wasteToken.balanceOf(address(6)),
            wasteToken.balanceOf(address(6))
        );
        vm.expectRevert("contract Not Approved");
    }

    function testFailInsufficientToken() public {
        vm.startPrank(address(6));
        wasteWise.depositPlastic(1, 1);
        wasteToken.approve(
            address(marketPlace),
            wasteToken.balanceOf(address(6))
        );
        vm.stopPrank();
        vm.prank(address(0x3333));
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e18,
            30000000
        );
        vm.prank(address(6));
        marketPlace.buyListing(1, 2);
        vm.expectRevert("Insufficient Token for Qty Requested");
    }

    function testFailListingNotActive() public {
        vm.startPrank(address(6));
        wasteWise.depositPlastic(2, 1);
        wasteToken.approve(
            address(marketPlace),
            wasteToken.balanceOf(address(6))
        );
        vm.stopPrank();
        vm.prank(address(0x3333));
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e18,
            30000000
        );
        vm.prank(address(6));
        marketPlace.buyListing(2, 2);
        vm.expectRevert("listing Not Active");
        assertEq(wasteToken.balanceOf(address(6)), 0);
    }

    function testUpdateListing() public {
        vm.startPrank(address(0x3333));
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e18,
            30000000
        );
        marketPlace.updateListing(
            "newListingName",
            "updatedListing description",
            1,
            2e18
        );
        assertEq(marketPlace.getItemInfo(1).name, "newListingName");
        assertEq(
            marketPlace.getItemInfo(1).description,
            "updatedListing description"
        );
        assertEq(marketPlace.getItemInfo(1).price, 2e18);
    }

    function testFailListingNotExistence() public {
        vm.prank(address(0x3333));
        marketPlace.updateListing(
            "newListingName",
            "updatedListing description",
            1,
            2e18
        );
        vm.expectRevert("listing not in existence");
    }

    function testFailNotAdminUpdateListing() public {
        vm.prank(address(0x3333));
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1e18,
            30000000
        );
        marketPlace.updateListing(
            "newListingName",
            "updatedListing description",
            1,
            2e18
        );
        vm.expectRevert("Only Admin can update Listing");
    }
}
