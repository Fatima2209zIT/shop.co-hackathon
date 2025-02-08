"use client";
import Image from "next/image";
import { useState } from "react";
import Logo from "@/app/images/SHOP.CO.png";
import SearchIcon from "@/app/images/Vector (5).png";
import Cart from "@/app/images/Frame.png";
import User from "@/app/images/Frame (1).png";
import Bars from "@/app/images/Frame (4).png";
import Search2 from "@/app/images/Frame (5).png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search input
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`You searched for: ${searchQuery}`); // Replace this with your search functionality
  };

  const toggleSearchBar = () => {
    setIsSearchOpen((prev) => !prev); // Toggle the search bar
  };

  return (
    <nav className="flex flex-row bg-white w-full items-center shadow-md">
      <div className="flex flex-row items-center w-full lg:w-[1240px] mx-auto gap-10 px-4 lg:px-0">
        {/* Mobile Menu Icon */}
        <button
          className="lg:hidden block absolute top-[16px] left-[16px]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Image src={Bars} alt="menu" width={24} height={24} />
        </button>

        {/* Logo */}
        <div className="absolute top-[16px] left-[56px] lg:static">
          <a href="/home">
            <Image src={Logo} alt="logo" width={160} height={22} />
          </a>
        </div>

        {/* Navbar Links */}
        <div
          className={`lg:flex flex-row items-center gap-6 lg:static lg:bg-transparent ${
            isMobileMenuOpen ? "fixed inset-0 bg-white z-50 flex flex-col p-4" : "hidden"
          }`}
        >
          <ul className="lg:flex flex-col lg:flex-row lg:items-center gap-6">
            <li className="list-none font-satoshi font-normal">
              <a href="/casual">Casual</a>
            </li>
            <li>
              <span>On Sale</span>
            </li>
            <li>
              <span>Brands</span>
            </li>
          </ul>
          {isMobileMenuOpen && (
            <button
              className="mt-4 self-start text-red-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Close
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-[577px] h-[48px] bg-[#F0F0F0] rounded-[62px] px-4 py-2 gap-3">
          <Image src={SearchIcon} alt="search" width={24} height={24} />
          <form onSubmit={handleSearchSubmit} className="w-full">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-transparent outline-none text-[16px] text-[#000000] font-satoshi"
            />
          </form>
        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden items-center gap-3 absolute top-[16px] right-[16px]">
          {/* Search Icon - Mobile toggle */}
          <Image
            src={Search2}
            alt="search"
            width={24}
            height={24}
            onClick={toggleSearchBar} // Toggle search bar visibility on mobile
            className="cursor-pointer lg:hidden"
          />

          {isSearchOpen && (
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-transparent outline-none text-[16px] text-[#000000] font-satoshi"
              />
            </form>
          )}

          <a href="/cart">
            <Image src={Cart} alt="cart" width={24} height={24} />
          </a>
          <a href="/login">
          <Image src={User} alt="user" width={24} height={24} />
          </a>
        </div>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="/cart">
            <Image src={Cart} alt="cart" width={22} height={20} />
          </a>
          <a href="/login">
          <Image src={User} alt="user" width={22} height={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
