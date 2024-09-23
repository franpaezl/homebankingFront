import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {


  return (
    <nav className='flex flex-row w-[70%] justify-evenly'>
    <Link to="/account" className="inline-block rounded bg-[#023E73] px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500" href="#"
  >Accounts</Link>
      <Link to="/cards" className="inline-block rounded bg-[#023E73] px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500" href="#"
  >Cards</Link>
      <Link to="/loans" className="inline-block rounded bg-[#023E73] px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500" href="#"
  >Loans</Link>
      <Link to="transactions" className="inline-block rounded bg-[#023E73] px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500" href="#"
  >Transactions</Link>




    </nav>
  )
}

export default Navbar
