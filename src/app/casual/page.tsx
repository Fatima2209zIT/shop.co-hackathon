"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Products } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import imageUrlBuilder from "@sanity/image-url";
import stars from "@/app/images/starsrate.png";
import Link from "next/link";
import { addToCart } from "../actions/actions";
import Swal from "sweetalert2";


export default function Casual() {
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    size: "",
    priceRange: [50, 200],
  });

    
  const [products, setProducts] = useState<Products[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State to toggle filter visibility

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

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts: Products[] = await client.fetch(allProducts);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts); // Initialize filteredProducts with all products
    }
    fetchProducts();
  }, []);

  const builder = imageUrlBuilder(client);

  function urlFor(image: { asset: { _ref: string; _type: "image" } }) {
    return builder.image(image);
  }

  const handleFilterChange = (type: string, value: string | number[]) => {
    setFilters({ ...filters, [type]: value });
  };

  // Apply filters to the products
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        filters.category === "" || product.category === filters.category;
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      return matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [filters, products]);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside
        className={`lg:w-1/4 w-full bg-gray-100 p-4 transition-all duration-300 ease-in-out lg:block ${isFilterVisible ? "block" : "hidden"} lg:block`}
      >
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        {/* Categories */}
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
          <ul className="space-y-2">
            {["tshirt", "short", "jeans", "hoodie", "shirt"].map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleFilterChange("category", category)}
                  className={`text-gray-700 ${filters.category === category ? "font-bold" : ""}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Size */}
        <div className="mt-6">
          <h3 className="font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {["Small", "Medium", "Large", "X-Large"].map((size) => (
              <button
                key={size}
                className={`px-2 py-1 border ${filters.size === size ? "border-black" : "border-gray-300"} rounded`}
                onClick={() => handleFilterChange("size", size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-6">
          <h3 className="font-medium mb-2">Price</h3>
          <input
            type="range"
            min="50"
            max="200"
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange("priceRange", [50, parseInt(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex justify-between text-gray-600 text-sm">
            <span>$50</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      </aside>

{/* Filter Toggle Button */}
<button
  onClick={() => setIsFilterVisible(!isFilterVisible)}
  className={`p-3 text-white rounded-md shadow-md mb-4 lg:hidden fixed top-20 right-4 z-10 transition-transform duration-300 ${
    isFilterVisible ? "bg-red-500 rotate-180" : "bg-blue-500"
  }`}
>
  {isFilterVisible ? "Hide Filters" : "Show Filters"}
</button>


      {/* Products */}
      <main className="w-full lg:w-3/4 p-4 pt-20">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Casual</h1>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="flex flex-col items-center bg-white p-4 shadow rounded-md">
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
              <Image src={stars} alt="stars" width={87} height={15.47} />
              <p className="font-satoshi font-bold text-[24px] leading-[32.4px] text-black mt-2">
                ${product.price}
              </p>
              <Link key={product.slugCurrent} href={`/products/${product.slugCurrent}`}>
              <button className="mt-4 bg-black text-white text-sm font-medium py-2 px-4 rounded hover:bg-gray-800">
                View Product
              </button>
              </Link>
       
         <button onClick={(e) => handleClick(e, product)} className="mt-4 bg-black text-white text-sm font-medium py-2 px-4 rounded hover:bg-gray-800">
ADD TO CART
         </button>
            
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}



