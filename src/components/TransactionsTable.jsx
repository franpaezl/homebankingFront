import React from "react";

const TransactionsTables = (props) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className={`py-2 px-4 ${props.color}`}>{props.type}</td>
      <td className="py-2 px-4 text-gray-700 text-right">{props.amount}</td>
      <td className="py-2 px-4 text-gray-700">{props.date}</td>
      <td className="py-2 px-4 text-gray-700">{props.description}</td>
    </tr>
  );
};

export default TransactionsTables;
