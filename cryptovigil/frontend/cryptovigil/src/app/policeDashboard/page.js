"use client";
import React, { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
import styles from "../styles/GetInForm.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icons for light/dark mode
import { MdSearch } from "react-icons/md"; // Search icon
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Up and down arrows for price changes

const roboto = Roboto({
  weight: ["400", "700"], // Valid weights for the font
  subsets: ["latin"], // Ensure you include the appropriate subset
});

const features = [
  {
    title: "Monitor Global Transaction",
    description:
      "Monitor Every Crypto Transaction on the Blockchain and track the fund movement within wallets to get real time information",
    status: "Explore",
  },
  {
    title: "Peer to Peer Details (Need Login)",
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
  {
    title: "Suspicious Transaction Alert",
    description:
      "Ge alert on the go on your mobile device, if any sucpisous wallet is detected with every single details",
    status: "Active",
  },
  {
    title: "Flag High-Risk Transactions",
    description:
      "Get all information about the suspicious wallets on cryptoexchanges uding advance deep learning model. Allow officials to keep a track of them",
    status: "Flagged",
  },
  {
    title: "Scrap Wallet Data",
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
  const router = useRouter(); // Use useRouter from "next/navigation"

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
            : "rgba(255,255,255 0.4)", // Light gray with transparency for dark mode, white with transparency for light mode
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
            <div className="flex justify-center mt-8 ml-4 mb-8">
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
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto cursor-pointer">
              {filteredFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? "bg-gradient-to-r from-green-800 via-gray-900 to-green-500"
                      : "bg-gradient-to-r from-green-300 to-white"
                  }`}
                  onClick={() => {
                    if (index === 0) {
                      router.push(
                        "https://bc-lemon.vercel.app/#!1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F"
                      ); // Redirect to /google when clicking the first card
                    }
                    if (index === 5){
                      router.push("https://node-view.vercel.app/")
                    }
                  }}
                  
                    

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
            className={`w-64 border-l mt-24 mr-4 border rounded-lg ${
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

          <div className="mt-4 ml-10 border-[#3cabfa] rounded-lg w-[55%]">
  <div className="relative bg-transparent h-[70vh]"> {/* Adjust height */}
    {/* Background Image */}
    <Image
      src="/target.png"
      alt="Background"
      layout="fill" // Fill the section
      objectFit="cover" // Cover the entire section
      className="shadow-lg rounded-lg" // Add a shadow and rounded corners
    />
    <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
    {/* Text for Features */}
    <p className="absolute inset-0 text-center text-[30px] mt-2 text-white">
      Features Of Global Transaction Tracking
    </p>
    <div className="relative z-10 flex flex-col items-center">
      <div
        className={`mt-20 ${
          darkMode ? "" : "bg-white bg-opacity-30"
        } rounded-lg mb-10`}
      >
        {/* First Section */}
        <div className="h-1/2 flex flex-col relative items-center">
          <div className="flex">
            <div className="w-full p-4 bg-transparent text-left">
              <div className="flex flex-row mt-2">
                <img
                  src="/Cryptocurrency-Transactions.png"
                  alt="wallet"
                  className="h-[125px] w-[200px] p-2"
                />
                <div className="text-center mt-4 relative z-10">
                  <p className="text-xl text-left ml-4 text-white">
                    Complete Wallet Insights Includes
                  </p>
                  <ul>
                    <li className="text-left ml-4 text-white">
                      Wallet ID - Wallet Balance
                    </li>
                    <li className="text-left ml-4 text-white">
                      Wallet Transactions
                    </li>
                    <li className="text-left ml-4 text-white">
                      Wallet Address
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="h-1/2 flex flex-col relative items-center">
          <div className="flex">
            <div className="w-full p-4 bg-transparent text-center">
              <div className="flex flex-row">
                <img
                  src="/Blockchain.png"
                  alt="wallet"
                  className="h-[125px] w-[200px] p-2"
                />
                <div className="text-center mt-2 relative z-10">
                  <p className="text-xl text-left ml-4 text-white">
                    Complete Wallet Insights Includes
                  </p>
                  <ul>
                    <li className="text-left ml-4 text-white">
                      Wallet ID - Wallet Balance
                    </li>
                    <li className="text-left ml-4 text-white">
                      Wallet Transactions
                    </li>
                    <li className="text-left ml-4 text-white">
                      Wallet Address
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          {/* ANCHAL eDIT SECTION ENDS */}
        </div>
      </div>

      {/* other section */}
      <div
        className={` flex flex-col text-center mb-2 border-2 rounded-xl m-8 ${
          darkMode ? "border-white" : "border-black"
        }`}
      >
        <div className={`${roboto.className} text-3xl font-semibold`}>
          <span
            className={`material-icons m-2 mt-6 mb-3  ${
              darkMode ? "text-white" : "text-black"
            } `}
          >
            location_on
          </span>
          LOCATE WALLET ON MAP
        </div>
        <div className="relative w-full h-screen">
          <div className="relative w-full h-screen">
            <img
              src="/HOME LOGIN.png"
              alt="location"
              className="h-full w-full object-cover"
            />
            <div className="absolute mt-40 mr-14 top-0 right-0 h-full w-1/3 p-2 ">
              <div className="bg-transparent border border-1 border-white rounded-lg shadow-lg py-6">
                <div className={styles.container}>
                  <h1 className={styles.title}>Wallet Location Tracer</h1>
                  <hr className="bg-green-700"></hr>
                  <form className={styles.form}>
                    <label className="text-left text-xl">
                      Organization Code
                    </label>
                    <input
                      type="password"
                      placeholder="ABC1234"
                      className={styles.input}
                      required
                    />
                    <label className="text-left text-xl">Validated IP</label>
                    <input
                      type="password"
                      placeholder="Fetching Your IP"
                      className={styles.input}
                      disabled
                      readOnly
                      required
                      value={userIP}
                    />
                    <button
                      type="submit"
                      className={styles.trackButton}
                      onClick={() => {
                        router.push("Testing");
                      }}
                    >
                      TRACK
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1
        className={`ext-white text-4xl font-bold justify-center items-center ml-[40%] mb-5 mt-2 font-mono ${
          darkMode ? "text-white" : "text-black"
        } `}
      >
        Sucpisous Wallets
      </h1>

      <div
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('/Aksi.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-0 flex justify-center "></div>
      </div>
    </div>
  );
};

export default OfficialsPage;
