"use client";

import AddNewFood from "@/components/AddNewFood";
import BestServices from "@/components/BestServices";
import CustomerReviews from "@/components/CustomerReviews";
import DisplayFoodData from "@/components/DisplayFoodData";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Suspense, useState } from "react";
import { MdAddBox, MdSupportAgent } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";

const Home = () => {
  const { data: session } = useSession();
  const [showModel, setShowModel] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  showModel
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div>
      <div className="md:text-[90px] relative sm:text-[70px] text-[50px] flex flex-col justify-center item-center w-full">
        <Image
          className="z-10 sm:h-[400px] h-[300px] object-cover object-center w-[100%]"
          src="/assets/images/topImg.jpg"
          width={1000}
          height={1000}
          alt="top-image"
        />
        <div className="bg-black/80 absolute top-0 sm:h-[400px] h-[300px] w-[100%] z-10 sm:items-end items-center flex justify-center flex-col font-bold">
          <div className="lg:w-[60%] md:w-[80%] w-[100%] flex flex-col items-center justify-center">
            <h1>
              <span className=" text-red-500 md:mr-[50px] mr-[30px]">THE</span>
              <span className="text-blue-200">Best</span>
            </h1>
            <h1>
              <span className=" text-blue-200 md:mr-[50px] mr-[30px]">
                Food
              </span>
              <span className=" text-red-500">SHOP</span>
            </h1>
            {session && (
              <div className="mt-5 lg:text-base md:text-sm text-[12px]">
                <button
                  onClick={() => {
                    setShowModel(!showModel);
                    scrollToTop();
                  }}
                  className="flex items-center cursor-pointer mx-3 rounded-lg bg-red-500 text-blue-100 px-3 py-2 hover:bg-blue-100 hover:text-black hover:outline-2 hover:outline-black transition-color duration-300 ease-in-out"
                >
                  ADD NEW PRODUCT{" "}
                  <MdAddBox
                    className="md:ml-2 ml-1 hover:font-extrabold"
                    size={20}
                  />
                </button>
                <div
                  onClick={() => {
                    setShowModel(!showModel);
                  }}
                  className={`absolute right-0 top-0 bg-black/80 w-full h-screen z-20 transition-all ease-in-out ${
                    !showModel && "hidden"
                  }`}
                ></div>
                {showModel && (
                  <AddNewFood
                    showModel={showModel}
                    setShowModel={setShowModel}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <h1 className="text-center md:text-3xl text-2xl font-extrabold m-10">
        NEW FOODS
      </h1>
      <DisplayFoodData />
      <div>
        <h1 className="text-center md:text-3xl text-2xl font-extrabold m-10">
          OUR HAPPY CUSTOMERS
        </h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 place-items-center gap-8 m-10">
          <CustomerReviews name="Sarah M." date="2023-09-28" />
          <CustomerReviews name="Alex K." date="2023-10-23" />
          <CustomerReviews name="James L." date="2023-10-12" />
          <CustomerReviews name="Maaz K." date="2023-11-18" />
        </div>
      </div>
      <div>
        <h1 className="text-center md:text-3xl text-2xl font-extrabold m-10">
          BEST SERVICES
        </h1>
        <div className="m-10 flex md:flex-row flex-col items-center justify-center gap-8">
          <BestServices
            icon={<FaShippingFast size={40} />}
            desc="Flavorify's prompt delivery ensures your pet arrives happy and healthy."
          />
          <BestServices
            icon={<RiSecurePaymentLine size={40} />}
            desc="Shop for your new furry friend with confidence using our safe and trusted payment system."
          />
          <BestServices
            icon={<MdSupportAgent size={40} />}
            desc="Flavorify: Your trusted source for pets, with round-the-clock, 24/7 support."
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
