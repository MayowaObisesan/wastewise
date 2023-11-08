// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {RwasteWise} from "./RwasteWise.sol";

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
        bool isActive; 
        uint256 itemId; 
    }

     struct Transaction {
        uint date;
        Type typeOfTransaction;
        uint NumberOfTokens;
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

    /* EVENTS */

    RwasteWise rwasteWise;

    constructor(address tokenAddress) {
        admin = msg.sender;
        rwasteWise = RwasteWise(tokenAddress);
    }
    
    function createListing(string calldata _name, string calldata _description, string calldata _image, uint _price, uint _deadline) public returns (uint256 _listingId) {
        if (_price < 0.01 ether) revert MinPriceTooLow(); 
        if (block.timestamp + _deadline <= block.timestamp) revert DeadlineTooSoon(); 
        if (_deadline - block.timestamp < 60 minutes) revert MinDurationNotMet(); 
        if (keccak256(abi.encode(_image)) == keccak256(abi.encode(""))) revert NoImageUrl();
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
        newItemInfo.isActive = true;
        _listingId = listingId;
        return listingId;
    }

    /// @dev Redeem receipt tokens for a transaction.
    function redeemReciptToken() public payable {}

    /// @dev Buy an item from the marketplace.
    /// @param _listingId The unique identifier of the item listing to buy.
    function buyListing(uint256 _listingId) public payable{
        if(IitemInfoToId[_listingId] != listingId) revert ListingDoesNotExist();

        // Get the Listing
        ItemInfo storage item = itemInfoToId[_listingId];

        // Check if the listing is active
        if(!item.isActive) revert ListingNotActive();

            // Check if the price is met
        if(msg.value < item.price) revert PriceNotMet(int256(item.price - msg.value));

        // Calculate the difference between the sent value and the item price
        int256 priceDifference = int256(msg.value) - int256(itemInfo.price);

        // If the sent value is higher than the item price, refund the excess amount
        if (priceDifference > 0) {
        payable(msg.sender).transfer(uint256(priceDifference));
        }
     

        // Update the listing to be inactive
        item.isActive = false;

        // Transfer the item from the seller to the buyer
        rwasteWise.transferFrom(item.lister, msg.sender, _listingId);

        // pay the seller
        payable(item.lister).transfer(msg.value);

        // Create a new transaction
        Transaction memory transaction;
        transaction.date = block.timestamp;
        transaction.typeOfTransaction = Type.Purchase;
        transaction.NumberOfTokens = 1;

        // Store the transaction
        transactions[msg.sender] = transaction;

    }

    /// @dev Update the information of an existing item listing.
    /// @param _name The new name of the item.
    /// @param _description New description of the item.
    /// @param _listingId The unique identifier of the item listing to update.
    /// @param _newPrice New price for the item.
    /// @param _isActive Flag to indicate if the listing is active.
    function updateListing(
        string calldata _name,
        string calldata _description,
        uint256 _listingId,
        uint256 _newPrice,
        bool _isActive
    ) public {
        // if(listingId[_listingId] == 0) revert ListingDoesNotExist();
        ItemInfo storage itemInfo = itemInfoToId[_listingId];
        itemInfo.name = _name;
        itemInfo.description = _description;
        itemInfo.price = _newPrice;
        itemInfo.isActive = _isActive;
    }

    /// @dev Get information about an item listing by its unique identifier.
    /// @param _listingId The unique identifier of the item listing.
    /// @return ItemInfo The information about the item listing.
    function getItemInfo(uint256 _listingId) public view returns (ItemInfo memory) {
        return itemInfoToId[_listingId];
    }

    function getAllItemInfo() public view returns (ItemInfo[] memory){
        ItemInfo[] memory allItemInfo = new ItemInfo[](listingId);
        for(uint i = 0; i < listingId; i++){
            allItemInfo[i] = itemInfoToId[i + 1];
        }
        return allItemInfo;
    }
}

