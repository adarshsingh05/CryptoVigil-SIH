import React from "react";
import styles from "../styles/GetInForm.module.css";

const DemoPage = () => {
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
    // Add more data here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white"
    style={{ backgroundImage: "url('/physics.jpg')" }}
    >
          
     {/* Sidebar */}
<aside className="fixed top-0 left-0 h-[100%] w-80 bg-transparent flex flex-col items-center">
  {/* Title */}
  <h1 className="text-2xl font-bold ml-16 mt-[130px]">
    <span className={styles.glower}>Monitor City Activities</span>
  </h1>

  {/* Search Bar */}
  <div className="w-[360px] px-4 mt-6 flex flex-row">
    <input
      type="text"
      placeholder="Search for Cities..."
      className="w-64 ml-16 py-2 px-3 text-sm text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white"
    />
    <button className="bg-green-600  rounded-md ml-3 p-2"> <img 
          className="h-5 w-[35px] "
          src="search.png"></img></button>
  </div>

  {/* Navigation Links */}
  <nav className="flex flex-col mt-6 w-full px-4">
    <a
      href="#"
      className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700 rounded-md text-center"
    >
      Demo 11 April
    </a>
    <a
      href="#"
      className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700 rounded-md text-center"
    >
      Penerbitan Mudik
    </a>
    <a
      href="#"
      className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700 rounded-md text-center"
    >
      Pertahanan Lokal
    </a>
    <a
      href="#"
      className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700 rounded-md text-center"
    >
      Penanggulangan Bencana
    </a>
  </nav>
</aside>


      {/* Main Content */}
      <main className="ml-80 p-8">
        <h2 className="text-3xl font-bold text-center mb-4 font-mono">
          <span className={styles.glower}>Wallet Database -</span> <span className="text-blue-400">Informations</span>
        </h2>
        <div className=" mt-14">
          <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-lg  uppercase bg-[#000F1F] text-gray-300 border-b border-white font-mono">
          <tr>
  <th className="px-4  relative">
    Wallet ID
    <span className="absolute ml-16 mb-[2px]  h-[32px] w-[1px] bg-gray-300"></span>
  </th>
  <th className="px-9 py-2 ml-16 relative">
 <span className=" ml-14">Status</span> 
  <span className="absolute left-[280px] mb-[2px] h-[32px] w-[1px] bg-gray-300"></span>
</th>

  <th className="px-4 py-2 relative">
    Balance
    <span className="absolute ml-[28px] mb-[2px]  h-[32px] w-[1px] bg-gray-300"></span>
  </th>
  <th className="px-4 py-2 relative">
    IP Address
    <span className="absolute ml-[28px] mb-[2px]  h-[32px] w-[1px] bg-gray-300"></span>
  </th>
  <th className="px-4 py-2 relative">
    Last Transaction
    <span className="absolute ml-[34px] mb-[2px]  h-[32px] w-[1px] bg-gray-300"></span>
  </th>
  <th className="px-4 py-2 relative">
    Locate
    <span className="absolute ml-[32px] mb-[2px]  h-[32px] w-[1px] bg-gray-300"></span>
  </th>
  <th className="px-4 py-2">Flag</th>
</tr>

              
            </thead>
            
            <tbody>
            {/*  */}
            {/* <div className="h-1 w-full bg-white"></div> */}
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-800 mb-2"
                >
                  <td className="px-4 py-2 text-white">{item.pasukan}</td>
                  <td className="px-4 py-2 text-white">{item.penanggungJawab}</td>
                  <td className="px-4 py-2 text-green-500">{item.personil}</td>
                  <td className="px-4 py-2 text-blue-400">{item.titikAksi}</td>
                  <td className="px-4 py-2">{item.tanggal}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">
                      Trace
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-red-500 text-white py-1 px-2 rounded">
                      Mark
                    </button>
                  </td>
                </tr>
                
              ))}
              
            </tbody>
           
          </table>
          
        </div>
        <button className="fixed bottom-4 right-4 bg-blue-500 text-white text-3xl p-4  rounded-md shadow-lg hover:bg-blue-800">
          <img 
          className="h-5 w-5"
          src="search.png"></img>
        </button>
      </main>
    </div>
  );
};

export default DemoPage;
