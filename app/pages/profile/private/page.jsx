"use client";

import FoodCard from "@/components/FoodCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UpdateFoodItem from "../../updateFoodItem/page";
import Loading from "@/app/loading";

const PrivateProfile = () => {
  const [foods, setFoods] = useState();
  const [updateItem, setUpdateItem] = useState();
  const { data: session } = useSession();
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    if (session?.user?._id) {
      axios.get(`/api/profile/${session?.user._id}/foods`).then((res) => {
        setFoods(res.data.foodData);
        setLoading(false);
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const editCardItem = (food) => {
    setShowModel(true);
    scrollToTop();
    setUpdateItem(food);
  };

  const deleteCardItem = (food) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this Food Item?"
    );
    if (hasConfirmed) {
      try {
        axios.delete(`/api/updateFoodItem/${food._id}`);
        const filteredFoods = foods.filter((p) => p._id !== food._id);
        setFoods(filteredFoods);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session?.user?._id, showModel]);

  showModel
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <>
      <h1 className="bg-black/80 text-blue-200 py-5 text-center md:text-4xl text-3xl font-extrabold lg:mt-8">
        PROFILE
      </h1>
      <div className="flex items-center justify-center my-16">
        <div>
          <div className="flex items-center mb-2">
            <h1 className="text-2xl font-bold">Username:</h1>
            <p className="ml-3 text-lg">{session?.user?.username}</p>
          </div>
          <div className="flex items-center text-lg">
            <h1 className="text-2xl font-bold">Email:</h1>
            <p className="ml-3">{session?.user?.email}</p>
          </div>
        </div>
      </div>
      <h1 className="underline font-bold text-xl ml-16">FOODS:</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid xl:grid-cols-4 items-center justify-center  sm:grid-cols-2 lg:grid-cols-3 gap-10 m-10">
          {foods?.map((elem, ind) => {
            return (
              <>
                <FoodCard
                  key={ind}
                  elem={elem}
                  deleteCardItem={deleteCardItem}
                  editCardItem={editCardItem}
                />
              </>
            );
          })}
        </div>
      )}
      <div
        onClick={() => {
          setShowModel(!showModel);
        }}
        className={`absolute right-0 top-0 bg-black/80 w-full h-screen z-20 transition-all ease-in-out ${
          !showModel && "hidden"
        }`}
      ></div>
      {showModel && (
        <UpdateFoodItem
          showModel={showModel}
          setShowModel={setShowModel}
          updateItem={updateItem}
        />
      )}
    </>
  );
};

export default PrivateProfile;
