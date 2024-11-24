"use client";
import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons for light/dark mode
import { MdSearch } from "react-icons/md"; // Search icon
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Up and down arrows for price changes

const features = [
  {
    title: "Monitor Global Transaction",
    description:
      "Monitor Every Crypto Transaction on the Blockchain and track the fund movement within wallets to get real time information",
    status: "Explore",
  },
  {
    title: "Get Peer to Peer Details",
    description:
      "Get peer to peer transation details done on this platform Without hampering user's personal Details.",
    status: "Explore",
  },
  {
    title: "Exact Location of Transaction",
    description:
      "Get the exact Location of the place from where the trasaction is initiated in form of latitude and longitude, easy to locate on map",
    status: "Investigated",
  },
  { title: "Feature Y", description: "Lorem Ipsum", status: "Active" },
  {
    title: "Flag High-Risk Transactions",
    description:
      "Get all information about the suspicious wallets on cryptoexchanges uding advance deep learning model. Allow officials to keep a track of them",
    status: "Flagged",
  },
  {
    title: "Export Reports",
    description:
      "Download transaction data for audits and analysis. Download complete pdf format data to get clear view of wallets,, Including Wallet id , Transaction, Gas Used and a lot more ",
    status: "Active",
  },
];

const OfficialsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cryptoPrices, setCryptoPrices] = useState([]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  // Fetch cryptocurrency prices from Coinbase API in INR
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coinbase.com/v2/exchange-rates?currency=INR"
        );
        const data = await response.json();

        const updatedPrices = [
          {
            name: "Bitcoin",
            symbol: "BTC",
            price: `₹${(1 / data.data.rates.BTC).toFixed(2)}`,
          },
          {
            name: "Ethereum",
            symbol: "ETH",
            price: `₹${(1 / data.data.rates.ETH).toFixed(2)}`,
          },
          {
            name: "Litecoin",
            symbol: "LTC",
            price: `₹${(1 / data.data.rates.LTC).toFixed(2)}`,
          },
          {
            name: "Cardano",
            symbol: "ADA",
            price: `₹${(1 / data.data.rates.ADA).toFixed(2)}`,
          },
        ];

        // Compare with previous prices and set arrows for changes
        const newPrices = updatedPrices.map((crypto) => {
          const prevCrypto = cryptoPrices.find(
            (item) => item.symbol === crypto.symbol
          );
          if (prevCrypto) {
            const prevPrice = parseFloat(prevCrypto.price.replace("₹", ""));
            const newPrice = parseFloat(crypto.price.replace("₹", ""));
            const priceChange =
              newPrice > prevPrice
                ? "up"
                : newPrice < prevPrice
                ? "down"
                : prevCrypto.priceChange;
            return { ...crypto, priceChange }; // Keep previous priceChange if no change
          }
          return { ...crypto, priceChange: "same" }; // Initial state for first fetch
        });

        setCryptoPrices(newPrices);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [cryptoPrices]);

  const filteredFeatures = features.filter((feature) =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 flex items-center justify-between bg-opacity-90 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } px-8 py-4 shadow-md`}
      >
        {/* Centered Logo and Title */}
        <h1 className="text-2xl font-bold flex items-center justify-center mx-auto">
          <img
            className={`h-8 transition-all duration-300 ml-4 ${
              darkMode ? "" : "filter invert"
            }`}
            src="/text.png"
            alt="Logo"
          />
          <span className="ml-3">Crypto Transactions Monitoring System</span>
        </h1>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="absolute right-8 text-xl flex items-center justify-center w-10 h-10 rounded-full border shadow-md transition-all duration-200"
          style={{
            backgroundColor: darkMode ? "white" : "black",
            color: darkMode ? "black" : "white",
          }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>
      <div
        className=" rounded-3xl m-8"
        style={{
          backgroundColor: darkMode
            ? "rgba(0, 0, 0, 0.3)"
            : "rgba(255,255,255 0.6)", // Light gray with transparency for dark mode, white with transparency for light mode
          // color: darkMode ? "white" : "black",
          backdropFilter: darkMode ? "blur(8px)" : "blur(4px)", // Dark mode gets a stronger blur, light mode a lighter blur
          border: darkMode
            ? "2px solid rgba(255, 255, 255, 0.8)"
            : "2px solid rgba(0, 0, 0, 0.8)", // Slightly transparent border
        }}
      >
        {/* Main Content */}
        <div className="flex">
          <div className="flex-grow">
            {/* Search and Filters */}
            <div className="flex justify-center mt-8 ml-4 mb-4">
              <input
                type="text"
                placeholder="Search for Features..."
                className="p-3 rounded-l-lg border focus:outline-none  text-green-700 ml-52 w-1/2 "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-green-600 text-white px-4 py-3 rounded-r-lg hover:bg-green-500">
                <MdSearch />
              </button>
            </div>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
              {filteredFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? "bg-gradient-to-r from-green-800 via-gray-900 to-green-600"
                      : "bg-gradient-to-r from-green-200 to-white"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2
                      className={`text-xl font-semibold ${
                        darkMode
                          ? "group-hover:text-yellow-300"
                          : "group-hover:text-green-800"
                      }`}
                    >
                      {feature.title}
                    </h2>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        feature.status === "Flagged"
                          ? "bg-red-500 text-white"
                          : feature.status === "Active"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-sm">{feature.description}</p>
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <div
            className={`w-64 border-l mt-20 mr-4 border rounded-lg ${
              darkMode ? "border-gray-700" : "border-gray-300"
            } p-4 bg-opacity-90 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-lg font-bold mb-4">Live Crypto Prices (INR)</h2>
            <hr className="mb-2"></hr>
            <ul>
              {cryptoPrices.map((crypto, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-4 p-3 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-green-200"
                >
                  <div>
                    <p className="font-bold">{crypto.name}</p>
                    <p className="text-sm text-gray-700">{crypto.symbol}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold">{crypto.price}</p>
                    {crypto.priceChange === "up" && (
                      <FaArrowUp className="text-green-500 ml-2" />
                    )}
                    {crypto.priceChange === "down" && (
                      <FaArrowDown className="text-red-500 ml-2" />
                    )}
                    {crypto.priceChange === "same" && (
                      <span className="ml-2">—</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* main div 1 */}
        <div className="mt-3 flex flex-row m-4 ">
          {/* side div 1 */}
          <div
            className={`w-[35%] mt-6 rounded-lg ml-14 shadow-md transition-all duration-300 relative ${
              darkMode ? "text-white" : "text-white"
            }`}
            style={{
              backgroundImage: "url('/diver.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Semi-transparent overlay */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                backgroundColor: darkMode
                  ? "rgba(0, 0, 0, 0.5)"
                  : "rgba(0, 0, 0, 0.3)", // Adjust transparency
              }}
            ></div>

            {/* Content */}
            <div className="relative p-4 z-10 font-semibold">
              <p className="text-center font-mono text-3xl mb-4">
                How to Track Global Transactions?
              </p>
              <p className={`mb-2 ${darkMode ? "text-white" : "text-white"}`}>
                Step 1: Click on the Card above to Access the Link of tracking
                window
              </p>
              <p className={`mb-2 ${darkMode ? "text-white" : "text-white"}`}>
                Step 2: Monitor any Wallet with just Wallet ID; enter the wallet
                ID to fetch all Transactions
              </p>
              <p className={`mb-2 ${darkMode ? "text-white" : "text-white"}`}>
                Step 3: Observe the Nodes and the arrows to monitor the fund
                flow
              </p>
              <p className={`mb-2 ${darkMode ? "text-white" : "text-white"}`}>
                Step 4: Double-click on the node to fetch extra details like
                incoming and outgoing fund details
              </p>
            </div>
          </div>
          {/* side div 2 */}
          <div className="mt-4 ml-72 border-4 border-t-pink-500 border-b-green-500 border-l-pink-500 border-r-green-500 rounded-lg">
            <p>Features Of Global Transaction Tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialsPage;
