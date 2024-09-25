import React from "react";
import TransactionsForm from "../components/TransactionsForms";
import image from "../assets/upload_img_35349027_08_20_2024_14_03_29_890336_4628348994104959729.jpeg";

const Transactions = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-[50px] mt-[50px]">
      <div className="flex w-[80%] rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
        <TransactionsForm />
        <img src={image} alt="" className="w-[50%] object-cover" />
      </div>
    </div>
  );
};

export default Transactions;
