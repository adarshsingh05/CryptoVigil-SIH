"use client";
import React from "react";
import { Ropa_Sans } from "next/font/google";
import { MdSearch } from "react-icons/md"; // Search icon
import { FaRegNewspaper } from "react-icons/fa";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { TbCoinBitcoin } from "react-icons/tb";
import { HiOutlineBellAlert, HiOutlineChartPie } from "react-icons/hi2";
import { LuWalletMinimal } from "react-icons/lu";

// Importing the Ropa Sans font from Google Fonts
const ropaSans = Ropa_Sans({
  weight: "400", // You can specify different weights like "400" or "700"
  subsets: ["latin"], // Ensure the subset is correct for your content
});

const UserDashboard = () => {
  return (
    <div>
    <div className="bg-[#0e0e0e] min-h-screen flex">
      
      {/* Sidebar */}
      <div className="bg-[#252652] w-[250px] h-full flex flex-col p-4 min-h-screen">
        <img
          className="items-left mt-[35px] mr-[10px] ml-[10px] p-2 flex"
          src="/text.png"
          alt="Logo"
          width={200}
        />
        <ul className="list-none p-0 space-y-4">
          <li className={`${ropaSans.className} text-white text-[28px] mt-[20px] ml-[30px] py-2 flex`}>
            <IoHomeOutline className="mt-[5px] mr-4" /> Home
          </li>
          <li className={`${ropaSans.className} text-white text-[28px] mt-[10px] ml-[30px] py-2 flex`}>
            <TbCoinBitcoin className="mt-[5px] mr-4" /> Leads
          </li>
          <li className={`${ropaSans.className} text-white text-[28px] mt-[10px] ml-[30px] py-2 flex`}>
            <HiOutlineBellAlert className="mt-[5px] mr-4" /> Alerts
          </li>
          <li className={`${ropaSans.className} text-white text-[28px] mt-[10px] ml-[30px] py-2 flex`}>
            <HiOutlineChartPie className="mt-[5px] mr-4" /> Chart
          </li>
          <li className={`${ropaSans.className} text-white text-[28px] mt-[10px] ml-[30px] py-2 flex`}>
            <LuWalletMinimal className="mt-[5px] mr-4" /> Wallet
          </li>
          <li className={`${ropaSans.className} text-white text-[28px] mt-[10px] ml-[30px] py-2 flex`}>
            <FaRegNewspaper className="mt-[5px] mr-4" /> News
          </li>
          <li className={`${ropaSans.className} text-white text-[28px] mt-[10px] ml-[30px] py-2 flex`}>
            <IoSettingsOutline className="mt-[5px] mr-4" /> Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className={`${ropaSans.className} text-white font-bold text-[64px] text-left pl-4 pt-4 ml-[10px]`}>
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
        <div className="flex space-x-6">
          {/* Left half for PI and Linked Crypto Accounts */}
          <div className="w-1/2 space-y-6">
            {/* Personal Information Card */}
            <div className="relative p-[3px] rounded-lg bg-gradient-to-b from-purple-600 via-blue-500 to-[#15f4b7] h-[243px]">
              <div className="text-center text-white">
                <h2 className={`${ropaSans.className} text-[28px] text-white text-left ml-2 p-2`}>
                  Personal Information
                </h2>
              </div>
              <div className="bg-black rounded-lg text-white p-6 h-[179px]">
                <p className="text-center mt-4">Card Content</p>
              </div>
            </div>

            {/* Linked Crypto Accounts Card */}
            <div className="relative p-[3px] rounded-lg bg-gradient-to-b from-purple-600 via-blue-500 to-[#15f4b7] h-[243px]">
              <div className="text-center text-white">
                <h2 className={`${ropaSans.className} text-[28px] text-white text-left ml-2 p-2`}>
                  Linked Crypto Accounts
                </h2>
              </div>
              <div className="bg-black rounded-lg text-white p-6 h-[179px]">
                <p className="text-center mt-4">Card Content</p>
              </div>
            </div>
          </div>

          {/* Right half for Transaction Log */}
          <div className="w-1/2">
            <div className="relative p-[3px] rounded-lg bg-gradient-to-b from-purple-600 via-blue-500 to-[#15f4b7] h-[515px]">
              <div className="text-center text-white">
                <h2 className={`${ropaSans.className} text-[28px] text-white text-left ml-2 p-2`}>
                  Transaction Log
                </h2>
              </div>
              <div className="bg-black rounded-lg text-white p-6 h-[451px]">
                <p className="text-center mt-4">Card Content</p>
              </div>
            </div>
            </div>
          </div>
        </div>

      </div>

      {/*PART TWO*/}
      <div className="bg-[#0e0e0e] min-h-screen flex">
        <div className="bg-[#232323] w-full h-full m-[62px] rounded-[60px]">
          
          <h1 className={`${ropaSans.className} tracking-tighter text-white text-[32px]  pl-12 pt-6 `}> Total Balance</h1>
          <h1 className={`${ropaSans.className} tracking-tighter text-white text-[64px] ml-[45px] mt-[-15px] `}>  $154,610.00</h1>
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
        
         <h1 className={`${ropaSans.className} tracking-tighter text-white text-[24px]  `}>Bitcoin</h1>
         <h1 className={`${ropaSans.className} tracking-tighter text-white text-[15px]   `}>BTC</h1>
         <div>
     
        <h1 className={`${ropaSans.className} tracking-tighter text-white text-[32px]  p-1 ml-[-80px] `}>$52,857</h1>

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
         <h1 className={`${ropaSans.className} tracking-tighter text-[#252652] text-[40px]  text-center `}> My Portofolio</h1>
         
         <div className="border w-full border-2 mt-2 "></div>
         <img
          className="items-left  p-4 "
          src="/bitcoin-logo.png"
          alt="Logo"
          width={80}
        />
         <div className="border w-full border-2 mt-2 "></div>
         <img
          className="items-left  p-4 "
          src="litecoin.png"
          alt="Logo"
          width={80}
        />
         <div className="border w-full border-2 mt-2 "></div>
         <img
          className="items-left  p-4 "
          src="/Solana.png"
          alt="Logo"
          width={80}
        />
         <div className="border w-full border-2 mt-2 "></div>
         <img
          className="items-left  p-4 "
          src="/Ripple.png"
          alt="Logo"
          width={80}
        />

         <div className="border w-full border-2 mt-2 "></div>
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
