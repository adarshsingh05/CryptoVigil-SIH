"use client";

import { useEffect, useState } from "react";
import { JsonRpcProvider, Wallet, formatUnits, parseUnits } from "ethers";
import Link from "next/link";

export default function Home() {
  const [provider, setProvider] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [privateKey, setPrivateKey] = useState("");
  const [walletId, setWalletId] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!privateKey || !walletId) {
        setError("Please provide both wallet ID (address) and private key.");
        return;
      }

      const newProvider = new JsonRpcProvider(
        process.env.NEXT_PUBLIC_LOCAL_RPC_URL
      );
      const newWallet = new Wallet(privateKey, newProvider);

      if (newWallet.address !== walletId) {
        setError(
          "Wallet ID (address) does not match the provided private key."
        );
        return;
      }

      setProvider(newProvider);
      setWallet(newWallet);
      setError("");
    } catch (err) {
      setError("Invalid private key or address.");
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet) {
        try {
          const balance = await provider.getBalance(wallet.address);
          const formattedBalance = formatUnits(balance, 18); // Convert wei to ETH
          setBalance(formattedBalance);
        } catch (err) {
          setError("Failed to fetch balance.");
        }
      }
    };
    if (wallet) fetchBalance();
  }, [wallet, provider]);

 
  // Function to fetch wallet balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet) {
        try {
          const balance = await provider.getBalance(wallet.address);
          const formattedBalance = formatUnits(balance, 18); // Convert wei to ETH
          setBalance(formattedBalance);
        } catch (err) {
          setError("Failed to fetch balance.");
        }
      }
    };
    if (wallet) fetchBalance();
  }, [wallet, provider]);

  // Function to handle transaction
  const handleTransaction = async (e) => {
    e.preventDefault();
    try {
      if (!receiver || !amount) {
        setError("Please provide a valid receiver address and amount.");
        return;
      }
  
      if (!wallet) {
        setError("Please open your wallet first.");
        return;
      }
  
      const parsedAmount = parseUnits(amount, 18); // Convert ETH to wei
      const tx = await wallet.sendTransaction({
        to: receiver,
        value: parsedAmount,
      });
  
      setTxHash(tx.hash); // Set transaction hash
      setError("");
  
      // Wait for the transaction to be mined and get the receipt
      const receipt = await tx.wait(); // Wait for transaction confirmation
  
  
      // Prepare transaction data for backend
      const transactionData = {
        txHash: receipt.transactionHash,
        from: receipt.from,
        to: receipt.to,
        value: formatUnits(parsedAmount, 18), // Convert back to ETH
        status: receipt.status === 1 ? "Success" : "Fail",
        gasUsed: receipt.gasUsed.toString(),
        effectiveGasPrice: receipt.effectiveGasPrice ? receipt.effectiveGasPrice.toString() : null,
        blockHash: receipt.blockHash,
        blockNumber: receipt.blockNumber,
        timestamp: new Date().toISOString(),
      };
  
      // Send transaction data to the backend
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to save transaction to the server.");
      }
  
      console.log("Transaction saved to the backend successfully.");
      setReceipt(transactionData); // Set the receipt state to show in the modal
    setShowModal(true); // Show the modal
    setError("");
    } catch (err) {
      setError("Transaction failed: " + err.message);
    }
  };
  

  return (
    <div className="container-fluid bg-black h-[100vh] d-flex justify-content-center">
      <header className="relative z-10 p-6 flex justify-center items-center border-2 border-[#63D134] ml-2 mr-2 rounded-2xl">
        <nav className="flex space-x-8 font-[var(--font-ropa-sans)]">
          <Link href="/" className="text-white hover:text-green-500">
            HOME
          </Link>
          <Link href="/explore" className="text-white hover:text-green-500">
            EXPLORE
          </Link>
          <Link href="/profile" className="text-white hover:text-green-500">
            PROFILE
          </Link>
        </nav>
      </header>

      <div
        id="content"
        className="row bg-[#495344] w-[49%] rounded-lg ml-10 mt-10"
      >
        <div id="content-inner" className="col text-white p-2">
          <div className="text-center">
            <h1 id="title" className="fw-bold text-2xl text-green-500">
              Access Your Crypto Wallet
            </h1>
            <p id="sub-title" className="mt-4 fw-bold mb-2">
              Manage your cryptocurrencies securely with CryptoVigil
            </p>
          </div>

          {!wallet ? (
            <div className="text-center">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Wallet ID"
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Private Key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  required
                />
                <button type="submit">Open Wallet</button>
              </form>
              {error && <p className="text-danger">{error}</p>}
            </div>
          ) : (
            <>
              <div>
                <p>Wallet Address: {wallet.address}</p>
                <p>Balance: {balance} ETH</p>
              </div>
              <form onSubmit={handleTransaction}>
                <input
                  type="text"
                  placeholder="Recipient Address"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Amount in ETH"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <button type="submit">Send Ether</button>
              </form>
            </>
          )}
        </div>
      </div>

      {showModal && receipt && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white rounded-lg shadow-lg p-6 w-auto relative">
      {/* Cross button */}
      <div
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-xl cursor-pointer text-gray-600 hover:text-gray-800"
      >
        &times; {/* Or use an SVG icon */}
      </div>

      <img
        src="accept 1.png"
        alt="Success"
        className="h-14 w-14 mx-auto"
      />
      <h2 className="text-2xl  text-center font-extrabold text-green-600 mb-4 mt-2">
        Transaction Successful
      </h2>
      <div className="text-md text-gray-700 border-green-600 border-2 p-4 rounded-lg">
        <h3 className="text-xl text-center border-b-2 border-b-green-500 mb-6">Transaction Details</h3>
        <p>
          <strong>Sender:</strong> {receipt.sender}
        </p>
        <p>
          <strong>Recipient:</strong> {receipt.recipient}
        </p>
        <p>
          <strong>Block Hash:</strong> {receipt.blockHash}
        </p>
        <p>
          <strong>Amount:</strong> {receipt.amount} ETH
        </p>
        <p>
          <strong>Gas Used:</strong> {receipt.gasUsed}
        </p>
        <p>
          <strong>Time:</strong> {receipt.timestamp}
        </p>
      </div>
    </div>
  </div>
)}

   
    </div>
  );
}
