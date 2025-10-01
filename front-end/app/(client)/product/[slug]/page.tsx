"use client";
import React, { useState } from "react";
import BreadCrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { products } from "@/datas/products";
import RatingStars from "@/components/RatingStars";
const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = React.use(params);
  const product = products.find((p) => p.id === Number(slug));
  const [viewImage, setViewImage] = useState(product?.mainImage ?? "");
  const [isViewMore, setIsViewMore] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  if (!product) {
    return <div className="p-4 text-red-500">Product not found!</div>;
  }
  return (
    <div>
      <BreadCrumb link={`/product/${slug}`} name="Product" />
      <div className="mx-auto max-w-4xl rounded bg-white p-2 shadow-lg md:mt-10">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="">
            <div className="flex w-full items-center justify-center rounded-lg border border-gray-300 p-4 md:w-100">
              <Image src={viewImage} alt={product.name} width={400} height={300} />
            </div>
            <div className="mt-2 flex justify-center gap-2">
              {product.images?.map((_, index) => (
                <div
                  key={index}
                  className={`cursor-pointer rounded p-1 hover:outline-1 hover:outline-gray-400 ${selectedImageIndex == index ? "outline-1 outline-gray-400" : ""}`}
                  onClick={() => {
                    setViewImage(product.images[index]);
                    setSelectedImageIndex(index);
                  }}
                >
                  <Image
                    key={index}
                    src={product.images[index]}
                    alt={product.name}
                    width={40}
                    height={40}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="content space-y-2">
            <h2 className="text-xl font-bold md:text-2xl">{product.name}</h2>
            <div className="relative">
              <p className={`text-justify ${isViewMore ? "" : "line-clamp-3"}`}>
                {product.description}
              </p>
              <span
                onClick={() => setIsViewMore(!isViewMore)}
                className="absolute right-0 mt-1 block cursor-pointer text-sm text-blue-500 hover:underline"
              >
                {isViewMore ? "Ẩn bớt" : "Xem thêm..."}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-20 font-semibold">Price:</span>
              <span className="text-xl font-semibold">
                {product.price.toLocaleString("vi-VN")} ₫
              </span>
            </div>
            {/* <div className="flex items-center">
              <span className="w-20 font-semibold">Color:</span>
            </div>
            <div className="flex items-center">
              <span className="w-20 font-semibold">RAM:</span>
            </div>
            <div className="flex items-center">
              <span className="w-20 font-semibold">Storage:</span>
            </div> */}
            <div>
              <RatingStars rating={product.rating} />
            </div>

            <div className="mt-2 flex items-center justify-center gap-4 md:ml-4">
              <button className="cursor-pointer rounded bg-[#00C2FF] px-3 py-2 font-semibold text-white">
                Buy now
              </button>
              <button
                className="cursor-pointer rounded bg-[#00FF19] px-3 py-2 font-semibold text-white"
                onClick={() => {}}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
