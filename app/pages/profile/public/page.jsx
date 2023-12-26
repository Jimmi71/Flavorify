"use client";

import Loading from "@/app/loading";
import FoodCard from "@/components/FoodCard";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PublicProfile = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const fetchData = () => {
    axios.get(`/api/profile/${promptId}/foods`).then((res) => {
      setFoods(res.data.foodData);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="bg-black/80 text-blue-200 py-5 text-center md:text-4xl text-3xl font-extrabold lg:mt-8">
        PROFILE
      </h1>
      <div className="flex items-center justify-center my-16">
        <div>
          <div className="flex items-center mb-2">
            <h1 className="text-2xl font-bold">Username:</h1>
            <p className="ml-3 text-lg">{foods[0]?.creator?.username}</p>
          </div>
          <div className="flex items-center text-lg">
            <h1 className="text-2xl font-bold">Email:</h1>
            <p className="ml-3">{foods[0]?.creator?.email}</p>
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
                <FoodCard key={ind} elem={elem} />
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PublicProfile;
