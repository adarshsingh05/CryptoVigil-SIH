"use client"; // Add this at the top
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct import for the router
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { Noto_Sans } from "next/font/google";
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], 
});

import LoginSuccess from "../components/LoginSuccess";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const router = useRouter(); // Initialize the router
  useEffect(() => {
    if (isLoggedIn) {
     
      setIsLoggedIn(true); // Set loading to true when login is successful
      setTimeout(() => {
        router.push("/LandingPage"); // Redirect to LandingPage after 5 seconds
      }, 5000); // 5 seconds delay
    }
  }, [isLoggedIn, router]);
  // Dependency array to trigger redirect when isLoggedIn changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // alert(data.msg || "Login successful!");
        localStorage.setItem("token", data.token); // Store token

        setIsLoggedIn(true); // Set isLoggedIn to true after successful login
      } else {
        alert(data.msg || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      // alert("Server error. Please try again later.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center "
      style={{
        backgroundImage: "url('/main bg.png')",
        opacity: 70, // Background image
      }}
    >
      {isLoggedIn ? (
        <LoginSuccess /> // Render LoginSuccess if login is successful
      ) : (
        // Login Form
        <div className="flex items-center justify-between w-11/12 max-w-6xl ml-8">
          {/* Left Section: CryptoVigil Image */}
          <div className="w-1/2 flex justify-center flex-col">
            <img
              src="/text.png" // Path to the CryptoVigil logo
              alt="CryptoVigil Logo"
              className="max-w-full h-auto object-contain"
            />
            <p className="text-center text-xl text-white font-medium mt-4">
              <Typewriter
                words={[
                  "Secure your cryptocurrency trades with confidence. Monitor and track transactions seamlessly. Empowering users and officials for a transparent crypto ecosystem.",
                ]}
                loop={false} // Set true if you want it to loop infinitely
                typeSpeed={50} // Typing speed in ms
                deleteSpeed={30} // Speed to delete in ms
                delaySpeed={1000} // Delay before typing starts again in ms
              />
            </p>
          </div>

          {/* Right Section: Login Form */}
          <div className="w-1/2 flex justify-center">
            <div className="bg-transparent bg-opacity-20 backdrop-blur-lg p-6 py-12 rounded-xl shadow-lg max-w-md h-[600px] w-full border border-white">
              <h1 className={` ${notoSans.className} text-[36px] font-bold text-white mb-2`}>Login</h1>
              <p className={` ${notoSans.className} text-gray-400 mb-4`}>Glad you're back!</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Field */}
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    id="username"
                    value={email}
                    className="w-full px-4 py-3 bg-transparent border border-2 rounded-2xl text-[20px] text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-green-500"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Field */}
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    className="w-full px-4 py-3 bg-transparent border border-2 rounded-2xl text-[20px] text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-green-500"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2 accent-green-500"
                  />
                  <label htmlFor="remember" className="text-gray-400 ">
                    Remember me
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className={`${notoSans.className} w-full py-3 bg-gradient-to-r from-purple-500 to-green-500 text-[20px] text-white font-bold rounded-xl hover:opacity-90 transition`}
                >
                  Login
                </button>
              </form>

              {/* Forgot Password */}
              <div className="text-center mt-4 flex flex-row justify-around">
                <p className="text-green-500"> Not a member?</p>
                <a className="text-gray-400 hover:text-green-500">
                  <Link
                    href="/SignUp"
                    className="text-green-400 hover:underline"
                  >
                    Signup here
                  </Link>
                </a>
              </div>
           

              {/* Social Login */}
              <div className="text-center mt-4">
              <div class="flex items-center my-4">
              <div class="flex-grow border-t-2 border-gray-500"></div>
              <span class="mx-4 text-gray-500">OR</span>
             <div class="flex-grow border-t-2 border-gray-500"></div>
 
              </div>
                <div className="flex justify-center space-x-4 mt-6">
                  <button className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center ">
                    <img src="/googler.png" alt="Google" className="w-9 h-9" />
                  </button>
                  <button className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
                    <img src="/flogo.png" alt="Facebook" className="w-10 h-12" />
                  </button>
                  <button className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center">
                    <img src="/git.png" alt="GitHub" className="w-10 h-10" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
