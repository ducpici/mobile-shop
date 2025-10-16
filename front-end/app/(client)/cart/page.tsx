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
import { CartItem } from "@/types/cart";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  fetchUserCart,
  deleteUserCart,
} from "@/redux/cartSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import { joinProductToCartLocal, joinProductToCartUser } from "@/helpers/cartUtils";
import { selectCartItemCount } from "@/redux/selectors/cartSelectors";
import { updateUserCartQuantity } from "@/redux/cartSlice";
import { calculateCartTotals } from "@/helpers/cartUtils";
import { hideLoading } from "@/redux/loadingSlice";

const Page = () => {
  const { userCart, localCart } = useAppSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { subtotal, tax, total } = calculateCartTotals(cartItems);

  const dispatch = useAppDispatch();
  const { allProducts: products } = useAppSelector((state) => state.product);
  const { user } = useAppSelector((state) => state.auth);

  const isLoading = useAppSelector((state) => state.loading.isLoading);
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);
  const itemCount = useAppSelector(selectCartItemCount);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCart(user.id));
    } else {
      dispatch(hideLoading());
    }
  }, [user, products, dispatch]);

  useEffect(() => {
    // user đã login -> fetch user cart
    if (user) {
      // dispatch(fetchUserCart({ user_id: user.id, products }));
      setCartItems(joinProductToCartUser(userCart, products));
    } else {
      // user chưa login -> lấy cart từ localStorage
      setCartItems(joinProductToCartLocal(localCart, products));
    }
  }, [userCart, localCart, products, user]);

  const handleDecreaseQuantity = (product_id: number) => {
    if (user) {
      const cartItem = userCart.find((i) => Number(i.product_id) === Number(product_id));
      if (!cartItem) return;
      if (cartItem.quantity > 1) {
        dispatch(
          updateUserCartQuantity({ cartItemId: cartItem.id, quantity: cartItem.quantity - 1 }),
        );
      }
    } else {
      dispatch(decreaseQuantity(product_id));
    }
  };

  const handleIncreaseQuantity = (product_id: number) => {
    if (user) {
      const cartItem = userCart.find((i) => Number(i.product_id) === Number(product_id));
      if (!cartItem) return;
      dispatch(
        updateUserCartQuantity({ cartItemId: cartItem.id, quantity: cartItem.quantity + 1 }),
      );
      console.log("CartItemId:", cartItem.id);
      console.log("NewQuaniy:", cartItem.quantity);
    } else {
      dispatch(increaseQuantity(product_id));
    }
  };

  const handleRemoveProduct = (product_id: number) => {
    if (user) {
      const cartItem = userCart.find((i) => Number(i.product_id) === Number(product_id));
      if (!cartItem) return;
      dispatch(deleteUserCart(cartItem.id));
    } else {
      dispatch(removeProduct(product_id));
    }
  };

  const handleInputQuantity = (product_id: number, quantity: number) => {
    dispatch(updateQuantity({ product_id, quantity }));
  };

  return (
    <>
      <BreadCrumb link="/cart" name="Cart" />
      <div className="flex h-full flex-col gap-10 space-y-4 md:flex-row">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {cartItems.length == 0 ? (
              <>
                <p className="text-center">Cart Empty!</p>
              </>
            ) : (
              <>
                <div className="flex h-full flex-1 flex-col md:flex-2/3">
                  <div className="flex items-center justify-between">
                    <h2 className="mb-2 font-bold md:mb-4 md:text-2xl">My Cart</h2>
                    <p className="text-right text-sm">{itemCount} items in bag</p>
                  </div>
                  <div className="product-list scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 mb-[200px] h-full flex-1 space-y-2 overflow-y-auto md:mb-10 md:h-svh md:space-y-4">
                    {cartItems.map((item) => {
                      if (!item.product) return null;
                      const product = item.product;
                      return (
                        <div key={item.id} className="flex w-full gap-2 p-2 shadow md:gap-4 md:p-4">
                          <div className="relative h-25 w-25 flex-shrink-0 md:h-50 md:w-50">
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
                            <Dialog
                              open={openDialogId === item.product_id}
                              onOpenChange={(isOpen) =>
                                setOpenDialogId(isOpen ? item.product_id : null)
                              }
                            >
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
                                      setOpenDialogId(null);
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
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="relative w-12 rounded border border-gray-400 text-center"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (/^[0-9]+$/.test(value)) {
                                        const newQty = value === "" ? 0 : Number(value);
                                        handleInputQuantity(product.id, newQty);
                                      }
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
                <div className="fixed bottom-0 left-0 z-1 w-full border-t bg-white p-2 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 md:static md:flex-1/3 md:border-none md:p-3 md:px-0 md:py-0 md:shadow-none">
                  {/* <div className="w-full border-t bg-white px-3 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 md:static md:flex-1/3 md:border-none md:px-0 md:py-0 md:shadow-none"> */}
                  <h2 className="mb-2 font-bold md:mb-4 md:text-2xl">Order information</h2>
                  <div className="space-y-1 md:space-y-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <span>Sub Total:</span>
                        <span className="text-base font-semibold">
                          {subtotal.toLocaleString("vi")}₫
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Tax:</span>
                        <span className="text-base font-semibold">{tax.toLocaleString("vi")}₫</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Total:</span>
                        <span className="text-base font-semibold text-red-500 md:text-xl">
                          {total.toLocaleString("vi")}₫
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <ul className="list-disc pl-4 text-sm text-gray-500">
                        <li>Shipping charges will be calculated at checkout.</li>
                        <li>You can also enter a coupon code at the checkout page.</li>
                      </ul>
                    </div>
                    <button className="w-full cursor-pointer rounded bg-red-500 p-2 font-semibold text-white uppercase transition-all duration-300 hover:bg-red-600">
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Page;
