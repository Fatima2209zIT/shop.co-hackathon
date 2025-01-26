import React from "react";
import client from "../../../sanity/lib/client";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";

// Defining the Product type
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
  sizes: string[];
  imageUrl: string;
  colors: string[];
  category: string;
  slugCurrent: string;
}

interface ProductPageProps {
  params: Promise<{ slug: string }>; // Mark params as a Promise
}

async function getProduct(slug: string): Promise<Product | null> {
  const product = await client.fetch(
    groq`*[_type == "products" && slug.current == $slug][0]{
      _id,
      name,
      description,
      price,
      discountPercent,
      sizes,
      "imageUrl": image.asset->url,
      colors,
      category,
      "slugCurrent": slug.current
    }`,
    { slug }
  );

  return product || null;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params; // Explicitly await params
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-10 flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</p>
          <p className="text-xl text-gray-600 mb-6">Sorry, we couldn't find the product you were looking for.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-400 font-semibold text-lg">
            Go back to the homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row items-start gap-12 mb-12">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">{product.name}</h2>
          <p className="text-md text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-2">Price: ${product.price}</p>
          <p className="text-sm text-red-500 mb-6">Discount: {product.discountPercent}%</p>

          {/* Sizes Section */}
          <div className="mt-4 mb-6">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Available Sizes:</h3>
            <div className="flex gap-4 flex-wrap">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Colors Section */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-4 mb-6">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Available Colors:</h3>
              <div className="flex gap-4 flex-wrap">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="w-8 h-8 rounded-full"
                    style={{
                      backgroundColor: color,
                      border: "1px solid #ddd",
                    }}
                  ></span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
