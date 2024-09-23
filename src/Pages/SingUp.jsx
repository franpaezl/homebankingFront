import React from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/upload_img_17452219_08_16_2024_10_54_42_474900_6983826868170718299.jpeg";
import image2 from "../assets/frnlogo.png";
import SignUpForm from '../components/SingUpForm';

const SingUp = () => {
  return (
    <div className='flex'>
      <img src={image} alt="Background" className='w-[60%] h-screen object-cover' />
      <div className='bg-[#93ABBF] flex flex-col justify-center items-center w-[40%] p-4'>
        <div className='w-[130px] h-auto'>
          <img src={image2} alt="Logo" />
          <h1 className='text-center text-[13px] mt-[-2px] font-bold text-gray-800 mt-2'>Federal Nation Bank</h1>
        </div>
        <SignUpForm />
        <p className='text-xs'>or</p>
        <Link to="/sing-in" className='text-[#333333] underline text-[13px]'>Sing in</Link>
      </div>
    </div>
  );
};

export default SingUp;
