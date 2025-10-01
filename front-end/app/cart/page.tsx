"use client";
import React, { useState, useEffect } from "react";
import BreadCrumb from "@/components/Breadcrumb";
import { cart } from "@/datas/cart";
import { products } from "@/datas/products";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

const Page = () => {
  const [cartItems, setCartItems] = useState(cart.data);
  const [subtotal, setSubTotal] = useState<number>(0);
  const [countItem, setCountItem] = useState<number>(0);
  const tax = (subtotal / 100) * 5;
  useEffect(() => {
    let count = 0;
    const total = cartItems.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.product_id);
      count += 1;
      setCountItem(count);
      if (!product) return acc;
      return acc + item.quantity * product.price;
    }, 0);
    setSubTotal(total);
  }, [cartItems]);
  return (
    <div>
      <BreadCrumb link="/cart" name="Cart" />
      <div className="mx-auto max-w-7xl">
        <div className="gap-10 space-y-4 md:flex">
          <div className="flex-1">
            <h2 className="mb-2 font-bold md:mb-4 md:text-2xl">My Cart</h2>
            <p className="text-right text-sm">{countItem} items in bag</p>
            <div className="space-y-2 md:space-y-4">
              {cartItems.map((item, index) => {
                const product = products.find((product) => product.id == item.product_id);
                if (!product) return null;
                return (
                  <div key={index} className="flex w-full gap-2 p-2 shadow md:gap-4 md:p-4">
                    <div className="relative h-50 w-50 flex-1/2">
                      <Image
                        className="object-contain"
                        src={product.mainImage}
                        alt={product.name}
                        fill
                      />
                    </div>
                    <div className="flex flex-2/3 items-center">
                      <div>
                        <div>
                          <h2 className="text-lg font-semibold">{product.name}</h2>
                          <p className="line-clamp-3 text-justify text-sm text-gray-500">
                            {product.description}
                          </p>
                          <p className="font-bold md:text-2xl">
                            {product.price.toLocaleString("vi")}₫
                          </p>
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <span className="text-sm">Số lượng:</span>
                          <div className="flex items-center justify-center">
                            <span className="cursor-pointer rounded p-2 hover:bg-gray-300">
                              <Minus size={15} />
                            </span>
                            <input
                              type="number"
                              className="relative w-12 rounded border border-gray-400 text-center"
                              defaultValue={item.quantity}
                            />
                            <span className="cursor-pointer rounded p-2 hover:bg-gray-300">
                              <Plus size={15} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="mb-2 font-bold md:mb-4 md:text-2xl">Order information</h2>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <span>Sub Total:</span>
                  <span className="text-base font-semibold">{subtotal.toLocaleString("vi")}₫</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax:</span>
                  <span className="text-base font-semibold">{tax.toLocaleString("vi")}₫</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="text-xl font-semibold text-red-500">
                    {(subtotal + tax).toLocaleString("vi")}₫
                  </span>
                </div>
              </div>

              <div>
                <ul className="list-disc text-sm text-gray-500">
                  <li>Shipping charges will be calculated at checkout.</li>
                  <li>You can also enter a coupon code at the checkout page.</li>
                </ul>
              </div>
              <button className="w-full cursor-pointer rounded bg-red-500 p-2 font-semibold text-white uppercase transition-all duration-300 hover:bg-red-600">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
