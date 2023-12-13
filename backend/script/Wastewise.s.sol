// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Wastewise.sol";

contract WastewiseScript is Script {
    WasteWise wastewise;

    address tokenAddress = 0x381d5A09481369e4be2bd5a9E261959401Ff0B4e;
    address[] _admins = [
        0x9cDF5ce3c9Ea71ECC8fb7C3A17ed7B6c74F9C5F0,
        0x2Af6B6fB6a6a6eb93Dc32151A5B7F403Be14fD88,
        0xa5FFf172361008408da8AcFaF4a9f32012314cA9,
        0xB5119738BB5Fe8BE39aB592539EaA66F03A77174,
        0x72C90da5748739D640DEbBf19280ca51856A0177
    ];

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        wastewise = new WasteWise(tokenAddress, _admins);

        vm.stopBroadcast();
    }
}

// forge script script/Wastewise.s.sol:WastewiseScript --rpc-url https://eth-sepolia.g.alchemy.com/v2/W9Dqt2mTcFpfAexpiBAqDSfWWlwdzb --broadcast --verify -vvvv

// https://sepolia.etherscan.io/address/0xe80d72e454beded5f7729b333ee3256532473f85
