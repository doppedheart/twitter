import React from 'react'
import {Link} from "react-router-dom"
const Error = () => {
  return (
    <div className='text-center my-8 space-y-5'>
        <h2 className='font-bold text-4xl'> Error ,page not found</h2>
        <p className="pb-2">please go back to login if no account created</p>
        <Link to="/signin" className='bg-blue-500 py-1 px-3 rounded-full text-white'>Login</Link>
    </div>
  )
}

export default Error