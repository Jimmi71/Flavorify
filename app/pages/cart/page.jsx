"use client";

import FoodCard from "@/components/FoodCard";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartData = useSelector((state) => state.cartData);

  const subtotal = cartData?.data.reduce(
    (total, item) => parseInt(total) + parseInt(item?.foodPrice),
    0
  );

  const shippingFee = 5;

  return (
    <>
      <h1 className="bg-black/80 text-blue-200 py-5 text-center md:text-4xl text-3xl font-extrabold lg:mt-8">
        CART
      </h1>
      <div className="flex lg:flex-row flex-col justify-center">
        <div className="grid xl:grid-cols-3 items-center justify-center  sm:grid-cols-2 lg:grid-cols-2 gap-12 m-12">
          {cartData?.data.map((elem, ind) => {
            return (
              <>
                <FoodCard key={ind} elem={elem} />
              </>
            );
          })}
        </div>
        {cartData.quantity == 0 ? null : (
          <div className="lg:my-16 sm:ml-5 ml-10 mr-10 mb-12  bg-blue-200 h-fit p-8 rounded-lg shadow">
            <h1 className="md:text-3xl text-2xl font-bold">Order Summary</h1>
            <div className="flex items-center justify-between mt-3">
              <p>Subtotal:</p>
              <p>{subtotal}$</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p>Shipping Fee:</p>
              <p>{shippingFee}$</p>
            </div>
            <hr className="my-3" />
            <div className="flex items-center justify-between">
              <p>Total:</p>
              <p>{subtotal + shippingFee}$</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
