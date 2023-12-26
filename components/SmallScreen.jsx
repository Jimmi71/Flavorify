import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

export const SmMenuComp = ({ showMenu, setShowMenu }) => {
  return (
    <div className="sm:hidden">
      <div
        onClick={() => {
          setShowMenu(!showMenu);
        }}
        className={`absolute top-0 right-[-100%] bg-black/80 w-[100%] h-screen z-20 duration-300 transition-all ease-in-out ${
          showMenu && "right-[0%]"
        }`}
      ></div>
      <ul
        className={`text-red-500 absolute text-[15px] top-0 bg-blue-100 left-[-100%] w-[70%] h-[100vh] z-20 px-4 font-bold duration-300 transition-all ease-in-out ${
          showMenu && "left-[0%]"
        }`}
      >
        <RxCrossCircled
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          size={25}
          className="absolute top-3 cursor-pointer right-3 hover:text-black text-red-500"
        />
        <li className="p-1 hover:text-black cursor-pointer mx-6 my-10 mt-[30px]">
          <Link
            href="/"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            HOME
          </Link>
        </li>
        <li className="p-1 hover:text-black cursor-pointer mx-6 my-10">
          <Link
            href="/pages/shop"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            SHOP
          </Link>
        </li>
        <li className="p-1 hover:text-black cursor-pointer mx-6 my-10">
          <Link
            href="#"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            ABOUT
          </Link>
        </li>
        <li className="p-1 hover:text-black cursor-pointer mx-6 my-10">
          <Link
            href="#"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            CONTACT
          </Link>
        </li>
      </ul>
    </div>
  );
};
