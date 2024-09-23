import React from 'react';
import IconsFooter from './IconsFooter';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#023E73] text-white p-4 flex">
      <p className='w-[50%] text-center'>© 2024 - All rights reserved. <a href="https://www.linkedin.com/feed/" target='_blank' className=''>Francisco Páez Lastra</a></p>
      <IconsFooter/>
    </footer>
  );
};

export default Footer;
