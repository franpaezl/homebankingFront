import React from "react";
import image from "../assets/upload_img_58506141_08_19_2024_14_20_13_042517_8532168832631776792.jpeg";
import CardForm from "../components/CardForm";

const SolicitCard = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-[80%] my-[30px] items-center rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.7)]">
        <CardForm />
        <img src={image} alt="" className="w-[50%] object-cover" />
      </div>
    </div>
  );
};

export default SolicitCard;
