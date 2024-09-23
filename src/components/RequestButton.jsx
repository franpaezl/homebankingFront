import React from "react";
import { Link } from "react-router-dom";

const RequestButton = () => {

  return (
    <div className="flex w-[20%]">
      <Link
        className="h-[50px] group relative inline-flex items-center overflow-hidden rounded bg-[#023E73] px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
        href="#"
      >
        <span className="absolute -start-full transition-all group-hover:start-4">
          <svg
            className="size-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>

        <span className="text-sm font-medium transition-all group-hover:ms-4">
          Request Account
        </span>
      </Link>
      </div>
  );
};

export default RequestButton;
