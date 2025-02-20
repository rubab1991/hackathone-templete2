"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // For hamburger and close icons

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        {/* Logo */}
        <h1 className="text-2xl sm:text-3xl font-bold">Crafted Elegance</h1>

        {/* Cart Icon */}
        <div className="flex gap-4 items-center">
          <Link href="/cart">
            <Image src="/images/cart.png" alt="cart" width={24} height={24} />
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button
            className="sm:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={`sm:flex ${isOpen ? 'block' : 'hidden'} sm:items-center sm:justify-center`}>
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-12 py-4 sm:py-2 text-center">
          {['Plant Pots', 'Ceramics', 'Chairs', 'Crockery', 'Tableware', 'Cutlery'].map((item) => (
            <li key={item} className="text-gray-600 hover:text-gray-900 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Nav
