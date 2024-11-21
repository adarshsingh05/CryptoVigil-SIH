"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {

  const logout = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token
    if (!token) {
      console.error("No token found");
      return; // Exit the function if no token is found
    }
  
    try {
      const response = await fetch('http://localhost:4000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Attach the token
        },
      });
  
      if (response.ok) {
        // Remove the token from localStorage after successful logout
        localStorage.removeItem('token');
        console.log("Logged out successfully");
        window.location.reload();
      } else {
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  
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
  <nav className="flex space-x-8 font-[var(--font-ropa-sans)]">
    <Link
      href="/"
      className="text-white border-2 border-transparent hover:text-green-500 hover:border-green-500 hover:rounded-full py-2 px-4 transition-all duration-300"
    >
      HOME
    </Link>
    <Link
      href="/explore"
      className="text-white border-2 border-transparent hover:text-green-500 hover:border-green-500 hover:rounded-full py-2 px-4 transition-all duration-300"
    >
      EXPLORE
    </Link>

    {/* Conditionally render Login/Sign Up or Dashboard */}
 

    <Link
      href="/profile"
      className="text-white border-2 border-transparent hover:text-green-500 hover:border-green-500 hover:rounded-full py-2 px-4 transition-all duration-300"
    >
      PROFILE
    </Link>
    {user ? (
      <Link
        href="/LandingPage"
        onClick={logout}
        className="text-white border-2 border-transparent hover:text-green-500 hover:border-green-500 hover:rounded-full py-2 px-4 transition-all duration-300"
      >
        LOGOUT
      </Link>
    ) : (
      <Link
        href="/Login"
        className="text-white border-2 border-transparent hover:text-green-500 hover:border-green-500 hover:rounded-full py-2 px-4 transition-all duration-300"
      >
        LOG IN/SIGN UP
      </Link>
    )}
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
        <p className="mt-6 text-lg">
          Unmask the Chain—Track, Monitor, Protect.
        </p>
        <Link
          href="/get-started"
          className="mt-6 py-2 px-6 bg-[#63D134] text-white font-bold rounded-full hover:opacity-90"
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
          <Link href="/contact" className="text-white hover:underline font-bold">
            Reach out to us
          </Link>{" "}
          — we're here to help secure your crypto journey!
        </p>
      </footer>
      <section
        className="relative bg-cover bg-center h-[600px] py-4"
        style={{ backgroundImage: "url('/bgsection2.png')" }}
      >
        <p
          className="text-6xl text-center mt-6 mb-3 font-bold tracking-widest uppercase"
          style={{
            fontFamily: "GeistMono",
          }}
        >
          Our <span className="text-green-700">Services</span>
        </p>

      
          {/* Card 1 */}
          <div className="flex justify-center gap-8">
  {/* Card 1 */}
  <div className="bg-gradient-to-b from-[#63D134] to-black text-white shadow-lg p-6 flex flex-col items-center justify-between h-[28rem] w-[13rem] m-2">
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">
        Wallet Management & Compliance
      </h3>
      <hr></hr>
      <p className="text-lg mb-6 mt-2">
        Link multiple wallets, monitor balances, and flag risks seamlessly, with integrated KYC verification ensuring regulatory compliance.
      </p>
    </div>
    <Link
      href="#"
      className="inline-block py-2 px-6 border border-white text-white font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300"
    >
      Explore
    </Link>
  </div>

  {/* Card 2 */}
  <div className="bg-gradient-to-b from-[#63D134] to-black text-white shadow-lg p-6 flex flex-col items-center justify-between h-[28rem] w-[13rem]  m-2">
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">
        Smart Notifications & Insights
        </h3>
        <hr></hr>
        <p className="text-lg mb-6 mt-2">
        Get real-time updates on flagged transactions and access a user-friendly dashboard for advanced analytics and wallet insights.
      </p>
    </div>
    <Link
      href="#"
      className="inline-block py-2 px-6 border border-white text-white font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300"
    >
      Explore
    </Link>
  </div>

  {/* Card 3 */}
  <div className="bg-gradient-to-b from-[#63D134] to-black text-white shadow-lg p-6 flex flex-col items-center justify-between h-[28rem] w-[13rem]  m-2">
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">
        Trusted Exchange Support
      </h3>
      <hr></hr>
      <p className="text-lg mb-6 mt-2">
        Connect effortlessly with leading platforms like Binance, Coinbase, and Kraken for a streamlined and secure crypto experience.
      </p>
    </div>
    <Link
      href="#"
      className="inline-block py-2 px-6 border border-white text-white font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300"
    >
      Explore
    </Link>
  </div>

  {/* Card 4 */}
  <div className="bg-gradient-to-b from-[#63D134] to-black text-white shadow-lg p-6 flex flex-col items-center justify-between h-[28rem] w-[13rem]  m-2">
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">
        Advanced Security Features
      </h3>
      <hr></hr>
      <p className="text-lg mb-6 mt-2">
        Protect your assets with multi-layered encryption, two-factor authentication, and real-time risk monitoring.
      </p>
    </div>
    <Link
      href="#"
      className="inline-block py-2 px-6 border border-white text-white font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300"
    >
      Explore
    </Link>
  </div>
</div>

      </section>
    </div>
  );
};

export default Home;
