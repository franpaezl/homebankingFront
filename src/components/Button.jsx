import React from 'react'
import { Link } from 'react-router-dom'

const Button = (props) => {
  return (
    <div>
      <Link className="inline-block rounded bg-[#023E73] px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500" href="#"
  >{props.title}</Link>
    </div>
  )
}

export default Button
