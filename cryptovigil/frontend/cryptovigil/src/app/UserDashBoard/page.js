"use client";
import React from "react";
import { Ropa_Sans } from "next/font/google";
import { MdSearch } from "react-icons/md"; // Search icon
import { FaRegNewspaper } from "react-icons/fa";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { TbCoinBitcoin } from "react-icons/tb";
import { HiOutlineBellAlert, HiOutlineChartPie } from "react-icons/hi2";
import { LuWalletMinimal } from "react-icons/lu";
import { useEffect, useState } from "react";

// Importing the Ropa Sans font from Google Fonts
const ropaSans = Ropa_Sans({
  weight: "400", // You can specify different weights like "400" or "700"
  subsets: ["latin"], // Ensure the subset is correct for your content
});

const UserDashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const transactions = [
    {
      id: "0x23618e81e3f5cd7f54c3d657ffBC0aBf58218e8f",
      status: "Success",
      amount: "1.25 ETH",
      date: "2024-12-03",
    },
    {
      id: "0x4bC3df536cae1d89d5d48Ac91bEe0a927f827bb9",
      status: "Success",
      amount: "0.50 ETH",
      date: "2024-12-03",
    },
    {
      id: "0x9fC4e6a6B8277279cffC9c21e6654F3ad81e01ff",
      status: "Success",
      amount: "0.75 ETH",
      date: "2024-12-02",
    },
    {
      id: "0x3d6b8b08cd8F0eAb8A6e241dBfAcE5aaA82A998f",
      status: "Failed",
      amount: "2.00 ETH",
      date: "2024-12-01",
    },
    {
      id: "0x72e4c13f41fF8bCae16BdC5af1Bf927DaaB9cCe",
      status: "Success",
      amount: "3.00 ETH",
      date: "2024-11-30",
    },
    {
      id: "0x2fA2d3d5bAcDf41b8EAc27d1E91bBA24e83D12F3",
      status: "Success",
      amount: "4.33 ETH",
      date: "2024-11-29",
    },
    {
      id: "0x8cDbf14b29E6BaF6c41b07aF2C3Cd91Df4bAb80",
      status: "Success",
      amount: "8.95 ETH",
      date: "2024-11-28",
    },
    {
      id: "0x6EdCAbD95A72Bb4FEDe34BfCd39AeD207b71C",
      status: "Success",
      amount: "6.00 ETH",
      date: "2024-11-27",
    },
  ];
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("Retrieved token:", token); // Debugging token retrieval

      if (token) {
        try {
          const response = await fetch("http://localhost:4000/api/auth/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log("API Response:", data); // Debugging API response

          if (response.ok) {
            setUser(data.user);
          } else {
            console.error("Failed to fetch user data:", data.msg);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No token found in localStorage");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="bg-black">
      <div className="bg-[url('/bg-img(1).png')] bg-cover bg-center flex">
        {/* Sidebar */}
        <div
          className="bg-transparent w-[250px] ml-6 border-2 border-[#8b3aeb] rounded-md mb-6 mt-16 h-[600px] flex flex-col p-4"
          style={{
            boxShadow: "2px 2px 2px #15f2b8",
          }}
        >
          <img
            className="items-left mt-[1px] mr-[10px] ml-[10px] p-2 flex"
            src="/text.png"
            alt="Logo"
            width={200}
          />
          <ul className="list-none p-0 space-y-4">
            <li
              className={`${ropaSans.className} text-white text-[23px] hover:rounded-lg hover:text-[#8b3aeb] hover:px-2 cursor-pointer hover:bg-[#15f2b8] mt-[10px] ml-[1px] py-2 flex`}
            >
              <IoHomeOutline className="mt-[5px] mr-4 " /> Home
            </li>
            <li
              className={`${ropaSans.className} text-white text-[23px] hover:rounded-lg hover:text-[#8b3aeb] hover:px-2 cursor-pointer hover:bg-[#15f2b8] mt-[10px] ml-[1px] py-2 flex`}
            >
              <TbCoinBitcoin className="mt-[5px] mr-4" /> Leads
            </li>
            <li
              className={`${ropaSans.className} text-white text-[23px] hover:rounded-lg hover:text-[#8b3aeb] hover:px-2 cursor-pointer hover:bg-[#15f2b8] mt-[10px] ml-[1px] py-2 flex`}
            >
              <HiOutlineBellAlert className="mt-[5px] mr-4" /> Alerts
            </li>
            <li
              className={`${ropaSans.className} text-white text-[23px] hover:rounded-lg hover:text-[#8b3aeb] hover:px-2 cursor-pointer hover:bg-[#15f2b8] mt-[10px] ml-[1px] py-2 flex`}
            >
              <HiOutlineChartPie className="mt-[5px] mr-4" /> Chart
            </li>
            <li
              className={`${ropaSans.className} text-white text-[23px] hover:rounded-lg hover:text-[#8b3aeb] hover:px-2 cursor-pointer hover:bg-[#15f2b8] mt-[10px] ml-[1px] py-2 flex`}
            >
              <LuWalletMinimal className="mt-[5px] mr-4" /> Wallet
            </li>
            <li
              className={`${ropaSans.className} text-white text-[23px] hover:rounded-lg hover:text-[#8b3aeb] hover:px-2 cursor-pointer hover:bg-[#15f2b8] mt-[10px] ml-[1px] py-2 flex`}
            >
              <FaRegNewspaper className="mt-[5px] mr-4" /> News
            </li>
            <li
              className={`${ropaSans.className} text-white text-[23px] hover:rounded-lg hover:text-[#8b3aeb] hover:px-2 cursor-pointer hover:bg-[#15f2b8] mt-[10px] ml-[1px] py-2 flex`}
            >
              <IoSettingsOutline className="mt-[5px] mr-4" /> Settings
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 -mt-[40px] position-absolute ">
          <h1
            className={`${ropaSans.className} text-white font-bold text-[64px] text-left pl-4 pt-4 ml-[10px]`}
          >
            DASHBOARD
          </h1>

          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#3E3E3E] text-white text-[16px] px-4 py-2 rounded-full w-full pl-4 pr-12"
              />
              <MdSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xl" />
            </div>
          </div>

          {/* Cards Section: Left Half for PI & Linked Crypto Accounts, Right Half for Transaction Log */}
          <div className="flex space-x-[90px] ml-10">
            {/* Left half for PI and Linked Crypto Accounts */}
            <div className="w-1/2 space-y-">
              {/* Personal Information Card */}
              <div className="relative p-[3px] rounded-lg  h-[243px] mb-10">
                <div className="text-center text-white">
                  <h2
                    className={`${ropaSans.className} text-[28px] text-white text-left ml-2 p-2 bg-gradient-to-b from-purple-600 via-blue-500 to-[#15f4b7] rounded-lg`}
                  >
                    Personal Information
                  </h2>
                </div>
                <div className="bg-transparent rounded-xl text-white p-6 h-[179px]  ">
                  <div className="text-center mt-2 flex flex-row justify-evenly border-l-2 border-gradient-to-b from-purple-600 via-blue-500 to-[#15f4b7] mb-[800px] border-r-2 rounded-xl">
                    <div>
                      <img
                        src="/users.png"
                        alt="User"
                        className="w-28 h-28 bg-black rounded-full "
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-mono text-xl mb-2">
                      Name:{" "}
  {user?.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : "Guest"}
                      </div>
                      <hr></hr>
                      <div className="font-mono text-xl mt-1">
                        User Contact Details:
                      </div>
                      <div className="font-mono text-xl">
                     Email:{" "}
  {user?.username
    ? user.email
    : "Guest"}
                      </div>
                      <div className="font-mono text-xl">
                      User ID:{" "}
  {user?.username
    ? user._id
    : "Guest"}                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Linked Crypto Accounts Card */}
              <div className="relative p-[3px] rounded-lg  h-[243px]">
                <div className="text-center text-white">
                  <h2
                    className={`${ropaSans.className} text-[28px] text-white text-left ml-2 p-2 bg-gradient-to-b from-purple-600 via-blue-500 to-[#15f4b7] rounded-lg`}
                  >
                    Linked Crypto Accounts
                  </h2>
                </div>
                <div className="bg-transparent rounded-lg text-white p-6 h-[179px]">
                  <div className="text-center mt-[1px]">
                    <table className="min-w-full table-auto border-separate mt-1 border-spacing-4 border-l-2 border-gradient-to-b from-purple-600 via-blue-500 to-[#15f4b7] mb-[800px] border-r-2 rounded-xl ">
                      <thead>
                        <tr>
                          <th
                            className={`${ropaSans.className} border px-4 py-1`}
                          >
                            Wallet name
                          </th>
                          <th
                            className={`${ropaSans.className} border px-4 py-1`}
                          >
                            Wallet ID
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            className={`${ropaSans.className} border px-4 py-1`}
                          >
                            Etherium
                          </td>
                          <td
                            className={`${ropaSans.className} border px-4 py-1`}
                          >
                            Xa0232949472943...32
                          </td>
                        </tr>
                        <tr>
                          <td
                            className={`${ropaSans.className} border px-4 py-1`}
                          >
                            Bitcoin
                          </td>
                          <td
                            className={`${ropaSans.className} border px-4 py-1`}
                          >
                            Xa34345782200545...79
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Right half for Transaction Log */}
            <div className="p-[2px] h-[500px] -space-y-2 ml-10 w-[460px] bg-gradient-to-b from-purple-600 via-blue-600 to-green-500 rounded-3xl shadow-md mt-[19px]">
              <h2 className={`${ropaSans.className} text-center text-white text-3xl  mb-1  p-2`}>
                Transaction Logs
              </h2>
              <div className="bg-[url('/minor.png')] bg-cover bg-center p-4 rounded-lg overflow-y-auto max-h-[400px] space-y-2">
                {transactions.map((txn, index) => (
                  <div
                    key={index}
                    className=" bg-transparent rounded-md border-b-gray-800 "
                  >
                    <p className="text-gray-300 text-sm break-all">
                      <span className="font-bold text-gray-400">ID:</span>{" "}
                      {txn.id}
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="font-bold text-gray-400">Status:</span>{" "}
                      <span
                        className={`font-semibold ${
                          txn.status === "Success"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </p>
                    <div className="flex flex-row justify-between">
                    <p className="text-gray-300 text-sm">
                      <span className="font-bold text-gray-400">Amount:</span>{" "}
                      {txn.amount}
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="font-bold text-gray-900">Date:</span>{" "}
                      {txn.date}
                    </p>
                    </div>
                    <div className="h-[1px] w-[400px] mt-4 bg-gray-400"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*PART TWO*/}
      <div className="bg-[#0e0e0e] min-h-screen items-center justify-center flex">
        <div className="bg-[#232323] w-auto h-auto rounded-[60px]">
          <h1
            className={`${ropaSans.className} tracking-tighter text-white text-[32px]  pl-12 pt-6 `}
          >
            {" "}
            Total Balance
          </h1>
          <h1
            className={`${ropaSans.className} tracking-tighter text-white text-[64px] ml-[45px] mt-[-15px] `}
          >
            {" "}
            $154,610.00
          </h1>
          <div className="flex justify-between p-4 space-x-1">
            <div className="bg-gradient-to-b from-[#7725E1] to-[#D3C8FD] w-[300px] h-[200px] rounded-3xl shadow-lg flex items-start ">
              <img
                className="items-left  p-4 "
                src="/bitcoin-logo.png"
                alt="Logo"
                width={100}
              />

              <div className="flex flex-col items-start">
                <img
                  className="mt-4 ml-[120px] relative mb-[-40px] "
                  src="/Vector.png"
                  alt="Logo"
                  width={55}
                />

                <h1
                  className={`${ropaSans.className} tracking-tighter text-white text-[24px]  `}
                >
                  Bitcoin
                </h1>
                <h1
                  className={`${ropaSans.className} tracking-tighter text-white text-[15px]   `}
                >
                  BTC
                </h1>
                <div>
                  <h1
                    className={`${ropaSans.className} tracking-tighter text-white text-[32px]  p-1 ml-[-80px] `}
                  >
                    $52,857
                  </h1>
                </div>
                <div className=" pt-2  ml-[-80px]">
                  <button className="bg-[#23C450] text-white text-[12px] p-[5px] rounded-[60px] ">
                    +0.25
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#7725E1] to-[#D3C8FD] w-[300px] h-[200px] rounded-3xl shadow-lg items-start ">
              <img
                className="items-left  p-4 "
                src="litecoin.png"
                alt="Logo"
                width={100}
              />
            </div>

            <div className="bg-gradient-to-b from-[#7725E1] to-[#D3C8FD] w-[300px] h-[200px] rounded-3xl shadow-lg items-start ">
              <img
                className="items-left  p-4 "
                src="/Solana.png"
                alt="Logo"
                width={100}
              />
            </div>
            <div className="bg-gradient-to-b from-[#7725E1] to-[#D3C8FD] w-[300px] h-[200px] rounded-3xl shadow-lg items-start  ">
              <img
                className="items-left  p-4 "
                src="/ethereum.png"
                alt="Logo"
                width={100}
              />
            </div>
          </div>

          <div className="p-4 w=1/3">
            <div className=" pt-2 bg-gradient-to-b from-[#18F6B7] to-[#6B39FE] w-[300px] h-[600px] rounded-3xl border-4 border-white   ">
              <h1
                className={`${ropaSans.className} tracking-tighter text-[#252652] text-[40px]  text-center `}
              >
                {" "}
                My Portofolio
              </h1>

              <div className=" w-full border-2 mt-2 "></div>
              <img
                className="items-left  p-4 "
                src="/bitcoin-logo.png"
                alt="Logo"
                width={80}
              />
              <div className=" w-full border-2 mt-2 "></div>
              <img
                className="items-left  p-4 "
                src="litecoin.png"
                alt="Logo"
                width={80}
              />
              <div className=" w-full border-2 mt-2 "></div>
              <img
                className="items-left  p-4 "
                src="/Solana.png"
                alt="Logo"
                width={80}
              />
              <div className=" w-full border-2 mt-2 "></div>
              <img
                className="items-left  p-4 "
                src="/Ripple.png"
                alt="Logo"
                width={80}
              />

              <div className=" w-full border-2 mt-2 "></div>
              <img
                className="items-left  p-4 "
                src="/ethereum.png"
                alt="Logo"
                width={80}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
