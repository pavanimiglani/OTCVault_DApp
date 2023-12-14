const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OTC Contract", function () {
  let OTC;
  let otc;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    OTC = await ethers.getContractFactory("OTC");
    [owner, addr1, addr2] = await ethers.getSigners();

    otc = await OTC.deploy();
    await otc.deployed();
  });

  it("Should create an offer", async function () {
    const tokenAddress = ethers.constants.AddressZero;
    const desiredAmount = ethers.utils.parseEther("100");
    const offeredAmount = ethers.utils.parseEther("50");

    await expect(
      otc.createOffer(tokenAddress, desiredAmount, offeredAmount)
    )
      .to.emit(otc, "OfferCreated")
      .withArgs(owner.address, 0);

    const offer = await otc.offers(0);
    expect(offer.owner).to.equal(owner.address);
    expect(offer.desiredToken).to.equal(tokenAddress);
    expect(offer.desiredAmount).to.equal(desiredAmount);
    expect(offer.offeredAmount).to.equal(offeredAmount);
    expect(offer.isFulfilled).to.equal(false);
  });

  it("Should not create an offer with zero amounts", async function () {
    const tokenAddress = ethers.constants.AddressZero; 
    const desiredAmount = ethers.utils.parseEther("0");
    const offeredAmount = ethers.utils.parseEther("0");

    await expect(
      otc.createOffer(tokenAddress, desiredAmount, offeredAmount)
    ).to.be.revertedWith("Desired amount must be greater than 0");
  });


});
