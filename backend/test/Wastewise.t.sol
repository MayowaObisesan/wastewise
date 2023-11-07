// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import {Test, console2} from "forge-std/Test.sol";
// import {WasteWise} from "../src/Wastewise.sol";
// import {RwasteWise} from "../src/RwasteWise.sol";

// contract WastewiseTest is Test {
//     Wastewise wasteWise;
//     RwasteWise wasteToken;

//     // Test Users Address
//     address uOne = 0x1111;
//     address uTwo = 0x2222;

//     function setUp() public {
//         wasteWise = new Wastewise();
//         wasteToken = new RwasteWise();
//         wasteToken.mint(uOne, 10_000_000 ether);
//     }

//     function testCreateUser() public {
//         string _name = "Mayowa";
//         string _country = "Nigeria";
//         WasteWise.Gender gender = Male;
//         uint _phone = 123456789;
//         string _email = "mayowaobi74@gmail.com";
//         wasteWise.createUserAcct(_name, _country, gender, _phone, _email);
//         assertEq(counter.number(), 1);
//     }

//     function testFuzz_SetNumber(uint256 x) public {
//         counter.setNumber(x);
//         assertEq(counter.number(), x);
//     }
// }
