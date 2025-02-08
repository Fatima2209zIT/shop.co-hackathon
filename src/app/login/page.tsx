"use client";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          SHOP.CO
        </h1>
        <SignedIn>
        <div className="text-center">
        
           <UserButton />
     
        <h2 className="text-xl font-semibold text-center text-gray-600 mb-6">
           Welcome!
        </h2>
        </div>
        </SignedIn>
        {/* Form Fields */}
        <SignedOut>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@mail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-gray-500" />
              Remember me
            </label>
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-4">
          
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="w-full bg-gray-800 text-white font-bold px-6 py-2 rounded-md hover:bg-gray-900 transition"
                >
                  Sign In
                </button>
              </SignInButton>
          
            <button
              type="button"
              className="w-full border border-gray-500 text-gray-800 font-bold px-6 py-2 rounded-md hover:bg-gray-500 hover:text-white transition"
            >
              Sign Up
            </button>
          </div>
        </form>
        </SignedOut>
        {/* Social Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Follow us:</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-xl">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
}