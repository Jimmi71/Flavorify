"use client";

import { fetchFoodData } from "@/redux/slices/foodDataSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const UpdateFoodItem = ({ showModel, setShowModel, updateItem }) => {
  const [loading, setLoading] = useState(false);
  const [foodData, setFoodData] = useState({
    foodName: "",
    foodPrice: "",
    foodImage: "",
    foodCategory: "",
  });

  const getFoodItemDetail = () => {
    axios.get(`/api/updateFoodItem/${updateItem._id}`).then((res) =>
      setFoodData({
        foodName: res.data.foodData.foodName,
        foodPrice: res.data.foodData.foodPrice,
        foodImage: res.data.foodData.foodImage,
        foodCategory: res.data.foodData.foodCategory,
      })
    );
  };

  useEffect(() => {
    getFoodItemDetail();
  }, [updateItem]);

  const dispatch = useDispatch();

  const sendFoodData = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .patch(`/api/updateFoodItem/${updateItem._id}`, { ...foodData })
      .then(() => {
        setFoodData({
          ...foodData,
          foodName: "",
          foodPrice: "",
          foodImage: "",
          foodCategory: "",
        });
        toast.success("Food Updated Successfully");
        dispatch(fetchFoodData());
        setLoading(false);
        setShowModel(!showModel);
      })
      .catch((error) => {
        toast.error("Failed to Update");
      });
  };

  return (
    <div className="absolute z-20 w-[70%] lg:top-[30%] top-[20%] left-[16%] md:text-lg text-sm bg-blue-200 text-black py-6 sm:px-12 px-4 rounded-3xl shadow-md shadow-black/80 outline-none border-4 border-red-500">
      <RxCrossCircled
        onClick={() => {
          setShowModel(!showModel);
        }}
        size={25}
        className="absolute top-3 cursor-pointer right-3 hover:text-red-500 text-black"
      />
      <h1 className=" text-2xl md:text-3xl mb-6 font-bold  mx-auto text-center">
        Update Food Item
      </h1>
      <form className="text-lg" onSubmit={sendFoodData}>
        <div className="flex lg:flex-row flex-col">
          <div className="mb-3 flex flex-col w-full">
            <label className="ml-2">Food Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Zinger-Burger"
              value={foodData.foodName}
              onChange={(e) =>
                setFoodData({ ...foodData, foodName: e.target.value })
              }
              className="rounded-xl text-sm font-normal text-gray-800 py-2 px-3 shadow  shadow-black/80 outline-1 outline-red-500"
            />
          </div>
          <div className="mb-3 flex flex-col lg:mx-5 w-full">
            <label className="ml-2">Food Price</label>
            <input
              required
              type="number"
              placeholder="e.g. 10"
              value={foodData.foodPrice}
              onChange={(e) =>
                setFoodData({ ...foodData, foodPrice: e.target.value })
              }
              className="rounded-xl font-normal text-sm text-gray-800 py-2 px-3 shadow  shadow-black/80 outline-1 outline-red-500"
            />
          </div>
          <div className="mb-3 flex flex-col w-full">
            <label className="lg:ml-2">Food Category</label>
            <select
              required
              value={foodData.foodCategory}
              onChange={(e) =>
                setFoodData({ ...foodData, foodCategory: e.target.value })
              }
              className="rounded-xl text-sm font-normal text-gray-800 py-2 px-3 shadow  shadow-black/80 outline-1 outline-red-500"
            >
              <option value="" disabled selected>
                ---Choose an option---
              </option>
              <option value="burger">Burger</option>
              <option value="pizza">Pizza</option>
              <option value="shawarma">Shawarma</option>
              <option value="sushi">Pasta</option>
              <option value="fries">Fries</option>
              <option value="iceCream">Ice Cream</option>
              <option value="seaFood">Sea Food</option>
            </select>
          </div>
        </div>
        <div className="mb-3 flex flex-col w-full">
          <label className="ml-2">Food Image URL</label>
          <input
            required
            type="url"
            placeholder="e.g. https://xyz.jpg"
            value={foodData.foodImage}
            onChange={(e) =>
              setFoodData({ ...foodData, foodImage: e.target.value })
            }
            className="rounded-xl text-sm font-normal text-gray-800 py-2 px-3 shadow  shadow-black/80 outline-1 outline-red-500"
          />
        </div>

        <div className="mx-auto w-max ">
          <button
            type="submit"
            className="bg-red-500 text-blue-50 rounded-xl py-1 px-10 mt-3 hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black duration-300 transition-color ease-in-out"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFoodItem;
