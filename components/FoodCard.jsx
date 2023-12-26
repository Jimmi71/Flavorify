"use client";

import { BsCartFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { AiFillMinusSquare } from "react-icons/ai";
import { RiAddBoxFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  addCartItem,
  addToCart,
  deleteCartData,
  minusCartItem,
} from "@/redux/slices/cartSlice";

const FoodCard = ({ elem, deleteCardItem, editCardItem }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <>
      <div className="h-[250px] bg-red-500 rounded-lg w-[250px] shadow mx-auto hover:scale-105 transition duration-300 ease-in-out">
        <div className="relative">
          <Image
            className="h-[200px] w-[250px] rounded-t-lg object-cover object-center"
            width={500}
            height={500}
            src={elem?.foodImage}
            alt={elem?.foodName}
          />
          <div className="h-[200px] w-[250px] bg-black/60 flex items-center justify-center rounded-t-lg text-center absolute top-0 p-2 cursor-pointer">
            <>
              <div className="h-[200px] w-[250px] absolute top-0 right-0 p-3 text-transparent hover:text-blue-200">
                <div className="absolute top-0 left-0 p-3">
                  {pathname === "/pages/profile/private" && (
                    <AiFillEdit
                      onClick={() => editCardItem(elem)}
                      className="float-right text-2xl hover:text-white transition-colors"
                    />
                  )}
                </div>
                {pathname === "/pages/shop" ||
                pathname === "/" ||
                pathname === "/pages/profile/public" ? (
                  <BsCartFill
                    onClick={() => {
                      session
                        ? dispatch(addToCart({ cartData: elem }))
                        : router.push("/pages/login");
                    }}
                    className="float-right text-2xl hover:text-white transition-colors"
                  />
                ) : (
                  <AiFillDelete
                    onClick={() =>
                      pathname === "/pages/cart"
                        ? dispatch(deleteCartData({ cartData: elem }))
                        : deleteCardItem(elem)
                    }
                    className="float-right text-2xl hover:text-white transition-colors"
                  />
                )}
              </div>
            </>
            <h1 className="text-blue-200 text-3xl font-bold">
              {elem?.foodName}
            </h1>
            <div className="absolute bottom-0 bg-black/50 text-blue-200 hover:text-white w-full">
              <p
                onClick={() => {
                  router.push(`/pages/profile/public?id=${elem.creator._id}`);
                }}
              >
                {elem?.creator?.username}
              </p>
            </div>
          </div>
          <div
            className={`flex justify-center items-center text-2xl font-bold pt-2 px-6 text-blue-200 ${
              pathname === "/pages/cart" && "text-xl"
            }`}
          >
            <h1 className="mr-3">Price:</h1>
            <h1>{elem?.foodPrice}$</h1>
            {pathname === "/pages/cart" && (
              <div className="ml-8 flex">
                <AiFillMinusSquare
                  onClick={() => dispatch(minusCartItem({ cartData: elem }))}
                  className="text-3xl mr-[1px] p-1 hover:text-black transition-colors ease-out cursor-pointer"
                />
                <h1>{elem?.quantity}</h1>
                <RiAddBoxFill
                  onClick={() => dispatch(addCartItem({ cartData: elem }))}
                  className="text-3xl ml-[1px] p-1 hover:text-black transition-colors ease-in-out cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;
