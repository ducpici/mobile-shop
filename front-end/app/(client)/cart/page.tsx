"use client";
import React, { useState, useEffect } from "react";
import BreadCrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { Plus, Minus, CircleX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CartItem } from "../types/cart";
import { products } from "@/datas/products";
import { joinProductToCartItem } from "@/utils/joinProductToCartItem";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
} from "@/redux/cartSlice";
import { showLoading, hideLoading } from "@/redux/loadingSlice";

const Page = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubTotal] = useState<number>(0);
  const [countItem, setCountItem] = useState<number>(0);
  const tax = (subtotal / 100) * 10;
  const total = subtotal + tax;
  const user = false;
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(showLoading());
    setTimeout(() => {
      dispatch(hideLoading());
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      // Call API get cart from user);
    } else {
      // Guest → load từ localStorage
      setCartItems(joinProductToCartItem(cart));
    }
  }, [user, cart, dispatch]);

  useEffect(() => {
    let count = 0;
    const total = cartItems.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.product_id);
      if (product) {
        count += item.id;
        return acc + item.quantity * product.price;
      }
      return acc;
    }, 0);

    setCountItem(count);
    setSubTotal(total);
  }, [cartItems]);

  const handleDecreaseQuantity = (product_id: number) => {
    dispatch(decreaseQuantity(product_id));
  };

  const handleIncreaseQuantity = (product_id: number) => {
    dispatch(increaseQuantity(product_id));
  };

  const handleRemoveProduct = (product_id: number) => {
    dispatch(removeProduct(product_id));
  };

  const handleInputQuantity = (product_id: number, quantity: number) => {
    dispatch(updateQuantity({ product_id, quantity }));
  };

  return (
    <div className="relative">
      <BreadCrumb link="/cart" name="Cart" />
      {isLoading ? (
        <></>
      ) : (
        <>
          {cartItems.length == 0 ? (
            <>
              <p className="text-center">Cart Empty!</p>
            </>
          ) : (
            <>
              <div className="mx-auto max-w-7xl">
                <div className="gap-10 space-y-4 md:flex">
                  <div className="flex-1">
                    <h2 className="mb-2 font-bold md:mb-4 md:text-2xl">My Cart</h2>
                    <p className="text-right text-sm">{countItem} items in bag</p>
                    <div className="space-y-2 md:space-y-4">
                      {cartItems.map((item) => {
                        if (!item.product) return null;
                        const product = item.product;
                        return (
                          <div
                            key={item.id}
                            className="flex w-full gap-2 p-2 shadow md:gap-4 md:p-4"
                          >
                            <div className="relative h-50 w-50 flex-1/2">
                              <Link href={`/product/${item.product.id}`}>
                                <Image
                                  className="object-contain"
                                  src={item.product.mainImage}
                                  alt={item.product.name}
                                  fill
                                />
                              </Link>
                            </div>
                            <div className="relative flex flex-2/3 items-center">
                              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                <DialogTrigger>
                                  <CircleX className="absolute top-0 right-0 cursor-pointer text-gray-400 hover:text-red-500" />
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Are you sure delete {`"${product.name}"`} from your cart
                                    </DialogTitle>
                                    <DialogDescription>
                                      This action cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter className="">
                                    <DialogClose asChild>
                                      <Button variant="outline" className="cursor-pointer">
                                        No
                                      </Button>
                                    </DialogClose>
                                    <Button
                                      type="submit"
                                      className="cursor-pointer"
                                      onClick={() => {
                                        handleRemoveProduct(product.id);
                                      }}
                                    >
                                      Yes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
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
                                  <div className="flex items-center justify-center gap-1">
                                    <span
                                      className="cursor-pointer rounded p-2 hover:bg-gray-300"
                                      onClick={() => {
                                        handleDecreaseQuantity(product.id);
                                      }}
                                    >
                                      <Minus size={15} />
                                    </span>
                                    <input
                                      type="number"
                                      className="relative w-12 rounded border border-gray-400 text-center"
                                      value={item.quantity}
                                      onChange={(e) => {
                                        const newQty = Number(e.target.value);
                                        // if (newQty <= 0) return;
                                        handleInputQuantity(product.id, newQty);
                                      }}
                                    />
                                    <span
                                      className="cursor-pointer rounded p-2 hover:bg-gray-300"
                                      onClick={() => {
                                        handleIncreaseQuantity(product.id);
                                      }}
                                    >
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
                          <span className="text-base font-semibold">
                            {subtotal.toLocaleString("vi")}₫
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Tax:</span>
                          <span className="text-base font-semibold">
                            {tax.toLocaleString("vi")}₫
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">Total:</span>
                          <span className="text-xl font-semibold text-red-500">
                            {total.toLocaleString("vi")}₫
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
