"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {Button} from "reactstrap";
import { useRouter } from "next/navigation";

function formatStars(score) {
  if (!score) score = 0;

  if (score > 5) score = 5;
  if (score < 0) score = 0;

  let stars = "★".repeat(score);
  stars += "☆".repeat(5 - score);

  return stars;
}

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const  id  = params.id;
  const [product, setProduct] = useState({});
  const getAllProductsById = async () => {
  try{
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    setProduct(data);
  }
  catch(error){
    setProduct({});
  };
  

  };

  console.log("-product-",product);
  useEffect(() => {
    getAllProductsById();
  }, []);
  return (
    <div className="flex flex-column h-auto justify-center gap-4 m-auto p-[1rem] max-w-[600px]">
      <p className="text-2xl font-bold text-center">Details Product</p>

      <div className="flex flex-column w-full gap-2 items-center ">
        <img 
        src={product.thumbnail}
        alt={product.title}
        className="w-[200px] h-[200px] object-cover hover:scale-110 duration-300"
        >
        </img>
        <p className="text-xl font-bold" style={{color : "#3d0066"}}>{product.title}</p>
        <p className="text-xl text-center">Description: {product.description}</p>
        <p className="text-xl text-center">$ {product.price}</p>
        {Array.isArray(product.reviews) && product.reviews.length>0 &&(
          <div className="w-full">
            <p className="text-xl font-semibold">Reviews</p>
            <div className="flex flex-col gap-3">
              {product.reviews.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-3 hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{item.reviewerName}</span>
                    <span className="text-sm">{formatStars(item.rating)} ({item.rating})</span>
                  </div>
                  <p>{item.comment}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

        <Button
          color="primary"
          className="w-[30%] self-center"
          onClick={() => router.back()}
          
          
        >
          Back
        </Button>

    </div>
  );
}
