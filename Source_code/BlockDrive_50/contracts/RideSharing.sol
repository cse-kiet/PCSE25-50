// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RideSharing {
    uint public rideCount = 0;

    enum RideStatus { Available, Booked }

    struct Ride {
        uint id;
        address payable driver;
        string origin;
        string destination;
        uint fare;
        RideStatus status;
        address passenger;
    }

    mapping(uint => Ride) public rides;

    event RideCreated(uint id, address driver, string origin, string destination, uint fare);
    event RideBooked(uint id, address passenger);

    function createRide(string memory _origin, string memory _destination, uint _fare) public {
        rideCount++;
        rides[rideCount] = Ride(
            rideCount,
            payable(msg.sender),
            _origin,
            _destination,
            _fare,
            RideStatus.Available,
            address(0)
        );

        emit RideCreated(rideCount, msg.sender, _origin, _destination, _fare);
    }

    function bookRide(uint _rideId) public payable {
        Ride storage ride = rides[_rideId];

        require(ride.id != 0, "Ride does not exist");
        require(ride.status == RideStatus.Available, "Ride already booked");
        require(msg.value >= ride.fare, "Insufficient payment");

        ride.passenger = msg.sender;
        ride.status = RideStatus.Booked;
        ride.driver.transfer(ride.fare);

        emit RideBooked(_rideId, msg.sender);
    }

    function getRide(uint _rideId) public view returns (
        uint, address, string memory, string memory, uint, RideStatus, address
    ) {
        Ride memory r = rides[_rideId];
        return (r.id, r.driver, r.origin, r.destination, r.fare, r.status, r.passenger);
    }
}
