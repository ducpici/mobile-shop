"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { addToCart } from "@/helpers/cartLocalStorage";
import { toast } from "sonner";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const user = false;
  const router = useRouter();
  const handleAddToCart = (product_id: number) => {
    if (user) {
      //Call API add to cart
    } else {
      addToCart(product_id);
      toast("Product added to your cart", {
        action: {
          label: "Go to cart",
          onClick: () => {
            router.push("/cart");
          },
        },
      });
    }
  };
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white p-2 shadow-lg transition-shadow duration-200 hover:shadow-xl">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square w-full cursor-pointer transition-transform duration-300 hover:scale-102">
          <Image className="object-cover p-2" src={product.mainImage} alt={product.name} fill />
        </div>
      </Link>

      <div className="">
        <div className="line-clamp-2 h-[36px] text-xs font-bold md:h-[42px] md:text-sm">
          {product.name}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-red-600 md:text-base">
            {product.price.toLocaleString("vi-VN")}₫
          </span>
          <span className="text-xs font-thin text-gray-600 line-through">
            {product.price.toLocaleString("vi-VN")}₫
          </span>
        </div>
      </div>

      <div className="mt-1 md:mt-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
            {product.rating.toFixed(1)}
          </div>
          <button
            className="cursor-pointer rounded bg-blue-500 px-1 py-1 text-sm text-white hover:bg-blue-600 md:px-3"
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
