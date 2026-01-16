import React from 'react'
import { Toaster } from "react-hot-toast";

function home() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <h1 className="text-3xl font-bold">This is the Landing Page</h1>
      <Toaster/>
    </div>
  )
}

export default home
