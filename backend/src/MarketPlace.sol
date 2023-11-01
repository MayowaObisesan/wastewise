// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MarketPlace {
    struct ItemInfo {
        string name;
        string description;
        uint256 price;
        uint256 deadline;
        address lister;
        bool isActive;
        uint256 itemId;
    }

    mapping(uint256 => ItemInfo) public itemInfoToId;
    address public admin;
    uint256 public listingId;

    /* ERRORS */

    error MinPriceTooLow();
    error DeadlineTooSoon();
    error MinDurationNotMet();
    error InvalidSignature();
    error ListingDoesNotExist();
    error ListingNotActive();
    error PriceNotMet(int256 difference);
    error ListingExpired();
    error PriceMismatch(uint256 originalPrice);

    /* EVENTS */

    constructor() {
        admin = msg.sender;
    }

    function createListing(
        string calldata _name,
        string calldata _description,
        uint256 _price,
        uint256 _deadline,
        bool _isActive
    ) public returns (uint256 _listingId) {
        if (_price < 0.01 ether) revert MinPriceTooLow();
        // check if deadline is lessthan currentTime
        if (block.timestamp + _deadline <= block.timestamp)
            revert DeadlineTooSoon();
        // check if deadline is lessthan 60 minutes
        if (_deadline - block.timestamp < 60 minutes)
            revert MinDurationNotMet();

        // append to Storage
        ItemInfo storage newItemInfo = itemInfoToId[listingId];

        newItemInfo.name = _name;
        newItemInfo.description = _description;
        newItemInfo.price = _price;
        newItemInfo.deadline = _deadline;
        newItemInfo.lister = msg.sender;
        newItemInfo.isActive = _isActive;

        _listingId = listingId;

        listingId++;

        return listingId;
    }

    function redeemReciptToken() public payable {}

    function updateListing(
        string calldata _name,
        string calldata _description,
        uint256 _listingId,
        uint256 _newPrice,
        bool _isActive
    ) public {}

    function getItemInfo(
        uint256 _listingId
    ) public view returns (ItemInfo memory) {
        return itemInfoToId[_listingId];
    }
}
