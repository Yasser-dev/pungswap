import { useState } from "react";

const Main = ({ children }) => {
  const [status, setStatus] = useState("buy");
  return (
    <div>
      <div className="flex justify-between mb-2">
        <button
          className={`inline-block  rounded shadow ripple px-6 py-2 text-xs font-medium leading-6 text-center text-black uppercase transition  ${
            status === "buy"
              ? "cursor-not-allowed bg-gray-300 outline-none"
              : "bg-gray-100 hover:shadow-lg hover:bg-gray-200 focus:outline-none"
          }`}
          onClick={() => {
            if (status == "sell") setStatus("buy");
          }}
        >
          Buy
        </button>
        <button onClick={() => setStatus(status === "buy" ? "sell" : "buy")}>
          ⇆
        </button>
        <button
          className={`inline-block  rounded shadow ripple px-6 py-2 text-xs font-medium leading-6 text-center text-black uppercase transition  ${
            status === "sell"
              ? "cursor-not-allowed bg-gray-300 outline-none"
              : "bg-gray-100 hover:shadow-lg hover:bg-gray-200 focus:outline-none"
          }`}
          onClick={() => {
            if (status == "buy") setStatus("sell");
          }}
        >
          Sell
        </button>
      </div>
      {status === "buy" ? children[0] : children[1]}
    </div>
  );
};

export default Main;
