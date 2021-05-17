import React from "react";
import pungcoinLogo from "../assets/pungcoin.png";
import etherLogo from "../assets/eth-logo.png";
const Main = ({ ethBalance, pungBalance }) => {
  return (
    <div>
      <form className="flex flex-col items-center justify-center max-w-md px-10 py-12 bg-white rounded-lg shadow-lg">
        <div className="w-96">
          <div className="flex justify-between">
            <label className="text-lg font-bold" htmlFor="input">
              Input
            </label>
            <h2 className="text-gray-600">
              Balance: {window.web3.utils.fromWei(ethBalance, "ether")}
            </h2>
          </div>

          <span className="flex mb-5 text-xs shadow-md">
            <input
              className="w-full p-2 px-3 text-sm text-gray-600 border border-gray-400 rounded-l rounded-r-none field"
              name="input"
              type="number"
            />
            <span className="flex items-center justify-center p-3 px-5 font-bold text-center text-gray-200 bg-gray-400 rounded-l-none rounded-r w-28">
              <img className="w-6 mr-1" src={etherLogo} alt="ether logo" />
              <h4>ETH</h4>
            </span>
          </span>
        </div>
        <div className="w-96">
          <div className="flex justify-between">
            <label className="text-lg font-bold" htmlFor="output">
              Output
            </label>
            <h2 className="text-gray-600">
              Balance: {window.web3.utils.fromWei(pungBalance, "ether")}
            </h2>
          </div>
          <span className="flex mb-2 text-xs shadow-md">
            <input
              className="w-full p-2 px-3 text-sm text-gray-600 bg-gray-300 border border-gray-400 rounded-l rounded-r-none field"
              name="output"
              type="number"
              value="0"
              disabled
            />
            <span className="flex items-center justify-center p-3 px-5 font-bold text-center text-gray-200 bg-gray-400 rounded-l-none rounded-r w-28">
              <img
                className="w-6 mr-1"
                src={pungcoinLogo}
                alt="pungcoin logo"
              />
              <h4> PUNG</h4>
            </span>
          </span>
        </div>
        <div className="flex justify-between w-full mb-4">
          <h2 className="text-gray-600">Exchange rate</h2>
          <h2 className="text-gray-600">1 ETH = 10000 PUNG</h2>
        </div>
        <button
          type="submit"
          className="w-full p-2 px-5 text-lg text-white bg-gray-700 rounded hover:bg-gray-600 btn"
        >
          SWAP
        </button>
      </form>
    </div>
  );
};

export default Main;
