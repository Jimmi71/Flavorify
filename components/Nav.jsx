"use client";

import Link from "next/link";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { SmMenuComp } from "./SmallScreen";
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSearchData } from "@/redux/slices/searchSlice";

const Nav = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const cartData = useSelector((state) => state.cartData);
  const disptach = useDispatch();

  useEffect(() => {
    disptach(getSearchData(searchData));
  }, [searchData]);

  return (
    <div>
      <div className="lg:px-5 sm:px-8 px-3 flex justify-between items-center text-black bg-blue-200 h-[45px] fixed z-20 w-full py-7">
        <div className="flex items-center justify-center mr-2">
          <AiOutlineMenu
            className="sm:hidden text-red-600 mr-1"
            size={25}
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
          {<SmMenuComp showMenu={showMenu} setShowMenu={setShowMenu} />}
          <h2 className="my-2 font-extrabold lg:text-2xl text-xl cursor-pointer text-red-500">
            <Link href="/">FLAVORIFY</Link>
          </h2>
        </div>
        <div className="mx-5 sm:flex hidden">
          <ul className="flex md:text-[15px] text-[13px] font-bold">
            <li className="lg:mx-[25px] mx-3 cursor-pointer  hover:text-red-500">
              <Link href="/">HOME</Link>
            </li>
            <li className="lg:mx-[25px] mx-3 cursor-pointer hover:text-red-500">
              <Link href="/pages/shop">SHOP</Link>
            </li>
            <li className="lg:mx-[25px] mx-3 cursor-pointer  hover:text-red-500">
              <Link href="/pages/about">ABOUT</Link>
            </li>
            <li className="lg:mx-[25px] mx-3 cursor-pointer  hover:text-red-500">
              <Link href="/pages/contact">CONTACT</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          {session ? (
            <div className="flex items-center justify-center">
              <Link href="/pages/cart">
                <div className="relative">
                  <BsCart2
                    size={25}
                    className="md:ml-4 sm:ml-3 ml-2 cursor-pointer  hover:text-red-500 duration-300 transition-color ease-in-out"
                  />
                  <span className="top-[-2px] right-[-2px] absolute bg-blue-600 text-white px-1 rounded-full text-xs">
                    {!cartData || cartData.quantity === 0
                      ? null
                      : cartData.quantity}
                  </span>
                </div>
              </Link>
              <Link href="/pages/profile/private">
                <FaRegUser
                  size={22}
                  className="md:mx-4 sm:mx-3 mx-2 text-black cursor-pointer hover:text-red-500 duration-300 transition-color ease-in-out"
                />
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-blue-50 rounded-xl py-1 px-2 hover:bg-transparent hover:outline hover:outline-1 hover:outline-black hover:text-black duration-300 transition-color ease-in-out"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center lg:ml-0 md:ml-5 ml-2">
              <Link href="/pages/register">
                <button className="md:mr-2 bg-red-500 text-blue-50 rounded-xl py-1 px-2 hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black duration-300 transition-color ease-in-out">
                  Register
                </button>
              </Link>
              <Link href="/pages/login">
                <button className=" text-black rounded-xl py-1 px-2 hover:text-red-500 hover:text-bold duration-300 transition-color ease-in-out">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
