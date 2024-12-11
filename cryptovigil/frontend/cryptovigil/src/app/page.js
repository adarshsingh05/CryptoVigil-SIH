"use client";
import Draggable from "react-draggable";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import { useRef } from "react";

import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { Exo } from 'next/font/google';
import { Ropa_Sans } from 'next/font/google'
import { Orbitron } from 'next/font/google'


const exo = Exo({
  weight: ['400', '500', '700'],  
  subsets: ['latin'],             
})



const ropaSans = Ropa_Sans({
  weight: '400', // Only weight 400 is available
  subsets: ['latin'], // Latin subset
})

const orbitron = Orbitron({
  weight: '400', // You can specify the weight you want (400 is the default)
  subsets: ['latin'], // Optional: Load the Latin subset (you can add more if needed)
});

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const draggableRef = useRef(null); // Create a ref for the draggable element

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const logout = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token
    if (!token) {
      console.error("No token found");
      return; // Exit the function if no token is found
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      });

      if (response.ok) {
        // Remove the token from localStorage after successful logout
        localStorage.removeItem("token");
        console.log("Logged out successfully");
        window.location.reload();
      } else {
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const [userIp, setUserIp] = useState('Loading...');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('https://backend-ip.vercel.app/api/ip', {
      method: 'GET',
      credentials: 'include', 
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('IP Address:', data.ip);
    })
    .catch((error) => {
      console.error('Error fetching IP:', error);
    });
  }, []);

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
  href={user ? '/' : '/Login'}
  className="text-white border-2 border-transparent hover:text-green-500 hover:border-green-500 hover:rounded-full py-2 px-4 transition-all duration-300"
>
  <span>HOME</span>
  <div className="w-[51px] h-[1.7px] bg-green-500"></div>
</Link>

          <Link
            href={user ? '/transactionPage' : '/Login'}
            className="text-white border-2 border-transparent hover:text-green-500 hover:border-green-500 hover:rounded-full py-2 px-4 transition-all duration-300"
          >
            MAKE TRANSACTIONS
          </Link>

          {/* Conditionally render Login/Sign Up or Dashboard */}

          <Link
            href={user ? '/profile' : '/Login'}
            className="text-white border-2 border-transparent hover:text-green-500 hover:border-green-500 hover:rounded-full py-2 px-4 transition-all duration-300"
          >
            PROFILE
          </Link>
          {user ? (
            <Link
              href="/"
              onClick={logout}
              className="text-white border-2 border-transparent hover:text-green-500 hover:border-green-500 hover:rounded-full py-2 px-4 transition-all duration-300"
            >
              GET OUT
            </Link>
          ) : (
            <Link
              href="/Login"
              className="text-white border-2 border-transparent hover:text-green-500 hover:border-green-500 hover:rounded-full py-2 px-4 transition-all duration-300"
            >
              GET IN
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
  <p className={`${ropaSans.className} mt-6 text-lg`}>
    Unmask the Chain—Track, Monitor, Protect.
  </p>
  <Link
    href="/get-started"
    className={`${ropaSans.className} mt-4 py-2 px-6 bg-[#63D134] text-white font-extrabold rounded-full hover:opacity-90`}>
    Get Started!
  </Link>
</section>

{/* Display User Info */}
<section className="relative z-10 text-center py-2">
  <div>
    {loading ? (
      <p className="text-gray-400">Loading your information...</p>
    ) : user ? (
      <p className="text-3xl text-white font-medium">
        Welcome Back,
        <Typewriter
          words={[` ${user.username}!`]}
          loop={true}
          typeSpeed={130}
          deleteSpeed={70}
          delaySpeed={100}
        />
      </p>
    ) : (
      <p className="text-gray-400">Please log in to see your profile.</p>
    )}
  </div>
</section>



      {/* Footer Section */}
      <footer className="relative z-10 text-center py-8 flex-shrink-0">
        <p className="text-sm">
          Have questions or need assistance?{" "}
          <Link
            href="/contact"
            className="text-white hover:underline font-bold"
          >
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
          className="text-6xl text-center mt-6 mb-3 font-bold tracking-widest uppercase tracking-tight"
          style={{
            fontFamily: "Exo, sans-serif",
            letterSpacing: "0.0rem"
          }}
        >
          Our <span className="font-exo text-green-700">Services</span>
        </p>

        {/* Card 1 */}
        <div className="flex justify-center gap-8">
          {/* Card 1 */}
          <div className="bg-gradient-to-b from-[#63D134] to-black text-white shadow-lg p-6 flex flex-col items-center justify-between h-[28rem] w-[13rem] m-2">
            <div className="text-center">
              <h3 className={`${ropaSans.className} text-[36px] font-bold mb-12 p-[5px]`}>
                Crypto Transfer 
              </h3>
              
              <hr className="mt-"></hr>
              <p className={`${ropaSans.className} mb-6 mt-2`}>
              Sending digital assets between wallets on a blockchain, 
              enabling secure, decentralized transactions without intermediaries.
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
              <h3 className={`text-[36px] font-bold mb-2 ${ropaSans.className}`}>
                Monitor Crypto transactions 
              </h3>
              <hr></hr>
              <p className={`${ropaSans.className} mb-6 mt-2`}>
              Tracking blockchain activity, 
              verifying transaction details, ensuring security, and detecting potential fraud.
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
          <div className="bg-gradient-to-b from-[#63D134] to-black text-white shadow-lg p-4 flex flex-col items-center justify-between h-[28rem] w-[13rem]  m-2">
            <div className="text-center">
              <h3 className={`text-[36px] font-bold mb-4 ${ropaSans.className}`}>
                Locate and Detect Fraud Wallets 
              </h3>
              <hr></hr>
              <p className={`${ropaSans.className} mb-6 mt-2`}>
              Analyzing transaction patterns, identify suspicious activity, and using blockchain tools to flag illicit addresses.
              </p>
            </div>
            <Link
              href="#"
              className="inline-block mb-2 py-2 px-6 border border-white text-white font-semibold rounded-full hover:bg-green-600 hover:text-white transition duration-300"
            >
              Explore
            </Link>
          </div>

          {/* New card*/}
          <div className="bg-gradient-to-b from-[#63D134] to-black text-white shadow-lg p-6 flex flex-col items-center justify-between h-[28rem] w-[13rem]  m-2">
            <div className="text-center">
              <h3 className={`text-[36px] font-bold mb-4 ${ropaSans.className}`}>
                 Fund Movement Analysis
              </h3>
              <hr></hr>
              <p className={`${ropaSans.className} mb-6 mt-2`}>
              Examines transaction patterns, 
              identify anomalies, potential fraud by tracking 
              fund flows across blockchain networks.
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
              <h3 className={`text-[36px] font-bold mb-4 ${ropaSans.className}`}>
                Advanced Security Features
              </h3>
              <hr ></hr>
              <p className={`${ropaSans.className} mb-6 mt-2 `}>
                Protect your assets with multi-layered encryption, two-factor
                authentication, and real-time risk monitoring.
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
      <section className="relative py-10 h-screen">
  {/* Image */}
  <div className="relative h-full">
    <Image
      src="/bgsection3.png"
      alt="Background"
      layout="fill" // Fill the section
      objectFit="cover" // Cover the entire section
      className="rounded-lg shadow-lg"
    />
    {/* Custom Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/50" />

    {/* Text Content - Left and Right */}
    <div className="absolute inset-0 flex items-center justify-between px-6 md:px-16">
      {/* Left Text */}
      <div className={`${orbitron.className}  w-1/2 text-[#63D134] text-[36px] font-bold sm:text-left ml-[-10px] mb-7 sm:ml-[100px]`}>
        Why Choose
        <div className=" text-white ">
         
          <img src='/text.png' className="mt-5 mr-4"></img>
        </div>
      </div>

      {/* Right Text */}
      <div className={`${ropaSans.className} w-1/2 text-white text-[36px] font-semibold text-left ml-20`}>
        Trust • Security • Transparency
        <div className={'${ropaSans.className} text-[25px] text-left mt-6'}>
          Monitor, track, and secure your crypto with real-time alerts, wallet
          tracking, and KYC compliance. Whether you're an individual or business,
          safeguard your assets with confidence.
        </div>
      </div>
    </div>
  </div>
</section>

<section className="relative py-10 h-screen -mt-[10px]">
  {/* Image */}
  <div className="relative h-full">
    <Image
      src="/bgsection4.png"
      alt="Background"
      layout="fill"
      objectFit="cover"
      className="rounded-lg shadow-lg opacity-90"
    />

    {/* Custom Gradient Overlay */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 5%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)',
      }}
    />

    {/* Text Content */}
    <div className="absolute inset-0 flex flex-col justify-center items-center px-6">
      <div className={`${orbitron.className} text-[50px] text-white font-bold text-center mb-8 mt-[20px]`}>
        CONNECTING THE WORLD THROUGH CRYPTO TRANSPARENCY
      </div>

      {/* Cards Section */}
      <div className="flex justify-between px-6 mt-[20px] gap-6">
        {/* Card 1 */}
        <div className="w-1/4 text-white text-[25px] font-semibold text-center p-6 rounded-lg shadow-lg">
          <div className={`${ropaSans.className}`}>Global Accessibility With Any IP</div>
          <div className="border-b-[3px] border-[#63D134] mt-2"></div>
          <div className={`${ropaSans.className} font-light mt-[30px]`}>
            Access anytime, anywhere—no borders. With multi-currency support, we
            ensure inclusivity for users worldwide.
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-1/4 text-white text-[25px] font-semibold text-center p-6 rounded-lg shadow-lg">
          <div className={`${ropaSans.className}`}>Building Trust Across Borders</div>
          <div className="border-b-[3px] border-[#63D134] mt-2"></div>
          <div className={`${ropaSans.className} font-light mt-[30px]`}>
            Promoting transparency builds trust globally. Seamless integration with
            international exchanges ensures smooth cross-border transactions.
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-1/4 text-white text-[25px] font-semibold text-center p-6 rounded-lg shadow-lg">
          <div className={`${ropaSans.className} p-1`}>Universal Security Standards</div>
          <div className="border-b-[3px] border-[#63D134] "></div>
          <div className={`${ropaSans.className} font-light mt-[30px]`}>
            Adhering to global security standards. Real-time monitoring and KYC
            compliance. Secure and fraud-free crypto transactions.
          </div>
        </div>

        {/* Card 4 */}
        <div className="w-1/4 text-white text-[25px] font-semibold text-center p-6 rounded-lg shadow-lg">
          <div className={`${ropaSans.className} `}>Driving Global Collaboration</div>
          <div className="border-b-[3px] border-[#63D134] mt-12"></div>
          <div className={`${ropaSans.className} font-light mt-[30px]`}>
            User-friendly dashboards and analytics drive growth. Secure insights
            foster seamless global crypto partnerships.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#21281E] text-white py-10">
      <div className="mb-3 flex justify-between items-center">
  <div>
    <img
      src="/text.png"
      alt="cryptovigil logo"
      className="h-7 w-72 ml-16"
    />
  </div>
  <div className="flex space-x-4 mr-20">
    <img src="/instagram-logo (1).png" alt="Instagram" className="h-6 w-6" />
    <img src="/twitter.png" alt="Twitter" className="h-6 w-6" />
    <img src="/linkedin.png" alt="LinkedIn" className="h-6 w-6" />
    <img src="/github.png" alt="GitHub" className="h-6 w-6" />
  </div>
</div>

        <div className="h-0.5 w-[92%] bg-[#63D134] ml-16 mb-16 mt-6"></div>
        <div className="container mx-auto px-6 lg:px-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm border-b border-gray-600 pb-6">
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/features">Features</Link>
                </li>
                <li>
                  <Link href="/faqs">FAQs</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/legal">Legal</Link>
                </li>
                <li>
                  <Link href="/community">Community Forum</Link>
                </li>
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h3 className="font-semibold text-lg mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/our-mission">Our Mission</Link>
                </li>
                <li>
                  <Link href="/team">Our Team</Link>
                </li>
                <li>
                  <Link href="/story">Our Story</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/press-media">Press & Media</Link>
                </li>
                <li>
                  <Link href="/transparency">Transparency Center</Link>
                </li>
                <li>
                  <Link href="/investors">Investors Relationships</Link>
                </li>
              </ul>
            </div>

            {/* Policy */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Policy</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/risk-disclosure">Risk Disclosure</Link>
                </li>
                <li>
                  <Link href="/terms-of-service">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/security-policy">Security Policy</Link>
                </li>
                <li>
                  <Link href="/compliance-policy">Compliance Policy</Link>
                </li>
                <li>
                  <Link href="/community-guidelines">Community Guidelines</Link>
                </li>
                <li>
                  <Link href="/software-principles">Software Principles</Link>
                </li>
                <li>
                  <Link href="/how-it-works">How our application works</Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Subscribe to our newsletter
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                For product announcements and exclusive insights
              </p>
              <form className="flex items-center">
                <input
                  type="email"
                  placeholder="Input your email"
                  className="text-gray-800 bg-white w-64 border-none focus:outline-none  py-2 px-4"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white  py-2 px-2 hover:bg-green-600 transition-all"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="h-0.5 w-[100%] bg-[#63D134]  mb-6 "></div>


          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-gray-400 text-xs">
            <div className="flex space-x-4">
              <Link href="/help">Help</Link>
              <span>|</span>
              <Link href="/privacy">Privacy</Link>
              <span>|</span>
              <Link href="/terms">Terms</Link>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-block mr-2">🌐</span>
              <span>English</span>
            </div>
          </div>
          <div className="w-auto h-auto bg-gray-100">
      {/* Circular Icon with Draggable */}
      <Draggable nodeRef={draggableRef}>
        <div
          ref={draggableRef}
          className="fixed top-4 left-4 w-auto h-auto p-2 bg-green-500/30 text-white flex items-center justify-center rounded-full shadow-lg backdrop-blur-lg border border-white cursor-pointer"
          onDoubleClick={toggleModal}
        >
          <p> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/></svg></p>
          <p className="m-1"> Track Activities </p>

        </div>
      </Draggable>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
        </div>
      </footer>
      
    </div>
  );
};

export default Home;
