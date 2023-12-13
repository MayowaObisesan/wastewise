// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/MarketPlace.sol";

contract MarketPlaceScript is Script {
    MarketPlace marketPlace;

    address tokenAddress = 0x381d5A09481369e4be2bd5a9E261959401Ff0B4e;
    address wasteWiseAddr = 0xE80d72E454bEdEd5F7729b333Ee3256532473F85;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        marketPlace = new MarketPlace(tokenAddress, wasteWiseAddr);

        vm.stopBroadcast();
    }
}

// forge script script/MarketPlace.s.sol:MarketPlaceScript --rpc-url https://eth-sepolia.g.alchemy.com/v2/W9Dqt2mTcFpfAexpiBAqDSfWWlwdzb --broadcast --verify -vvvv

// https://sepolia.etherscan.io/address/0xe03f23f43a0ccbe811ada56b8039bafb2c87a474
