import React from "react";
import Image from 'next/image'
import Products from "../components/products";
import Join from "../components/join";

const Allproducts = () => {
  const products = [
    {id:"1",
      imageSrc: "/images/p5.png",
      title: "The Dandy Chair",
      price: "£250",
    },
    {
      id:"2",
      imageSrc: "/images/p6.png",
      title: "Rustic Vase Set",
      price: "£155",
    },
    {
      id:"3",
      imageSrc: "/images/p8.png",
      title: "The Silky Vase",
      price: "£125",
    },
    {
      id:"4",
      imageSrc: "/images/p9.png",
      title: "The Lucy Lamp",
      price: "£399",
    },
  ];

  return (
    <div className="stripe-pattern w-full min-h-screen">
      {/* Banner Section */}
      <div>
        <Image
          src="/images/p10.png"
          alt="Banner"
          width={1440}
          height={200}
          className="w-full h-auto"
        />
      </div>

      {/* Image Section */}
      <div className="flex justify-between px-7 py-10 gap-4 flex-wrap">
        <Image
          src="/images/d2.png"
          alt="Decorative Image 1"
          width={600}
          height={300}
          className="rounded-lg shadow-md"
        />
        <Image
          src="/images/d1.png"
          alt="Decorative Image 2"
          width={250}
          height={200}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Products Section */}
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold text-center mb-6">
          All Products
        </h2>

        {/* Optional Products Component */}
        <Products />

<Products />
       
      </div>
       {/* Join Section */}
       <div className="mt-10">
          <Join />
        </div>
    </div>
  );
};

export default Allproducts;
