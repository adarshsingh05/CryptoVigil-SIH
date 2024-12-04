"use client"
import React, { useEffect, useState } from "react";
import styles from "../styles/GetInForm.module.css";
// comments

const DemoPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions"); // Update the URL based on your backend setup
        if (!response.ok) {
          console.log("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white"
      style={{ backgroundImage: "url('/physics.jpg')" }}
    >
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-[100%] w-80 bg-transparent flex flex-col items-center">
        <h1 className="text-2xl font-bold ml-16 mt-[130px]">
          <span className={styles.glower}>Monitor City Activities</span>
        </h1>
        <div className="w-[360px] px-4 mt-6 flex flex-row">
          <input
            type="text"
            placeholder="Search for Cities..."
            className="w-64 ml-16 py-2 px-3 text-sm text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
          />
          <button className="bg-green-600 rounded-md ml-3 p-2">
            <img className="h-5 w-[35px]" src="search.png" alt="Search" />
          </button>
        </div>
        <nav className="flex flex-col mt-6 w-full px-4">
          <a href="#" className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700 rounded-md text-center">
            Demo 11 April
          </a>
          <a href="#" className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700 rounded-md text-center">
            Penerbitan Mudik
          </a>
          <a href="#" className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700 rounded-md text-center">
            Pertahanan Lokal
          </a>
          <a href="#" className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700 rounded-md text-center">
            Penanggulangan Bencana
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-80 p-8">
        <h2 className="text-3xl font-bold text-center mb-4 font-mono">
          <span className={styles.glower}>Wallet Database -</span> <span className="text-blue-400">Informations</span>
        </h2>
        <div className="mt-14">
          {loading ? (
            <p>Loading data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-lg uppercase bg-[#000F1F] text-gray-300 border-b border-white font-mono">
                <tr>
                  <th className="px-4 relative">From</th>
                  <th className="px-9 py-2 ml-16 relative">To</th>
                  <th className="px-4 py-2 relative">Balance</th>
                  <th className="px-4 py-2 relative">Status</th>
                  <th className="px-4 py-2 relative">Block Hash</th>
                  <th className="px-4 py-2 relative">Block</th>
                  <th className="px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-800 mb-2">
                    <td className="px-4 py-2 text-white">{item.from}</td>
                    <td className="px-4 py-2 text-white">{item.to}</td>
                    <td className="px-4 py-2 text-green-500">{item.value}</td>
                    <td className="px-4 py-2 text-blue-400">{item.status}</td>
                    <td className="px-4 py-2 text-blue-400">{item.gasUsed} </td>
                    <td className="px-4 py-2 text-white">{item.blockHash}</td>
                    <td className="px-4 py-2 text-white">{item.block}</td>
                    <td className="px-4 py-2">{item.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <button className="fixed bottom-4 right-4 bg-blue-500 text-white text-3xl p-4 rounded-md shadow-lg hover:bg-blue-800">
          <img className="h-5 w-5" src="search.png" alt="Search" />
        </button>
      </main>
    </div>
  );
};

export default DemoPage;
