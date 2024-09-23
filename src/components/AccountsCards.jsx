import React from 'react';
import { Link } from 'react-router-dom';

const AccountsCards = (props) => {
  return (
    <Link to={`http://localhost:5173/account/${props.id}`} className="block w-[30%]">
      <div className='flex flex-col items-center gap-3 p-6 bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg rounded-lg border border-gray-300 transform transition duration-300 hover:shadow-xl hover:scale-105 hover:border-gray-400'>
        <p className=' text-center text-xl font-bold text-gray-800'>Account Number:<br />  <span className=' text-lg text-blue-600'>{props.number}</span></p>
        <p className='text-lg text-gray-700'>Amount: <span className='font-medium text-green-600'>{props.amount}</span></p>
        <p className='text-sm text-gray-500'>Creation Date: {props.date}</p>
      </div>
    </Link>
  )
}

export default AccountsCards;
