import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#2A254B] text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Menu Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Menu</h3>
          <ul className="space-y-2">
            <li><Link href="#">New arrivals</Link></li>
            <li><Link href="#">Best sellers</Link></li>
            <li><Link href="#">Recently viewed</Link></li>
            <li><Link href="#">Popular this week</Link></li>
            <li><Link href="#">All products</Link></li>
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-2">
            <li><Link href="#">Crockery</Link></li>
            <li><Link href="#">Furniture</Link></li>
            <li><Link href="#">Homeware</Link></li>
            <li><Link href="#">Plant pots</Link></li>
            <li><Link href="#">Chairs</Link></li>
          </ul>
        </div>

        {/* Our Company Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Our Company</h3>
          <ul className="space-y-2">
            <li><Link href="#">About us</Link></li>
            <li><Link href="#">Vacancies</Link></li>
            <li><Link href="#">Contact us</Link></li>
            <li><Link href="#">Privacy</Link></li>
            <li><Link href="#">Returns policy</Link></li>
          </ul>
        </div>

        {/* Mailing List Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Join our mailing list</h3>
          <div className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="p-2 rounded-t-md sm:rounded-l-md sm:rounded-tr-none w-full bg-[#3C366B] placeholder-gray-400 focus:outline-none"
            />
            <Link href="/login">
              <button className="bg-white text-[#2A254B] px-6 py-2 rounded-b-md sm:rounded-r-md sm:rounded-bl-none mt-2 sm:mt-0 font-light hover:bg-gray-200 transition-colors">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6">
        <div className="text-center text-sm text-gray-400">
          © 2022 Avion LTD. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
