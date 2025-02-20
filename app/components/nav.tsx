import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Nav = () => {
  return (
    
       <div className=" bg-white">
     
      {/* Header */}
      <div className="flex justify-around items-center px-6 py-4 border-b border-gray-200">
      
      
        <h1 className="text-3xl font-bold ml-96">Crafted Elegance</h1>
        <div className='flex gap-1'>
          <Link href="/cart">
        <Image src="/images/cart.png" alt="cart" width={20} height={20} />
        </Link>


        </div>
        </div>
     <ul className="space-x-12 items-center sm:text-base lg:text-lg flex justify-center">
          <li className="text-gray-600 hover:text-gray-900">Plant Pots </li>

          <li className="text-gray-600 hover:text-gray-900">Ceramics </li>

          <li className="text-gray-600 hover:text-gray-900">Chairs </li>
          <li className="text-gray-600 hover:text-gray-900">Crockery </li>

          <li className="text-gray-600 hover:text-gray-900">Tableware </li>

          <li className="text-gray-600 hover:text-gray-900">Cutlery </li>

      </ul>
  
    </div>
  )
}

export default Nav
