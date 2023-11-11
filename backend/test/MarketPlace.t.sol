// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {RwasteWise} from "../src/RwasteWise.sol";

import {MarketPlace} from "../src/MarketPlace.sol";

contract MarketPlaceTest is Test {
    MarketPlace marketPlace;
    RwasteWise wasteToken;
    MarketPlace.ItemInfo itemInfo;

    function setUp() public {
        wasteToken = new RwasteWise();
        marketPlace = new MarketPlace(address(wasteToken));
    }

    function testCreateListing() public {
        wm.prank(userA);
        marketPlace.createListing(
            "merch",
            "merch for conference",
            "url",
            1,
            300
        );
        assertEq(wasteWise.getItemInfo(0).name, "merch");
    }
}
