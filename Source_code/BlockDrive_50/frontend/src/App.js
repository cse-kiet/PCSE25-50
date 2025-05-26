import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI } from "./contractABI";
import "./App.css";

const CONTRACT_ADDRESS = "0x3CE35544C2Fe24707926D615732064Aeb2643f4e";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [rideCount, setRideCount] = useState(0);
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);

  const [newRide, setNewRide] = useState({
    origin: "",
    destination: "",
    fare: ""
  });

  const [bookRideId, setBookRideId] = useState("");

  const getStatusLabel = (statusCode) => {
    switch (statusCode) {
      case 0: return "Available";
      case 1: return "Booked";
      default: return "Unknown";
    }
  };

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const rideSharingContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
        setContract(rideSharingContract);
        setError(null);
      } catch (err) {
        setError("Failed to connect wallet");
        console.error(err);
      }
    } else {
      setError("Please install MetaMask!");
    }
  }

  async function fetchRideData() {
    if (!contract) return;
    try {
      const count = await contract.rideCount();
      setRideCount(count.toNumber());

      const ridesArray = [];
      for (let i = 0; i < count; i++) {
        const ride = await contract.getRide(i);
        ridesArray.push({
          id: ride[0].toNumber(),
          driver: ride[1],
          origin: ride[2],
          destination: ride[3],
          fare: ethers.utils.formatEther(ride[4]),
          status: ride[5],
          passenger: ride[6]
        });
      }
      setRides(ridesArray);
      setError(null);
    } catch (err) {
      setError("Failed to fetch rides");
      console.error(err);
    }
  }

  async function createRide() {
    if (!contract) {
      setError("Connect wallet first!");
      return;
    }
    try {
      const fareInWei = ethers.utils.parseEther(newRide.fare);
      const tx = await contract.createRide(newRide.origin, newRide.destination, fareInWei);
      await tx.wait();
      alert("Ride created successfully!");
      setNewRide({ origin: "", destination: "", fare: "" });
      fetchRideData();
    } catch (err) {
      setError("Failed to create ride");
      console.error(err);
    }
  }

  async function bookRide() {
    if (!contract) {
      setError("Connect wallet first!");
      return;
    }

    if (!bookRideId || isNaN(bookRideId)) {
      alert("Please enter a valid Ride ID.");
      return;
    }

    try {
      const ride = await contract.getRide(bookRideId);
      const fareInWei = ride[4];
      const tx = await contract.bookRide(bookRideId, { value: fareInWei });
      await tx.wait();
      alert("Ride booked successfully!");
      setBookRideId("");
      fetchRideData();
    } catch (err) {
      setError("Failed to book ride");
      console.error(err);
    }
  }

  useEffect(() => {
    if (contract) fetchRideData();
  }, [contract]);

  return (
    <div className="container">
      <h1>🚗 RideSharing Dapp</h1>
      {!account ? (
        <button onClick={connectWallet} className="btn-primary">Connect MetaMask Wallet</button>
      ) : (
        <>
          <p><strong>Connected:</strong> {account}</p>
          <p><strong>Total Rides:</strong> {rideCount}</p>

          <h2>Create a Ride</h2>
          <input
            type="text"
            placeholder="Origin"
            value={newRide.origin}
            onChange={(e) => setNewRide({ ...newRide, origin: e.target.value })}
          />
          <input
            type="text"
            placeholder="Destination"
            value={newRide.destination}
            onChange={(e) => setNewRide({ ...newRide, destination: e.target.value })}
          />
          <input
            type="text"
            placeholder="Fare in ETH"
            value={newRide.fare}
            onChange={(e) => setNewRide({ ...newRide, fare: e.target.value })}
          />
          <button onClick={createRide} className="btn-secondary">Create Ride</button>

          <h2>Available Rides</h2>
          {rides.length === 0 ? (
            <p>No rides available.</p>
          ) : (
            rides.map((ride) => (
              <div key={ride.id} className="ride-card">
                <p><strong>ID:</strong> {ride.id}</p>
                <p><strong>Driver:</strong> {ride.driver}</p>
                <p><strong>From:</strong> {ride.origin}</p>
                <p><strong>To:</strong> {ride.destination}</p>
                <p><strong>Fare:</strong> {ride.fare} ETH</p>
                <p><strong>Status:</strong> {getStatusLabel(ride.status)}</p>
              </div>
            ))
          )}

          <h2>Book a Ride</h2>
          <input
            type="number"
            placeholder="Ride ID"
            value={bookRideId}
            onChange={(e) => setBookRideId(e.target.value)}
          />
          <button onClick={bookRide} className="btn-primary">Book Ride</button>
        </>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
