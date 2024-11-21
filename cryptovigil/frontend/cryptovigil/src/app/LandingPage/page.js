"use client"; 
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("Retrieved token:", token); // Debugging token retrieval

      if (token) {
        try {
          const response = await fetch("http://localhost:4000/api/auth/user", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
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
    <div className="min-h-screen bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-90">
        <Image
          src="/main bg.png" 
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Navbar */}
      <header className="relative z-10 p-6 flex justify-center items-center">
        <nav className="flex space-x-8 ">
          <Link href="/" className="text-green-500 hover:text-white ">
            HOME
          </Link>
          <Link href="/explore" className="text-green-500 hover:text-white">
            EXPLORE
          </Link>
          <Link href="/auth" className="text-green-500 hover:text-white">
            LOG IN/SIGN UP
          </Link>
          <Link href="/profile" className="text-green-500 hover:text-white">
            PROFILE
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-20">
        <Image
          src="/text.png"
          alt="CryptoVigil Logo"
          width={600}
          height={300}
          className="max-w-full object-contain"
        />
        <p className="mt-6 text-lg">Unmask the Chain—Track, Monitor, Protect.</p>
        <Link
          href="/get-started"
          className="mt-6 py-2 px-6 bg-green-500 text-white font-bold rounded-full hover:opacity-90"
        >
          Get Started!
        </Link>
      </section>

      {/* Display User Info */}
      <section className="relative z-10 text-center py-10">
        {loading ? (
          <p className="text-gray-400">Loading user information...</p>
        ) : user ? (
          <div>
            <h2 className="text-2xl text-white">Welcome, {user.username}!</h2>
            <p className="text-gray-400">Your email is: {user.email}</p>
          </div>
        ) : (
          <p className="text-gray-400">Please log in to see your profile.</p>
        )}
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 text-center py-8">
        <p className="text-sm">
          Have questions or need assistance?{" "}
          <Link href="/contact" className="text-green-400 hover:underline">
            Reach out to us
          </Link>{" "}
          — we're here to help secure your crypto journey!
        </p>
      </footer>
      <section className="relative bg-cover bg-center h-[400px] py-4" style={{ backgroundImage: "url('/bgsection2.png')" }}>
      <p className="text-3xl text-center mt-6 mb-3 font-mono font-semibold">What we bring to the Table</p>
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Card 1 */}
    <div className="bg-gradient-to-b from-[#63D134] to-black text-white  shadow-lg p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">Wallet Management & Compliance</h3>
      <p className="text-lg mb-6">
        Link multiple wallets, monitor balances, and flag risks seamlessly, with integrated KYC verification ensuring regulatory compliance.
      </p>
      <Link href="#" className="inline-block py-2 px-6 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500">
        Explore
      </Link>
    </div>

    {/* Card 2 */}
    <div className="bg-gradient-to-b from-[#63D134] to-black text-white shadow-lg p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">Smart Notifications & Insights</h3>
      <p className="text-lg mb-6">
        Get real-time updates on flagged transactions and access a user-friendly dashboard for advanced analytics and wallet insights.
      </p>
      <Link href="#" className="inline-block py-2 px-6 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500">
        Explore
      </Link>
    </div>

    {/* Card 3 */}
    <div className="bg-gradient-to-b from-[#63D134] to-black text-white  shadow-lg p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">Trusted Exchange Support</h3>
      <p className="text-lg mb-6">
        Connect effortlessly with leading platforms like Binance, Coinbase, and Kraken for a streamlined and secure crypto experience.
      </p>
      <Link href="#" className="inline-block py-2 px-6 bg-green-600 text-white font-semibold rounded-full hover:bg-green-500">
        Explore
      </Link>
    </div>
  </div>
  
</section>
    </div>
  );
};

export default Home;
