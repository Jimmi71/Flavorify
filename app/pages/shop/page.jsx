"use client";

import FoodCard from "@/components/FoodCard";
import { fetchFoodData } from "@/redux/slices/foodDataSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";
import Loading from "@/app/loading";

const Shop = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const foodData = useSelector((state) => state.foodData);

  useEffect(() => {
    dispatch(fetchFoodData());
  }, []);

  return (
    <>
      <h1 className="bg-black/80 text-blue-200 py-5 text-center md:text-4xl text-3xl font-extrabold lg:mt-8">
        SHOP NOW
      </h1>
      <div className="mt-12 mx-3 text-black flex flex-wrap items-center justify-center md:gap-7 gap-4">
        <button
          onClick={() => setCategory("burger")}
          className={`w-[100px] rounded-xl py-1  px-3 ${
            category === "burger"
              ? "outline outline-1 outline-black bg-transparent text-black"
              : "bg-red-500 text-blue-50 duration-300 transition-color ease-in-out hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black "
          }`}
        >
          Burger
        </button>
        <button
          onClick={() => setCategory("pizza")}
          className={`w-[100px] rounded-xl py-1  px-3 ${
            category === "pizza"
              ? "outline outline-1 outline-black bg-transparent text-black"
              : "bg-red-500 text-blue-50 duration-300 transition-color ease-in-out hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black "
          }`}
        >
          Pizza
        </button>
        <button
          onClick={() => setCategory("shawarma")}
          className={`w-[100px] rounded-xl py-1  px-3 ${
            category === "shawarma"
              ? "outline outline-1 outline-black bg-transparent text-black"
              : "bg-red-500 text-blue-50 duration-300 transition-color ease-in-out hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black "
          }`}
        >
          Shawarma
        </button>
        <button
          onClick={() => setCategory("pasta")}
          className={`w-[100px] rounded-xl py-1  px-3 ${
            category === "pasta"
              ? "outline outline-1 outline-black bg-transparent text-black"
              : "bg-red-500 text-blue-50 duration-300 transition-color ease-in-out hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black "
          }`}
        >
          Pasta
        </button>
        <button
          onClick={() => setCategory("fries")}
          className={`w-[100px] rounded-xl py-1  px-3 ${
            category === "fries"
              ? "outline outline-1 outline-black bg-transparent text-black"
              : "bg-red-500 text-blue-50 duration-300 transition-color ease-in-out hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black "
          }`}
        >
          Fries
        </button>
        <button
          onClick={() => setCategory("iceCream")}
          className={`w-[100px] rounded-xl py-1  px-3 ${
            category === "iceCream"
              ? "outline outline-1 outline-black bg-transparent text-black"
              : "bg-red-500 text-blue-50 duration-300 transition-color ease-in-out hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black "
          }`}
        >
          Ice Cream
        </button>
        <button
          onClick={() => setCategory("seaFood")}
          className={`w-[100px] rounded-xl py-1  px-3 ${
            category === "seaFood"
              ? "outline outline-1 outline-black bg-transparent text-black"
              : "bg-red-500 text-blue-50 duration-300 transition-color ease-in-out hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black "
          }`}
        >
          Sea Food
        </button>
        <button
          onClick={() => setCategory("")}
          className="flex items-center justify-center w-[90px] rounded-xl ml-3 p-1 bg-black/80 text-blue-50 duration-300 transition-color ease-in-out hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black"
        >
          <RxCrossCircled className="mr-2" /> RESET
        </button>
      </div>
      {foodData.isLoading ? (
        <Loading />
      ) : (
        <div className="grid xl:grid-cols-4 items-center justify-center  sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-14 my-12">
          {foodData?.data
            ?.filter((item) => {
              return category === "" ? item : item.foodCategory === category;
            })
            .map((elem, ind) => {
              return (
                <>
                  <FoodCard key={ind} elem={elem} />
                </>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Shop;
