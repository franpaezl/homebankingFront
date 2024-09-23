import React from "react";
import { Link } from "react-router-dom";

const IconsFooter = () => {
  return (
    <div className="w-[50%] flex justify-center space-x-4">
      <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-instagram text-4xl"></i>
      </Link>
      <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-facebook text-4xl"></i>
      </Link>
      <Link to="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-whatsapp text-4xl"></i>
      </Link>
    </div>
  );
};

export default IconsFooter;
