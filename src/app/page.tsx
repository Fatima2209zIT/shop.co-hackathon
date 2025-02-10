import Brands from "./components/brands";
import Hero from "./components/hero";
import Products from "./components/products";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Brands />
        <Products />
      </main>
      

    
    </div>
  );
}