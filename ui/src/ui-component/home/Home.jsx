import { useEffect } from "react";
import { AvailableProducts } from "../products/AvailableProducts";

export const Home = () => {
  const products = async () => {
    const res = await fetch(import.meta.env.VITE_PRODUCTS_ENDPOINT);
    const data = await res.json();
    console.log("data available =>", data);
  };
  useEffect(() => {
    products();
  }, []);

  return (
    <div className="min-h-screen">
      <AvailableProducts />
    </div>
  );
};
