import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="flex text-white justify-between px-4 items-center pt-2">
        <div className="h-full font-bold hover:cursor-pointer flex items-cetner">
          {/* <img src="/imgs/logo.webp" alt="..." className="w-6 rounded-full" /> */}
          <span>/SOFO\</span>
        </div>
        <div className="h-full">
          <ul className="flex gap-10 inset-0 backdrop-blur-sm rounded-xl p-1">
            <li className="hover:cursor-pointer inset-0 backdrop-blur-md bg-opacity-white py-2 px-3 rounded-xl">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="hover:cursor-pointer py-2 px-3 rounded-lg">
              <NavLink to="/predict">Predict</NavLink>
            </li>
            <li className="hover:cursor-pointer py-2 px-3 rounded-lg">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="hover:cursor-pointer py-2 px-3 rounded-lg">
              <NavLink to="/support">Support</NavLink>
            </li>
          </ul>
        </div>
        <div className="flex px-4 py-[4px] items-center inset-0 backdrop-blur-sm hover:cursor-pointer rounded-xl">
          <span className="pb-[3px] pr-1 font-bold text-2xl items-center">
            =
          </span>
          <span className="pb-1 pt-1"> Menu</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
