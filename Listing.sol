// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract OTC {
    struct Offer {
        address owner;
        address desiredToken;
        uint256 desiredAmount;
        uint256 offeredAmount;
        bool isFulfilled;
    }

    Offer[] public offers;

    event OfferCreated(address indexed owner, uint256 offerId);

    function createOffer(
        address _desiredToken,
        uint256 _desiredAmount,
        uint256 _offeredAmount
    ) external {
        require(_desiredAmount > 0, "Desired amount must be greater than 0");
        require(_offeredAmount > 0, "Offered amount must be greater than 0");

        offers.push(Offer({
            owner: msg.sender,
            desiredToken: _desiredToken,
            desiredAmount: _desiredAmount,
            offeredAmount: _offeredAmount,
            isFulfilled: false
        }));

        uint256 newOfferId = offers.length - 1;
        emit OfferCreated(msg.sender, newOfferId);
    }

    function fulfillOffer(uint256 _offerId) external {
        require(_offerId < offers.length, "Offer does not exist");
        Offer storage offer = offers[_offerId];

        require(!offer.isFulfilled, "Offer is already fulfilled");
        require(offer.owner != msg.sender, "Cannot fulfill your own offer");

        IERC20 desiredToken = IERC20(offer.desiredToken);
        uint256 allowance = desiredToken.allowance(msg.sender, address(this));
        require(allowance >= offer.desiredAmount, "Insufficient allowance");

        // Transfer tokens
        desiredToken.transferFrom(msg.sender, offer.owner, offer.desiredAmount);
        IERC20(msg.sender).transferFrom(offer.owner, msg.sender, offer.offeredAmount);

        offer.isFulfilled = true;
    }
}
