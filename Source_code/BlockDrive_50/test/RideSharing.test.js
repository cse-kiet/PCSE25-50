const { expect } = require("chai");

describe("RideSharing", function () {
  it("Should create and book a ride", async function () {
    const [owner, passenger] = await ethers.getSigners();

    const RideSharing = await ethers.getContractFactory("RideSharing");
    const rideSharing = await RideSharing.deploy();
    await rideSharing.deployed();

    await rideSharing.createRide("A", "B", ethers.utils.parseEther("1"));

    await rideSharing.connect(passenger).bookRide(1, { value: ethers.utils.parseEther("1") });

    const ride = await rideSharing.getRide(1);
    expect(ride[6]).to.equal(passenger.address);
  });
});
