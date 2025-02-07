import { Product } from "../../../types/products";

/**
 * Utility function to get the cart from localStorage safely
 */
const getCartFromLocalStorage = (): Product[] => {
  if (typeof window === "undefined") return []; // Prevents SSR issues in Next.js
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (error) {
    console.error("Error parsing cart data:", error);
    return [];
  }
};

/**
 * Utility function to save the cart to localStorage safely
 */
const saveCartToLocalStorage = (cart: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

/**
 * Add a product to the cart or update its quantity
 */
export const addToCart = (product: Product) => {
  const cart = getCartFromLocalStorage();
  const existingProductIndex = cart.findIndex((item) => item._id === product._id);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].inventory += 1;
  } else {
    cart.push({ ...product, inventory: 1 });
  }

  saveCartToLocalStorage(cart);
};

/**
 * Remove a product from the cart by ID
 */
export const removeFromCart = (productId: string) => {
  let cart = getCartFromLocalStorage();
  cart = cart.filter((item) => item._id !== productId);
  saveCartToLocalStorage(cart);
};

/**
 * Update the quantity of a product in the cart
 */
export const updateCartQuantity = (productId: string, quantity: number) => {
  if (quantity < 1) return; // Prevents negative or zero quantities

  const cart = getCartFromLocalStorage();
  const productIndex = cart.findIndex((item) => item._id === productId);

  if (productIndex > -1) {
    cart[productIndex].inventory = quantity;
    saveCartToLocalStorage(cart);
  }
};

/**
 * Get all items from the cart
 */
export const getCartItems = (): Product[] => {
  return getCartFromLocalStorage();
};
