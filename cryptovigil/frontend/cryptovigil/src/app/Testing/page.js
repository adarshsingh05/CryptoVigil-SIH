import React from "react";

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
      <aside className="fixed top-0 left-0 h-[100%] mt-4  ml-24 w-52 bg-transparent">
        <h1 className="text-2xl font-bold text-center py-4 mt-[87px]">City Activity</h1>
        <nav className="flex flex-col">
          <a
            href="#"
            className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700"
          >
            Demo 11 April
          </a>
          <a
            href="#"
            className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700"
          >
            Penerbitan Mudik
          </a>
          <a
            href="#"
            className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700"
          >
            Pertahanan Lokal
          </a>
          <a
            href="#"
            className="py-2 px-4 text-sm font-medium text-gray-300 hover:bg-blue-700"
          >
            Penanggulangan Bencana
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-80 p-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Wallet Database - <span className="text-blue-400">Informations</span>
        </h2>
        <div className="overflow-x-auto mt-14">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-blue-800 text-gray-300">
              <tr>
                <th className="px-4 py-2">Wallet ID</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Balance</th>
                <th className="px-4 py-2">IP Address</th>
                <th className="px-4 py-2">Last Transaction</th>
                <th className="px-4 py-2">Locate</th>
                <th className="px-4 py-2">Flag</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="px-4 py-2">{item.pasukan}</td>
                  <td className="px-4 py-2">{item.penanggungJawab}</td>
                  <td className="px-4 py-2">{item.personil}</td>
                  <td className="px-4 py-2 text-blue-400">{item.titikAksi}</td>
                  <td className="px-4 py-2">{item.tanggal}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">
                      Trace
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">
                      Mark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="fixed bottom-4 right-4 bg-green-500 text-white text-3xl p-4 rounded-full shadow-lg hover:bg-green-600">
          +
        </button>
      </main>
    </div>
  );
};

export default DemoPage;
