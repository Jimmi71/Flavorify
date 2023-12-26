"use client";

import { FaStar } from "react-icons/fa6";

const CustomerReviews = ({ name, date }) => {
  return (
    <div className="p-3 lg: w-[250px] shadow shadow-gray-400 rounded-xl">
      <h1 className="font-bold text-red-500">{name}</h1>
      <h1 className="text-[12px] text-gray-500">{date}</h1>
      <div className="flex text-yellow-500 my-1">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit eius minus
        explicabo magni tenetur ullam sapiente esse tempora excepturi...
      </p>
    </div>
  );
};

export default CustomerReviews;
