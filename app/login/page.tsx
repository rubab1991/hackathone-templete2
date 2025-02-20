"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useSignIn,
} from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { ImAppleinc } from "react-icons/im";

const Login = () => {
  const { user } = useUser(); // Get user details from Clerk
  const { signIn, setActive, isLoaded } = useSignIn(); // Clerk's sign-in function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch {
      setError("Sign-in failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Right Section (Branding/Image) */}
      <div className="flex-1 bg-black flex justify-center items-center p-8">
        <h1 className="text-white text-4xl font-bold">Crafted Elegance</h1>
      </div>

      {/* Left Section (Login Form) */}
      <div className="flex-1 bg-white flex flex-col justify-center px-8 py-10 lg:px-20">
        <SignedIn>
          {/* When signed in */}
          <div className="flex flex-col items-center text-center">
            <UserButton />
            <h1 className="text-3xl font-bold mb-4">
              Welcome, {user?.firstName || "User"}!
            </h1>
            <Link href="/cart">
              <button className="text-white bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600 transition">
                Proceed to cart
              </button>
            </Link>
          </div>
        </SignedIn>

        <SignedOut>
          {/* When signed out */}
          <div>
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            {error && <p className="text-red-500">{error}</p>}

            {/* Social Sign-In Buttons */}
            <SignInButton mode="modal">
              <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                <FcGoogle size={24} /> Continue with Google
              </button>
            </SignInButton>

            <SignInButton mode="modal">
              <button className="w-full mt-3 flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                <ImAppleinc size={24} /> Continue with Apple
              </button>
            </SignInButton>

            <div className="text-center my-4 text-gray-500">or</div>

            {/* Email and Password Login */}
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                  <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                    👁
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-700 text-sm">Remember Me</span>
                </label>
                <Link href="#" className="text-sm text-gray-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Sign In
              </button>
            </form>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default Login;
