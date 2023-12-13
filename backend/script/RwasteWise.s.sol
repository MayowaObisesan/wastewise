// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/RwasteWise.sol";

contract RwasteWiseScript is Script {
    RwasteWise rwasteWise;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        rwasteWise = new RwasteWise();

        vm.stopBroadcast();
    }
}

// forge script script/RwasteWise.s.sol:RwasteWiseScript --rpc-url  https://eth-sepolia.g.alchemy.com/v2/W9Dqt2mTcFpfAexpiBAqDSfWWlwdzb --broadcast --verify -vvvv

// https://sepolia.etherscan.io/address/0x381d5a09481369e4be2bd5a9e261959401ff0b4e

// forge script script/RwasteWise.s.sol:RwasteWiseScript --rpc-url  ${SEPOLIA_RPC_URL} --broadcast --verify -vvvv
