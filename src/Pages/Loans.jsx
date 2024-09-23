import React from 'react';
import image from "../assets/upload_img_35349027_08_19_2024_08_23_09_276376_1495715083137121959.jpeg";
import LoansForm from '../components/LoansForm';

const Loans = () => {
  return (
    <div className="flex justify-center">
      <div className="flex h-auto w-[80%] my-[50px] items-center rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
        <LoansForm />
        <img src={image} alt="Loan" className="w-[50%] h-[100%] object-cover" />
      </div>
    </div>
  );
};

export default Loans;
