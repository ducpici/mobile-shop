"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/Breadcrumb";
import Image from "next/image";
import RatingStars from "@/components/RatingStars";
import { toast } from "sonner";
import { addToCart } from "@/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { getProductById } from "@/redux/productSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import { CartBadge } from "@/components/CartBadge";
import { addUserCart } from "@/redux/cartSlice";

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = React.use(params);
  const { selectedProduct: product, isLoading } = useAppSelector((state) => state.product);
  const [viewImage, setViewImage] = useState<string | null>(null);
  const [isViewMore, setIsViewMore] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const images: string[] = [product?.mainImage, ...(product?.images ?? [])].filter(
    (img): img is string => typeof img === "string",
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (slug) dispatch(getProductById(Number(slug)));
  }, [dispatch, slug]);

  useEffect(() => {
    if (product?.mainImage) {
      setViewImage(product.mainImage);
    }
  }, [product]);

  const handleAddToCart = (product_id: number) => {
    if (user) {
      //Call API add to cart
      dispatch(addUserCart({ user_id: user.id, product_id: product_id }));
      toast.success("Product added to your cart", {
        action: {
          label: "Go to cart",
          onClick: () => {
            router.push("/cart");
          },
        },
      });
    } else {
      dispatch(addToCart(product_id));
      toast.success("Product added to your cart", {
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
    <>
      <div className="flex items-center justify-between">
        <BreadCrumb link={`/product/${slug}`} name="Product" />
        <CartBadge />
      </div>

      <div className="h-full overflow-y-auto">
        {isLoading ? (
          <LoadingSpinner />
        ) : !product ? (
          <div className="p-4 text-red-500">Product not found!</div>
        ) : (
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="h-full">
              <div className="flex w-full items-center justify-center rounded-lg border border-gray-300 p-4 md:w-100">
                {viewImage ? (
                  <Image
                    src={viewImage}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-contain"
                  />
                ) : (
                  <div className="h-[400px] w-[400px] animate-pulse rounded-lg bg-gray-200" />
                )}
              </div>
              <div className="mt-2 flex justify-center gap-2">
                {images?.map((_, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded p-1 hover:outline-1 hover:outline-gray-400 ${selectedImageIndex == index ? "outline-1 outline-gray-400" : ""}`}
                    onClick={() => {
                      setViewImage(images[index]);
                      setSelectedImageIndex(index);
                    }}
                  >
                    <Image
                      key={index}
                      src={images[index]}
                      alt={product.name}
                      width={40}
                      height={40}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="content space-y-3 md:space-y-4">
              <h2 className="text-xl font-bold md:text-2xl">{product.name}</h2>
              <div className="relative">
                <p className={`text-justify ${isViewMore ? "" : "line-clamp-4 md:line-clamp-3"}`}>
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
                {/* <span className="w-20 font-semibold">Price:</span> */}
                <span className="text-2xl font-semibold">
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
                <button
                  className="cursor-pointer rounded bg-[#00C2FF] px-3 py-2 text-lg font-semibold text-white"
                  onClick={() => {
                    handleAddToCart(product.id);
                    router.push("/cart");
                  }}
                >
                  Buy now
                </button>
                <button
                  className="cursor-pointer rounded bg-[#00FF19] px-3 py-2 text-lg font-semibold text-white"
                  onClick={() => {
                    handleAddToCart(product.id);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
