"use client";

import { FaStar } from "react-icons/fa6";

const BestServices = ({ icon, desc }) => {
  return (
    <div className="flex flex-col items-center justify-center md:w-[30%]">
      <h1 className="text-red-500">{icon}</h1>
      <h2 className="font-bold text-lg my-2">Fast Delivery</h2>
      <p className="text-center">{desc}</p>
    </div>
  );
};

export default BestServices;
