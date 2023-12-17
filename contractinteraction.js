import React, { useState, useEffect } from 'react';
import { ethers, Contract } from 'ethers';
import OTCTrade from '../src/artifacts/contracts/OTCTrade.sol/OTCTrade.json';
import './contractinteraction.css';

const ContractInteraction = ({ provider, account }) => {
    const [contract, setContract] = useState(null);
    const [listings, setListings] = useState([]);

    // States for creating a listing
    const [tokenAddress, setTokenAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [desiredToken, setDesiredToken] = useState('');
    const [desiredAmount, setDesiredAmount] = useState('');

    useEffect(() => {
        if (provider && account) {
            const signer = provider.getSigner();
            const contractInstance = new Contract(
                "0xff539a7fd352D8EfADdf85F0ac89C1b047b728A0", 
                OTCTrade.abi,
                signer
            );
            setContract(contractInstance);
        }
    }, [provider, account]);

    useEffect(() => {
        if (contract) {
            fetchListings();
        }
    }, [contract]);

    const fetchListings = async () => {
        try {
            const fetchedListings = await contract.getAllListings();
            setListings(fetchedListings);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const handleCreateListing = async (event) => {
        event.preventDefault();
        try {
            const tx = await contract.createListing(
                tokenAddress,
                ethers.utils.parseUnits(amount, 'ether'), 
                desiredToken,
                ethers.utils.parseUnits(desiredAmount, 'ether') 
            );
            await tx.wait();
            console.log("Listing created successfully!");
            fetchListings(); 
        } catch (error) {
            console.error("Failed to create listing:", error);
        }
    };

    const handleExecuteTrade = async (listingId) => {
        try {
            const tx = await contract.executeTrade(listingId);
            await tx.wait();
            console.log("Trade executed successfully!");
            fetchListings(); 
        } catch (error) {
            console.error("Failed to execute trade:", error);
        }
    };

    return (
        <div>
            {contract ? (
                <>
                    <form onSubmit={handleCreateListing}>
                        <input 
                            type="text" 
                            value={tokenAddress} 
                            onChange={e => setTokenAddress(e.target.value)} 
                            placeholder="Token Address" 
                        />
                        <input 
                            type="text" 
                            value={amount} 
                            onChange={e => setAmount(e.target.value)} 
                            placeholder="Amount" 
                        />
                        <input 
                            type="text" 
                            value={desiredToken} 
                            onChange={e => setDesiredToken(e.target.value)} 
                            placeholder="Desired Token Address" 
                        />
                        <input 
                            type="text" 
                            value={desiredAmount} 
                            onChange={e => setDesiredAmount(e.target.value)} 
                            placeholder="Desired Amount" 
                        />
                        <button type="submit">Create Listing</button>
                    </form>

                    <h2>Available Listings</h2>
                    {listings.map((listing, index) => (
                        <div key={index}>
                            {/* Display listing details */}
                            <button onClick={() => handleExecuteTrade(index)}>Execute Trade</button>
                        </div>
                    ))}
                </>
            ) : (
                <p>Please connect your wallet to interact with the contract.</p>
            )}
        </div>
    );
};

export default ContractInteraction;
