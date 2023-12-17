import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import '../src/walletconnection.css';

const WalletConnection = ({ setProvider, setAccount }) => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            checkIfWalletIsConnected();
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        };
    }, []);

    const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
            setAccount(accounts[0]);
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
            setIsConnected(true);
        } else {
            setIsConnected(false);
            setProvider(null);
            setAccount(null);
        }
    };

    const checkIfWalletIsConnected = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            setAccount(accounts[0]);
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
            setIsConnected(true);
        }
    };

    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
            setIsConnected(true);
        } catch (error) {
            console.error('Failed to connect the wallet:', error);
        }
    };

    return (
        <div>
            {!isConnected ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <p>Wallet Connected</p>
            )}
        </div>
    );
};

export default WalletConnection;
