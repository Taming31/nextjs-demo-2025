"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FormComponent from "@/components/FormComponent";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const getAllProducts = async() => {
  try{
    const response = await fetch("https://dummyjson.com/products");

    if(!response.ok){ 
      throw new Error("Failed to fetch products");
    }

    const allProduct = await response.json();
    setProducts(allProduct.products);
    setFilteredProducts(allProduct.products);
  }
    catch (error) {
      setProducts([]);
      setFilteredProducts([]);
    }
  };

  console.log("-Products-",products);
  console.log("-FilteredProducts-",filteredProducts);


  useEffect(() => {
    getAllProducts();
  }, []);

  const handleSearch = (text) => {
    const filterProduct = products.filter((p) => 
    p.title.toLowerCase().includes(text.toLowerCase()))
    setFilteredProducts(filterProduct);
  }


  return (
    <div>
      <Header />
      <FormComponent onSearch={handleSearch} /> 

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
        {filteredProducts.map((items) => (
  <div
    key={items.id}
    onClick={() => router.push(`/products/${items.id}`)}
    className="w-full max-w-xs bg-white/10 border border-white/20 rounded-xl 
               p-4 flex flex-col items-center gap-3 cursor-pointer 
               shadow-sm hover:shadow-md hover:-translate-y-1 
               transition-all duration-200 ease-in-out"
  >
    {/* รูปสินค้า */}
    <img
      alt={items.title}
      src={items.thumbnail}
      className="h-48 w-full object-cover rounded-lg"
    />

    {/* ชื่อสินค้า */}
    <p
      className="text-base font-semibold text-center"
      style={{ color: "#3d0066" }}   // โทนม่วงอ่อน อ่านง่ายบนพื้นเข้ม
    >
      {items.title}
    </p>

    {/* ราคา */}
    <p
      className="text-sm font-bold"
      style={{ color: "#dc562e" }}   // สีทองเหลืองเดียวกับชื่อร้าน
    >
      ${items.price}
    </p>
  </div>
))}

      </div>
    </div>
  );
}
