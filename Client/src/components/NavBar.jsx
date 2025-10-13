import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [mobileMenu, setmobileMenu] = useState(false);
  const closeMobileMenu = () => {
    setmobileMenu(false);
  };
  return (
    <>
      <div className="h-16 w-full flex justify-between px-4 items-center text-2lg bg-amber-200">
        <div className="">
          <Link to="/" className="font-bold text-xl">
            House
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="list-none flex gap-4">
            <li className="hover:bg-amber-500 p-1 rounded cursor-pointer">
              <Link to="/auth">Login</Link>
            </li>
            <li className="hover:bg-amber-500 p-1 rounded cursor-pointer">
              <Link to="/">About </Link>
            </li>
            <li className="hover:bg-amber-500 p-1 rounded cursor-pointer">
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Button to enable mobileMenu   */}
        <button
          className="md:hidden flex flex-col gap-1 items-center justify-center"
          onClick={() => setmobileMenu(!mobileMenu)}
        >
          <span
            className={`h-0.5 w-6 bg-black border rounded-2xl transition-all duration-300 ${
              mobileMenu ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-black border rounded-2xl transition-all duration-300 ${
              mobileMenu ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-black border rounded-2xl transition-all duration-300 ${
              mobileMenu ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>

        {/* mobile menu */}
        {mobileMenu && (
          <div className="absolute p-4 z-10 top-16 right-2 w-1/2 rounded-2xl bg-amber-400">
            <ul className="list-none flex flex-col gap-4">
              <li className="hover:bg-amber-500 p-1 rounded cursor-pointer" onClick={closeMobileMenu}>
                <Link to="/auth">Login</Link>
              </li>
              <li className="hover:bg-amber-500 p-1 rounded cursor-pointer" onClick={closeMobileMenu}>
                <Link to="/">About </Link>
              </li>
              <li className="hover:bg-amber-500 p-1 rounded cursor-pointer" onClick={closeMobileMenu}>
                <Link to="/">Contact</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
