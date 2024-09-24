import React from "react";
import image from "../assets/chip-removebg-preview.png";
import image2 from "../assets/letrafen1.png";

const DebitCreditCard = (props) => {
  return (
    <div
      className={`card flex flex-col w-[100%] text-white p-4 rounded-xl shadow-lg`}
      style={props.color} // Apply inline style here
    >
      <div className="flex justify-between items-center">
        {/* Aplicamos rotación de 45 grados a image2 */}
        <img
          src={image2}
          alt="Logo"
          className="w-[70px]"
        />
          <p className={`font-semibold ${props.textColor}`}>{props.cardType}</p>
      </div>
      <img src={image} alt="Chip" className="w-[50px]" />
      <p className={`text-xl font-semibold tracking-widest ${props.textColor}`}>{props.number}</p>
      <p className={`text-xs ${props.textColor}`}>CVV: {props.cvv}</p>

      <div className="flex flex-col">
        <p className={`text-sm ${props.textColor}`}>Valid Thru: {props.thru}</p>
        <p className={`font-semibold text-xl ${props.textColor}`}>{props.name}</p>
      </div>
    </div>
  );
};

export default DebitCreditCard;
