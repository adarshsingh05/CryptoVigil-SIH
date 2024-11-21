"use client"; // Add this at the top
import { useState } from "react";
import Link from "next/link";
import LoadingBar from "react-top-loading-bar";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [progress, setProgress] = useState(0); // For loading bar

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!email || !password || !username) {
      alert("Email and password are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setProgress(30); // Start loading bar immediately after button click

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      setProgress(70); // Update loading bar progress

      const data = await response.json();

      if (response.ok) {
        setProgress(100); // Complete loading bar
        setSuccess("Registration successful! Please verify your email.");
        setTimeout(() => {
          setSuccess(""); // Clear success message after a few seconds
        }, 4000);
      } else {
        setProgress(100); // Complete loading bar
        setError(data.msg || "Something went wrong!");
        setTimeout(() => {
          setError(""); // Clear error message after a few seconds
        }, 4000);
      }
    } catch (error) {
      setProgress(100); // Complete loading bar
      console.error("Error during registration:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-between bg-black relative">
      {/* Background and other decorations */}
      <div className="absolute inset-0 z-0 ">
        <img
          src="/main bg.png"
          alt="Background"
          className="w-full h-full opacity-45"
        />
      </div>

      {/* Loading Bar */}
      <LoadingBar
        color="#4caf50"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* Form Section */}
      <div className="w-1/2 flex justify-center flex-col">
        <img
          src="/text.png" // Path to the CryptoVigil logo
          alt="CryptoVigil Logo"
          className="max-w-full h-auto object-contain ml-8"
        />
        hi there
      </div>

      <div className="relative z-10 flex flex-col justify-center p-8 rounded-lg shadow-xl w-[30%] mr-36 bg-black/50 backdrop-blur-md border border-gray-600 ">
        <h2 className="text-2xl font-bold text-white">Signup Into CryptoVigil</h2>
        <p className="text-sm text-gray-300 mt-2">
          Just some details to get you in!
        </p>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 rounded-lg bg-transparent border-2 border-gray-600 focus:outline-none focus:border-green-500 text-white"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-lg bg-transparent border-2 border-gray-600 focus:outline-none focus:border-green-500 text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-lg bg-transparent border-2 border-gray-600 focus:outline-none focus:border-green-500 text-white"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-3 rounded-lg bg-transparent border-2 border-gray-600 focus:outline-none focus:border-green-500 text-white"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already Registered?{" "}
          <Link href="/Login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
