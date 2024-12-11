"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/GetInForm.module.css";
import Link from "next/link";


const DemoPage = () => {

  const [datas, setDatas] = useState([]);
  const [ip, setIp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); // State to track selected row for the modal

  // Mock data for rendering the table
  const data = [
    {
      pasukan: "Polda Metro Kwitang",
      penanggungJawab: "Kombes Pol Gatot Mangkurat, S.I.K.",
      personil: 355,
      titikAksi: "Sudirman",
      tanggal: "11 April 2022",
    },
    {
      pasukan: "Polda Metro Cipinang",
      penanggungJawab: "Dede Rojudin, S.I.K., M.H.",
      personil: 211,
      titikAksi: "Asia Afrika",
      tanggal: "11 April 2022",
    },
  ];
  const handleSubmit = () => {
  
    // Redirect to '/mapView' page, passing the IP as a query parameter
    const router = useRouter();

  // Redirect to '/mapView' with the IP as a query parameter
  router.push(`/mapView?ip=${ip}`);
    
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions"); // Update the URL based on your backend setup
        if (!response.ok) {
          console.log("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
        setDatas(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    fetch('https://backend-ip.vercel.app/api/ip', {
      method: 'GET',
      credentials: 'include', 
    })
    .then((response) => response.json())
    .then((data) => {
      setIp(data.ip);
      console.log('IP Address 2:', data.ip);
    })
    .catch((error) => {
      console.error('Error fetching IP:', error);
    });
  }, []);
 

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white"
      style={{
        backgroundImage: "url('/physics.jpg')",
        backgroundSize: "calc(100% + 4px) calc(100% + 4px)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "50vh",
        width: "100vw",
        overflow: "hidden",
        filter: "brightness(1.2) opacity(1.8)",
      }}
    >
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-[100%] w-80 bg-transparent flex flex-col items-center">
        {/* Title */}
        <h1 className="text-xl font-bold ml-[2px] mt-[90px]">
          <span className={styles.glower}>Recent Transactions</span>
        </h1>
      </aside>

      {/* Main Content */}
      <main className="ml-[254px] p-8">
        
        <h2 className="text-3xl font-bold text-center mt-[-20px] font-mono">
          <span className={styles.glower}>Wallet Database -</span>{" "}
          <span className="text-blue-400">Informations</span>
        </h2>
        <div className="overflow-y-auto  h-[626px]"> {/* Add height here */}
                  <div className=" mt-[33px] ml-[-20px]">
          <table className="w-[1212px] text-sm text-left text-gray-400">
            <thead className="text-lg uppercase bg-[#000F1F] text-gray-300 border-b border-white font-mono rounded-lg">
              <tr>
                <th className="px-6 relative">
                  From Wallet
                  <span className="absolute ml-12 mb-[2px]  h-[32px] w-[1px] bg-gray-300"></span>
                </th>
                <th className="px-2 py-2 ml-16 relative">
                  <span className=" ml-2">To Wallet</span>
                  <span className="absolute left-[170px] mb-[2px] h-[32px] w-[1px] bg-gray-300"></span>
                </th>
                <th className="px-2 py-2 relative">
                  <span className="ml-[28px]">amount transferred</span>
                  <span className="absolute ml-[28px] mb-[2px]  h-[32px] w-[1px] bg-gray-300"></span>
                </th>
                <th className="px-4 -ml-7] py-2 relative">
                  Status
                  <span className="absolute ml-[28px] mb-[2px]  h-[32px] w-[1px] bg-gray-300"></span>
                </th>
                <th className="px-4 py-2 relative">
                  Gas Used
                  <span className="absolute ml-[32px] mb-[2px]  h-[32px] w-[1px] bg-gray-300"></span>
                </th>
                <th className="px-4 py-2 relative">Block Hash
                <span className="absolute ml-[30px] mb-[2px]  h-[32px] w-[1px] bg-gray-300"></span>
                
                </th>

                <th className="px-1 py-2">Time And Date</th>
              </tr>
            </thead>

            <tbody>
              {datas.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-800 mb-2 cursor-pointer"
                  onClick={() => setSelectedRow(item)} // Set selected row data on click
                >
                  <td className="px-6 py-2 ml-1 text-white">
                    {item.from.length > 16
                      ? item.from.slice(0, 16) + "..."
                      : item.from}
                  </td>
                  <td className="px-4 py-2 ml-[32px] text-white">
                    {item.to.length > 16
                      ? item.to.slice(0, 16) + "..."
                      : item.to}
                  </td>
                  <td className="px-4 py-2 text-green-500">{item.value} ETH</td>
                  <td className="px-4 py-2 text-blue-400">{item.status}</td>
                  <td className="px-4 py-2">{item.gasUsed}</td>
                  <td className="px-4 py-2 text-blue-400">
                    {item.blockHash.length > 7
                      ? item.blockHash.slice(0, 7) + "..."
                      : item.blockHash}
                  </td>
                  <td className=" py-2 text-blue-400">
                    {new Date(item.timestamp).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <span> on </span>
                    {new Date(item.timestamp).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        <button className="fixed bottom-[38px] right-[53px] bg-blue-500 text-white text-3xl p-4  rounded-md shadow-lg hover:bg-blue-800">
          <img className="h-5 w-5" src="search.png" alt="Search"></img>
        </button>
      </main>

      {/* Modal */}
      {selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Transaction Details</h3>
            <p><strong>From:</strong> {selectedRow.from}</p>
            <p><strong>To:</strong> {selectedRow.to}</p>
            <p><strong>Amount:</strong> {selectedRow.value} ETH</p>
            <p><strong>Status:</strong> {selectedRow.status}</p>
            <p><strong>Gas Used:</strong> {selectedRow.gasUsed}</p>
            <p><strong>Block Hash:</strong> {selectedRow.blockHash}</p>
            <p><strong>Sender's IP:</strong> {selectedRow.ip}</p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(selectedRow.timestamp).toLocaleString("en-GB")}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setSelectedRow(null)}
            >
              Close
            </button>
            <Link href={`/mapView?ip=${ip}`}>          View Location
        </Link>
            <button className="ml-[450px] bg-blue-600 w-max h-[38px] rounded-lg p-1 text-white"
             onClick={handleSubmit}
           > View Location</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoPage;
