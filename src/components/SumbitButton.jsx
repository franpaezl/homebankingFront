import React from "react";
import { Link } from "react-router-dom";

const SumbitButton = (props) => {
  return (
    <div>
      <Link className="px-6 py-2 bg-[#023E73] text-white font-semibold rounded-lg shadow-md hover:bg-[#266288] focus:outline-none focus:ring-2 focus:ring-blue-400">
        {props.text}
      </Link>
    </div>
  );
};

export default SumbitButton;
