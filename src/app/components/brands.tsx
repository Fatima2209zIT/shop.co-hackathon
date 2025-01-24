"use client";

import Image from "next/image";
import versage from "@/app/images/versage.png";
import zara from "@/app/images/zara.png";
import gucci from "@/app/images/gucci.png";
import prada from "@/app/images/parada.png";
import calvin from "@/app/images/calvin-clein.png";

export default function Brands() {
  return (
    <div>
      {/* Desktop Animation */}
      <div className="w-full h-[122px] bg-black overflow-hidden relative lg:block hidden">
        <div className="flex animate-loop">
          {[versage, zara, gucci, prada, calvin].map((brand, index) => (
            <Image
              key={`brand-desktop-${index}`}
              src={brand}
              alt={`brand-${index}`}
              width={166.48}
              height={33.16}
              className="ml-[100px] mt-[40px]"
            />
          ))}
          {/* Duplicate for seamless looping */}
          {[versage, zara, gucci, prada, calvin].map((brand, index) => (
            <Image
              key={`brand-desktop-duplicate-${index}`}
              src={brand}
              alt={`brand-duplicate-${index}`}
              width={166.48}
              height={33.16}
              className="ml-[100px] mt-[40px]"
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes loop {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-60%);
            }
          }
          .animate-loop {
            animation: loop 20s linear infinite;
            display: flex;
            width: calc(100% + 1440px);
          }
        `}</style>
      </div>

      {/* Mobile Animation */}
      <div className="lg:hidden w-full h-[166px] bg-black overflow-hidden">
        <div className="flex animate-loop-mobile">
          {[versage, zara, gucci, prada, calvin].map((brand, index) => (
            <Image
              key={`brand-mobile-${index}`}
              src={brand}
              alt={`brand-${index}`}
              width={80}
              height={20}
              className="mx-[10vw] my-auto"
            />
          ))}
          {/* Duplicate for seamless looping */}
          {[versage, zara, gucci, prada, calvin].map((brand, index) => (
            <Image
              key={`brand-mobile-duplicate-${index}`}
              src={brand}
              alt={`brand-duplicate-${index}`}
              width={80}
              height={20}
              className="mx-[10vw] my-auto"
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes loop-mobile {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-loop-mobile {
            animation: loop-mobile 15s linear infinite;
            display: flex;
            width: calc(200%);
          }
        `}</style>
      </div>
    </div>
  );
}
