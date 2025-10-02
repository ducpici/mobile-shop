import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

type ProductCardProps = Pick<
  Product,
  "id" | "name" | "description" | "mainImage" | "price" | "rating"
>;

export const ProductCard = ({ id, name, mainImage, price, rating }: ProductCardProps) => {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white p-2 shadow-lg transition-shadow duration-200 hover:shadow-xl">
      <Link href={`/product/${id}`}>
        <div className="relative aspect-square w-full cursor-pointer transition-transform duration-300 hover:scale-102">
          <Image className="object-cover p-2" src={mainImage} alt={name} fill />
        </div>
      </Link>

      <div className="">
        <div className="line-clamp-2 h-[36px] text-xs font-bold md:h-[42px] md:text-sm">{name}</div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-red-600 md:text-base">
            {price.toLocaleString("vi-VN")}₫
          </span>
          <span className="text-xs font-thin text-gray-600 line-through">
            {price.toLocaleString("vi-VN")}₫
          </span>
        </div>
      </div>

      <div className="mt-1 md:mt-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
            {rating.toFixed(1)}
          </div>
          <button className="cursor-pointer rounded bg-blue-500 px-1 py-1 text-sm text-white hover:bg-blue-600 md:px-3">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
