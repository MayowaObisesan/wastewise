// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {RwasteWise} from "./RwasteWise.sol";
import {WasteWise} from "./Wastewise.sol";

/// @title MarketPlace: A smart contract for managing item listings in a marketplace.
contract MarketPlace {
    /// @dev Structure to represent information about an item listing.
    struct ItemInfo {
        string name;
        string description;
        string image;
        uint256 price;
        uint256 deadline;
        address lister;
        uint256 itemId;
    }

    struct Transaction {
        uint date;
        Type typeOfTransaction;
        uint amountOfTokens;
    }

    enum Type {
        Recycle,
        Purchase
    }

    mapping(address => Transaction) transactions;

    /// @dev Mapping to store item information by their unique listing ID.
    mapping(uint256 => ItemInfo) public itemInfoToId;

    /// @dev The address of the administrator of the marketplace.
    address public admin;

    /// @dev The ID to assign to the next listing.
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
    error NoImageUrl();
    error NotAdmin();

    /* EVENTS */

    RwasteWise rwasteWise;
    WasteWise wasteWise;

    constructor(address tokenAddress, address wasteWiseAddr) {
        rwasteWise = RwasteWise(tokenAddress);
        wasteWise = WasteWise(wasteWiseAddr);
    }

    function createListing(
        string calldata _name,
        string calldata _description,
        string calldata _image,
        uint _price,
        uint _deadline
    ) public {
        bool isAdmin;
        // if (wasteWise.getAdmins() != msg.sender) revert NotAdmin();
        for (uint i = 0; i < wasteWise.getAdmin().length; i++) {
            if (wasteWise.getAdmin()[i] == msg.sender) {
                isAdmin = true;
            }
        }

        if (!isAdmin) {
            revert NotAdmin();
        }

        if (_price < 0.01 ether) revert MinPriceTooLow();
        if (block.timestamp + _deadline <= block.timestamp)
            revert DeadlineTooSoon();
        if (_deadline - block.timestamp < 60 minutes)
            revert MinDurationNotMet();
        if (keccak256(abi.encode(_image)) == keccak256(abi.encode("")))
            revert NoImageUrl();
        // Append item information to storage.
        // append to Storage
        listingId++;
        ItemInfo storage newItemInfo = itemInfoToId[listingId];
        newItemInfo.name = _name;
        newItemInfo.description = _description;
        newItemInfo.image = _image;
        newItemInfo.price = _price;
        newItemInfo.deadline = _deadline;
        newItemInfo.lister = msg.sender;
        newItemInfo.itemId = listingId;
    }

    /// @dev Redeem receipt tokens for a transaction.
    function redeemReciptToken() public payable {}

    /// @dev Buy an item from the marketplace.
    /// @param _listingId The unique identifier of the item listing to buy.
    function buyListing(uint256 _listingId, uint256 _amountToPay) public {
        ItemInfo memory newItemInfo = itemInfoToId[listingId];
        // Check if the listingId exists
        if (newItemInfo.itemId != _listingId) revert ListingDoesNotExist();

        // Check if the user has our token at all
        // if()
        // Take in the number of listing to buy, not the amount
        // Check if the user has enough of our token to make the purchase.
        // Kindly make use of Custom errors for these checks.

        // Get the Listing
        ItemInfo storage item = itemInfoToId[_listingId];

        // Check if the listing is active
        if (block.timestamp > item.deadline) revert ListingNotActive();

        // Check if the price matches
        if (_amountToPay != item.price) revert PriceMismatch(item.price);

        // transfer tokens from buyer to seller
        rwasteWise.transferFrom(msg.sender, address(this), _amountToPay);

        // burn the tokens collected
        rwasteWise.burnReceipt(address(this), _amountToPay);

        // Create a new transaction
        Transaction memory transaction;
        transaction.date = block.timestamp;
        transaction.typeOfTransaction = Type.Purchase;
        transaction.amountOfTokens = _amountToPay;

        // Store the transaction
        transactions[msg.sender] = transaction;
    }

    /// @dev Update the information of an existing item listing.
    /// @param _name The new name of the item.
    /// @param _description New description of the item.
    /// @param _listingId The unique identifier of the item listing to update.
    /// @param _newPrice New price for the item.
    function updateListing(
        string calldata _name,
        string calldata _description,
        uint256 _listingId,
        uint256 _newPrice
    ) public {
        // if(listingId[_listingId] == 0) revert ListingDoesNotExist();
        ItemInfo storage itemInfo = itemInfoToId[_listingId];
        itemInfo.name = _name;
        itemInfo.description = _description;
        itemInfo.price = _newPrice;
    }

    /// @dev Get information about an item listing by its unique identifier.
    /// @param _listingId The unique identifier of the item listing.
    /// @return ItemInfo The information about the item listing.
    function getItemInfo(
        uint256 _listingId
    ) public view returns (ItemInfo memory) {
        return itemInfoToId[_listingId];
    }

    function getAllItemInfo() public view returns (ItemInfo[] memory) {
        ItemInfo[] memory allItemInfo = new ItemInfo[](listingId);
        for (uint i = 0; i < listingId; i++) {
            allItemInfo[i] = itemInfoToId[i + 1];
        }
        return allItemInfo;
    }

    function getAllActiveItemInfo() private view returns (ItemInfo[] memory) {
        uint activeItemsLength;
        for (uint i = 0; i < listingId; i++) {
            ItemInfo memory itemInfo = itemInfoToId[i + 1];
            if (block.timestamp < itemInfo.deadline) {
                activeItemsLength++;
            }
        }
        ItemInfo[] memory allActiveItemInfo = new ItemInfo[](activeItemsLength);
        uint index;
        for (uint i = 0; i < listingId; i++) {
            ItemInfo memory itemInfo = itemInfoToId[i + 1];
            if (block.timestamp < itemInfo.deadline) {
                allActiveItemInfo[index] = itemInfoToId[i + 1];
                index++;
            }
        }
        return allActiveItemInfo;
    }
}
