"use client";

import { fetchFoodData } from "@/redux/slices/foodDataSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import Loading from "@/app/loading";

const DisplayFoodData = () => {
  const dispatch = useDispatch();
  const foodData = useSelector((state) => state.foodData);

  useEffect(() => {
    dispatch(fetchFoodData());
  }, []);
  const first4Products = foodData?.data?.slice(-4).reverse();

  return (
    <>
      {foodData.isLoading ? (
        <Loading />
      ) : (
        <div className="grid xl:grid-cols-4 items-center justify-center  sm:grid-cols-2 lg:grid-cols-3 gap-10 m-10">
          {first4Products?.map((elem, ind) => {
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

export default DisplayFoodData;
