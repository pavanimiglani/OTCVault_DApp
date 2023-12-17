import React, { useState } from 'react';
import WalletConnection from './walletconnection';
import ContractInteraction from './contractinteraction';
import './App.css';

function App() {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);

    return (
        <div className="App">
            <h1>OTC Trade DApp</h1>
            <WalletConnection setProvider={setProvider} setAccount={setAccount} />
            {provider && account && (
                <ContractInteraction provider={provider} account={account} />
            )}
        </div>
    );
}

export default App;