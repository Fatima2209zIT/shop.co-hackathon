// "use client";
// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { urlFor } from '@/sanity/lib/image';

// interface Product {
//   _id: string;
//   name: string;
//   image: string;
//   quantity: number;
//   price: number;
// }

// export default function CartPage() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem('cart') || '{}');
//     const items = Object.values(cart) as Product[];
//     setProducts(items);
//   }, []);

//   const updateLocalStorage = (updatedCart: Product[]) => {
//     localStorage.setItem('cart', JSON.stringify(Object.fromEntries(updatedCart.map((p) => [p.name, p]))));
//   };

//   const handleIncrease = (name: string) => {
//     const updatedCart = products.map((product) =>
//       product.name === name ? { ...product, quantity: product.quantity + 1 } : product
//     );
//     setProducts(updatedCart);
//     updateLocalStorage(updatedCart);
//   };

//   const handleDecrease = (name: string) => {
//     const updatedCart = products
//       .map((product) =>
//         product.name === name && product.quantity > 1
//           ? { ...product, quantity: product.quantity - 1 }
//           : product
//       )
//       .filter((product) => product.quantity > 0);
//     setProducts(updatedCart);
//     updateLocalStorage(updatedCart);
//   };

//   const handleRemove = (name: string) => {
//     const updatedCart = products.filter((product) => product.name !== name);
//     setProducts(updatedCart);
//     updateLocalStorage(updatedCart);
//   };

//   const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
//   const discount = total * 0.2; // 20% discount
//   const deliveryFee = 15;
//   const finalTotal = total - discount + deliveryFee;

//   return (
//     <div className="flex flex-col p-4 md:p-6 bg-gray-50 min-h-screen">
//       <h1 className= "p-8 text-2xl md:text-3xl font-bold mb-6 text-center">Your Cart</h1>

//       {products.length === 0 ? (
//         <p className="text-center text-gray-500">Your cart is empty!</p>
//       ) : (
//         <div className="max-w-4xl mx-auto space-y-6">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow rounded-lg"
//             >
//               <div className="flex items-center space-x-4">
//                 <Image
//                   src={urlFor(product.image).url()}
//                   alt={product.name}
//                   width={80}
//                   height={80}
//                   className="rounded"
//                 />
//                 <div className="text-center md:text-left">
//                   <h2 className="text-lg font-semibold">{product.name}</h2>
//                   <p className="text-gray-600">Price: ${product.price}</p>
//                   <p className="text-gray-600">Quantity: {product.quantity}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2 mt-4 md:mt-0">
//                 <button
//                   onClick={() => handleDecrease(product.name)}
//                   className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span className="font-semibold text-gray-700">{product.quantity}</span>
//                 <button
//                   onClick={() => handleIncrease(product.name)}
//                   className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 onClick={() => handleRemove(product.name)}
//                 className="text-red-500 hover:text-red-700 font-semibold mt-4 md:mt-0"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           <div className="bg-white p-4 shadow rounded-lg space-y-4">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Subtotal</span>
//               <span className="font-semibold">${total.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Discount (20%)</span>
//               <span className="font-semibold text-red-500">-${discount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Delivery Fee</span>
//               <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-lg font-bold">
//               <span>Total</span>
//               <span>${finalTotal.toFixed(2)}</span>
//             </div>
//           </div>

//           <button
//             className="bg-black text-white font-bold py-3 rounded-lg w-full hover:bg-gray-800"
//           >
//             Go to Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { Products } from "../../../types/products";
import React, { useEffect, useState } from "react";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../actions/actions";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Products[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire(
          "Removed!",
          "Item has been removed from your cart.",
          "success"
        );
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantityChange(id, product.quantity + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.quantity > 1) {
      handleQuantityChange(id, product.quantity - 1);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Processing your order...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Success!",
          "Your order has been successfully processed!",
          "success"
        );
        // Clear the cart after proceeding (optional)
        setCartItems([]);
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className=" flex items-center justify-between text-2xl p-8 font-bold mb-6 text-gray-800">Shopping Cart</h1>

      <div className="space-y-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                {item.image && (
                  <Image
                    src={urlFor(item.image).url()}
                    className="w-16 h-16 object-cover rounded-lg"
                    alt="image"
                    width={500}
                    height={500}
                  />
                )}
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">Price: ${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
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
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total:</h2>
            <p className="text-xl font-bold text-gray-800">
              ${calculateTotal().toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleProceed}
            className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Proceed
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;