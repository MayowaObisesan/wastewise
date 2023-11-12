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

    function setUp() public {
        address[] memory admins = new address[](2);
        admins[0] = address(0x3333);
        admins[1] = address(0x4444);
        wasteToken = new RwasteWise();
        wasteWise = new WasteWise(address(wasteToken), admins);
        marketPlace = new MarketPlace(address(wasteToken), address(wasteWise));
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
}
