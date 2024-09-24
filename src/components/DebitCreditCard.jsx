import React from "react";
import image from "../assets/chip-removebg-preview.png";
import image2 from "../assets/letrafrn.png";

const DebitCreditCard = (props) => {
  return (
    <div
      className={`card flex flex-col w-[100%] text-white p-4 rounded-xl shadow-lg`}
      style={props.color} // Apply inline style here
    >
      <div className="flex justify-between items-center">
          <img src={image2} alt="Logo" className="w-[70px]" />
        <div className="flex flex-col items-center">
          <p className={`font-semibold ${props.textColor}`}>{props.cardType}</p>
        </div>
      </div>
        <img src={image} alt="Chip" className="w-[50px]" />
      <p className={`text-xl tracking-widest mb-4 ${props.textColor}`}>{props.number}</p>
      <p className={`text-xs mt-[-10px] ${props.textColor}`}>CVV: {props.cvv}</p>

      <div className="flex justify-between items-center">
        <p className={`font-semibold ${props.textColor}`}>{props.name}</p>
        <div>
          <p className="text-sm">Valid Thru</p>
          <p className={`${props.textColor}`}>{props.thru}</p>
        </div>
      </div>
    </div>
  );
};

export default DebitCreditCard;
