"use client";

import { useEffect, useState } from "react";
import LoaderModal from "../components/loader";

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
  const [showModal2, setShowModal2] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const[isloadingtwo,setIsLoadingTwo] = useState(false);
  const [ip, setIp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
      setProvider(newProvider);
      setWallet(newWallet);
      setError("");
    } catch (err) {
      setError("Invalid private key or address.");
    }
  };
  let [userIP, setUserIP] = useState("");
  // getting current IP
  useEffect(() => {
    fetch("https://backend-ip.vercel.app/api/ip", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        userIP = data.ip;
        setUserIP(data.ip);
        console.log("IP Address:", data.ip);
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
      });
  }, []);

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

  useEffect(() => {
    fetch('https://backend-ip.vercel.app/api/ip', {
      method: 'GET',
      credentials: 'include', 
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('IP Address 2:', data.ip);
    })
    .catch((error) => {
      console.error('Error fetching IP:', error);
    });
  }, []);

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
  
      if (!userIP) {
        setError("Unable to fetch your IP address. Please try again.");
        return;
      }
      setIsLoadingTwo(true);
  
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
        effectiveGasPrice: receipt.effectiveGasPrice
          ? receipt.effectiveGasPrice.toString()
          : null,
        blockHash: receipt.blockHash,
        blockNumber: receipt.blockNumber,
        ip: userIP, // Include IP address
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
      }      setIsLoadingTwo(false);

  
      console.log("Transaction saved to the backend successfully.");
      setReceipt(transactionData); // Set the receipt state to show in the modal
      setShowModal(true); // Show the modal
      setError("");
      console.log("model already triggeres");
    } catch (err) {
      console.error("Transaction failed:", err);
      setError("Transaction failed: " + err.message);
    }
  };
  

  return (
    <>
      <div className=" bg-black flex justify-content-center justify-center flex-col">
        
      
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/block-1.png')",
            backgroundSize: "100%", // Adjust the zoom-out level
            backgroundPosition: "center", // Keep the image centered
            backgroundRepeat: "no-repeat", // Avoid tiling the image
          }}
        >
          <div className="flex flex-row mt-8 ">
          <img src="text.png" className="w-[520px] p-2 ml-[340px] "></img>
          <p className="text-white font-mono text-4xl text-center items-center mt-3"> Crypto Transactions</p>
        </div>
          <div
            id="content"
            className="row bg-[#495344] w-[49%] rounded-lg ml-10 hidden "
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

          <div className="text-center mt-[90px] justify-center   items-center flex flex-col">
            <p className="text-white text-[50px] font-mono ">
              Cryptovigils Makes Crypto Transactions{" "}
            </p>
            <p className="border-1 border-red-500 rounded-3xl p-4 mt-8 mb-10 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg">
              {" "}
              <span className="text-[50px] mr-[20px] mb-[70px] text-blue-500">
                Clear
              </span>{" "}
              <span className="text-[#ec58d6]  mr-[20px]  text-[50px]">
                Simple
              </span>{" "}
              <span className="text-[50px]  mr-[20px]  text-white">and</span>{" "}
              {"  "}
              <span className="text-[50px]  mr-[20px]  text-blue-500">
                Transparent
              </span>
            </p>
            <p className="text-white text-xl mt-2  hover:text-green-500 cursor-pointer underline font-mono">
              {" "}
              The most Secure Platform for your cryptocurrency Exchanges within
              Minutes, Explore{" "}
            </p>
            <p className="text-white text-xl hover:text-green-500 cursor-pointer underline font-mono mb-6">
              lightning Fast speed of Blockchain at Cryptovigil{" "}
            </p>
            <button
              className="px-2 mt-6 mb-8 py-2 text-lg rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-md hover:shadow-lg hover:text-green-300"
              onClick={() => setShowModal2(true)}
            >
              Get Started
            </button>
            <div>
              <div className="flex flex-row mt-6 mb-6 pb-8 justify-around">
                <div className="text-white  h-[270px] w-[270px] mx-14  rounded-3xl bg-[#1A1B23]  ">
                  <img
                    src="img.png"
                    className=" ml-[100px] h-[70px] w-[60px] mx-14 rounded-3xl mt-4"
                    alt="img"
                  ></img>
                  <h2 className="text-2xl mt-2"> Login to Wallet</h2>
                  <p className="font-mono p-2 text-gray-500">
                    Login into your wallet with just Wallet Id and the Private
                    Key,Login Now to make transactions
                  </p>
                  <p className="underline text-sm text-[#B982FF]">
                    Learn More{" "}
                  </p>
                </div>
                <div className="text-white  h-[270px] w-[270px] mx-14  rounded-3xl bg-[#1A1B23]  ">
                  <img
                    src="img(1).png"
                    className=" ml-[100px] h-[70px] w-[60px] mx-14 rounded-3xl mt-4"
                    alt="img"
                  ></img>
                  <h2 className="text-2xl mt-2">Make Transactions</h2>
                  <p className="font-mono p-2 text-gray-500">
                    Cryptovigil Allows you to make transaction to any known and
                    registered wallet ID just with one click
                  </p>
                  <p className="underline text-sm text-[#B982FF]">
                    Learn More{" "}
                  </p>
                </div>
                <div className="text-white  h-[270px] w-[270px] mx-14  rounded-3xl bg-[#1A1B23]  ">
                  <img
                    src="img(2).png"
                    className=" ml-[100px] h-[70px] w-[60px] mx-14 rounded-3xl mt-4"
                    alt="img"
                  ></img>
                  <h2 className="text-2xl mt-2"> Check Wallet Details</h2>
                  <p className="font-mono p-2 text-gray-500">
                    Get complete access to your crypto wallet just with one
                    login - check balance, see recent Transactions etc...
                  </p>
                  <p className="underline text-sm text-[#B982FF]">
                    Learn More{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showModal2 && (
  <div className="text-center fixed flex flex-col inset-0 z-50 items-center border-2 border-white bg-black bg-opacity-90 backdrop-blur-sm h-4/6 w-[650px] ml-[400px] mt-[120px] rounded-2xl">
    <div className="flex flex-row">
      <img src="BitcoinPrivate.svg" className="h-14 w-14 mt-5 mr-4 mb-1 mx-auto" alt="Crypto Wallet Logo" />
      <h1 className="text-center text-blue-400 text-3xl mt-6 mb-6 font-Emilio">
        Welcome to Your Crypto-Wallet
      </h1>
    </div>
    {!wallet ? (
      <div className="font-mono text-[#ec58d6]">
        Please Log In to proceed with transactions or other wallet details!
      </div>
    ) : (
      <div className="flex flex-col mb-2">
        <p className="font-mono text-[#ec58d6]">You are logged in to your wallet Successfully!</p>
      </div>
    )}

    {/* Close Button */}
    <button
      onClick={() => setShowModal2(false)}
      className="absolute top-2 right-2 text-gray-500 hover:text-white"
    >
      ✕
    </button>

    {!wallet ? (
      // Form to open the wallet
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Wallet ID"
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
          required
          className="mb-8 p-2 border w-[600px] border-gray-300 rounded mt-4"
        />
        <input
          type="password"
          placeholder="Private Key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          required
          className="mb-8 p-2 border border-gray-300 rounded"
        />

        {isLoading ? (
          <div className="flex items-center justify-center mb-4">
            <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
          </div>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Open Wallet
          </button>
        )}
      </form>
    ) : (
      // Display wallet information and transaction form
      <>
        <div className="mb-4 text-white">
          <p><span className="text-green-500">Wallet Address:</span> {wallet.address}</p>
          <p className="text-left"><span className="text-green-500">Balance:</span> {balance} ETH</p>
        </div>
        <p className="text-white mb-2 font-mono text-lg">Transfer Crypto Module</p>
        <form className="flex flex-col" onSubmit={handleTransaction}>
          <span className="text-white text-left">To (Public Address)</span>
          <input
            type="text"
            placeholder="Recipient Address"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            required
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <span className="text-white text-left">Amount (in ETH)</span>
          <input
            type="text"
            placeholder="Amount in ETH"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mb-2 p-2 w-[500px] border border-gray-300 rounded"
          />
          {/* for IP */}
         
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
          >
            Send Ether
          </button>
          <LoaderModal isLoading={isloadingtwo} message="Transaction in progress, please wait..." />
        </form>
      </>
    )}

    {/* Error message */}
    {error && <p className="text-red-500 mt-2">{error}</p>}
    {showModal && receipt && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-6 w-auto relative">
              {/* Cross button */}
              <div
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-xl cursor-pointer text-gray-200 hover:text-white"
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
                <h3 className="text-xl text-center border-b-2 border-b-green-500 mb-6">
                  Transaction Details
                </h3>
                <p>
                  <strong>Sender:</strong> {receipt.from}
                </p>
                <p>
                  <strong>Recipient:</strong> {receipt.to}
                </p>
                <p>
                  <strong>Block Hash:</strong> {receipt.blockHash}
                </p>
                <p>
                  <strong>Amount:</strong> {receipt.value} ETH
                </p>
                <p>
                  <strong>Status:</strong> {receipt.status} ETH
                </p>
                <p>
                  <strong>Gas Used:</strong> {receipt.gasUsed}
                </p>
                <p>
                  <strong>Time:</strong> {receipt.timestamp}
                </p>
                <p>
                  <strong>Sender's IP:</strong> {receipt.ip}
                </p>
              </div>
            </div>
          </div>
        )}
  </div>
)}

        
   </div>
   </>
  );
}
