import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const onConnectMetaMask = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    setWalletAddress(accounts[0]);
  };

  const onLogoutMetaMask = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
    setWalletAddress("");
  };
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onConnectMetaMask}>Connect to MetaMask</button>
        <p>Wallet address: {walletAddress}</p>
        <button onClick={onLogoutMetaMask}>Logout</button>
      </div>
    </>
  );
}

export default App;
