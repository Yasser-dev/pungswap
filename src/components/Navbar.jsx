import React from "react";
import Identicon from "identicon.js";
import PungSwapLogo from "../assets/pungswap.png";
const Navbar = ({ account }) => {
  return (
    <div className="mb-6 flex-column">
      <nav className="relative flex items-center justify-between w-full h-20 px-8 mx-auto align-middle bg-white shadow">
        <div className="flex items-center justify-between h-16">
          <img
            className="object-scale-down h-full"
            height="75px"
            src={PungSwapLogo}
            alt="PungSwap Logo"
          />
          <h1 className="ml-5 text-xl font-semibold text-gray-600">PungSwap</h1>
        </div>
        <div className="flex items-center justify-between h-16">
          <h2 className="text-xs font-semibold text-gray-400 md:text-base">
            {account}
          </h2>
          {account && (
            <img
              className="ml-2"
              src={`data:image/png;base64,${new Identicon(
                account,
                30
              ).toString()}`}
              alt="identicon"
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
