"use client"; // Ensure this is at the top

import { Product } from "../../types/products";
import React, { useEffect, useState } from "react";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../actions/actions";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const router = useRouter(); // ✅ Works in App Router

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    fetchCartItems();
  }, []);

  const handleRemove = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      await removeFromCart(id);
      setCartItems(await getCartItems());
      Swal.fire("Removed!", "Item has been removed from your cart.", "success");
    }
  };

  const handleProceed = async () => {
    const result = await Swal.fire({
      title: "Processing your order...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    });

    if (result.isConfirmed) {
      router.push("/checkout"); // ✅ Navigates correctly
      Swal.fire("Success!", "Your order has been successfully processed!", "success");
      setCartItems([]);
    }
  };

  return (
    <AuthGuard>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

        <div className="space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex flex-col md:flex-row items-center">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      className="w-20 h-20 object-cover rounded-lg"
                      alt={item.name}
                      width={300}
                      height={300}
                    />
                  )}
                  <div className="ml-0 md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">Price: ${item.price}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">Your cart is empty.</p>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
            <button
              onClick={handleProceed}
              className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </AuthGuard>
  );
};

export default CartPage;
