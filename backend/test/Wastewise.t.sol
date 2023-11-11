// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {WasteWise} from "../src/Wastewise.sol";
import {RwasteWise} from "../src/RwasteWise.sol";

contract WastewiseTest is Test {
    WasteWise wasteWise;
    RwasteWise wasteToken;

    WasteWise.User user;

    // WasteWise.Gender gender;

    function setUp() public {
        address[] memory testAddresses = new address[](2);
        testAddresses[0] = address(0x123);
        testAddresses[1] = address(0x456);

        wasteToken = new RwasteWise();
        wasteWise = new WasteWise(address(wasteToken), testAddresses);
    }

    function testCreateUser() public {
        vm.startPrank(address(5));
        wasteWise.createUserAcct(
            "Tunde",
            "Nigeria",
            WasteWise.Gender.Female,
            1234567,
            "sola@gmail.com"
        );
        assertEq(wasteWise.getUser().Id, 1);
        assertEq(wasteWise.getUser().userAddr, address(5));
        assertEq(wasteWise.getUser().name, "Tunde");
        assertEq(wasteWise.getUser().country, "Nigeria");
        assertEq(
            uint(wasteWise.getUser().gender),
            uint(WasteWise.Gender.Female)
        );
        assertEq(wasteWise.getUser().phone_no, 1234567);
        assertEq(wasteWise.getUser().email, "sola@gmail.com");
        assertEq(wasteWise.getUser().timeJoined, block.timestamp);
        assertEq(wasteWise.getUser().isAdmin, false);
    }

    // function testFuzz_SetNumber(uint256 x) public {
    //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }
}
