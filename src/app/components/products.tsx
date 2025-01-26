"use client";
import Image from "next/image";
import stars5 from "@/app/images/5stars.png";
import casual from "@/app/images/casual.png";
import formal from "@/app/images/formal.png";
import party from "@/app/images/party.png";
import gym from "@/app/images/gym1.png";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useState, useEffect } from "react";
import client from "../../sanity/lib/client";
import { eight } from "@/sanity/lib/queries";
import type { Products } from "../../../types/products";
import { addToCart } from "../actions/actions";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Products() {
  const [products, setProducts] = useState<Products[]>([]);

  // Fetch products from Sanity
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products: Products[] = await client.fetch(eight);
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const handleClick = (e: React.MouseEvent, product: Products) => {
    e.preventDefault();
    addToCart(product);

    // Show SweetAlert2 notification
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} has been added to your cart successfully!`,
      timer: 2000, // Auto-close after 2 seconds
      timerProgressBar: true,
      showConfirmButton: false, // Hide confirm button
    });
  };

  return (
    <div className="lg:w-full w-full pt-[150px]">
      {/* New Arrivals Section */}
      <div className="lg:w-full w-full pt-[150px]">
        <div className="lg:w-[403px] w-[269px] h-[38px] lg:h-[58px] flex absolute lg:top-[991px] top-[1147px] left-[61px] lg:left-[518px] font-integral font-semibold lg:text-[48px] text-[32px] items-center justify-center text-black">
          NEW ARRIVALS
        </div>
        {/* Product Container */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8 justify-center">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center bg-white p-4 shadow rounded-md"
            >
              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              )}
              <div className="font-bold text-black mt-2">{product.name}</div>

              <p className="font-satoshi font-bold text-[24px] leading-[32.4px] text-black mt-2">
                ${product.price}
              </p>

              <Link
                key={product.slugCurrent}
                href={`/products/${product.slugCurrent}`}
              >
                <button className="mt-4 bg-black text-white text-sm font-medium py-2 px-4 rounded hover:bg-gray-800">
                  View Product
                </button>
              </Link>
              <button
                onClick={(e) => handleClick(e, product)}
                className="mt-4 bg-black text-white text-sm font-medium py-2 px-4 rounded hover:bg-gray-800"
              >
                ADD TO CART
              </button>

              <div className="w-[58px] h-[28px] rounded-[62px] px-[14px] py-[6px] bg-[#FF33331A] text-[#FF3333] font-satoshi font-medium text-[12px] leading-[16.2px] animate-bounce mt-2">
                -20%
              </div>
            </div>
          ))}
        </div>
      </div>

      <a href="/casual">
        <div className="flex items-center justify-center ">
          <button className="lg:w-[218px] w-[358px] lg:h-[52px] h-[46px] rounded-[62px] border px-[54px] py-[16px] gap-[12px] border-[#0000001A] text-black font-satoshi font-medium lg:text-[16px] text-[14px] lg:leading-[21.6px] leading-[18.9px] hover:bg-[#8b8787fb]">
            View All
          </button>
        </div>
      </a>

      <div className="container mx-auto px-4 py-12">
        {/* Section: Our Happy Customers */}
        <div className="text-center">
          <h1 className="font-integral font-semibold text-[32px] lg:text-[48px] leading-[36px] lg:leading-[57.6px]">
            OUR HAPPY CUSTOMERS
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {/* Testimonial Cards */}
          {[{ name: "Sarah M.", review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." }, { name: "Alex K.", review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions." }, { name: "James L.", review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends." }].map((customer, index) => (
            <div
              key={customer.name}
              className="rounded-[20px] border border-[#0000001A] p-6 lg:p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image src={stars5} alt="stars" width={118} height={19} />
              <h2 className="font-satoshi font-bold text-[16px] mt-4">{customer.name}</h2>
              <p className="font-satoshi text-[#00000099] text-[16px] mt-2">{customer.review}</p>
            </div>
          ))}
        </div>

        {/* Section: Browse by Dress Style */}
        <div className="bg-[#F0F0F0] rounded-[20px] lg:rounded-[40px] mt-16 p-8 lg:p-12 relative">
          <h1 className="text-center font-integral font-bold text-[32px] lg:text-[48px] leading-[36px] lg:leading-[57.6px]">
            BROWSE BY DRESS STYLE
          </h1>

          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-12">
            {/* Dress Categories */}
            {[{ src: casual, alt: "Casual" }, { src: formal, alt: "Formal" }, { src: party, alt: "Party" }, { src: gym, alt: "Gym" }].map((style, index) => (
              <div
                key={style.alt}
                className="relative rounded-[20px] overflow-hidden hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-black"
              >
                <Image src={style.src} alt={style.alt} width={407} height={289} className="w-full h-auto rounded-[20px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};