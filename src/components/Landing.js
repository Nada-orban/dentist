'use client'
import React from 'react'
import { FaPhoneAlt, FaArrowRight } from "react-icons/fa";

function Landing() {
  return (
    <div className='relative  overflow-hidden'>
      <div className='absolute bottom-14 md:bottom-1/4 left-3 md:left-10 z-10 text-white flex flex-col gap-3'>
        <h1 className='font-bold text-md md:text-3xl '>Your Smile Starts Here</h1>
        <div className='flex  flex-col justify-start '>
          <button className='flex justify-start items-start gap-2  md:gap-3 '>
            <div className='border-2 border-white p-1 md:p-2   rounded-full'><FaPhoneAlt /></div>
            <div><p className='text-lg md:text-2xl  '> 01032946286</p></div>
          </button>
        </div>
        <button className='bg-[#C5B069]  h-10 px-4 py-2 w-fit rounded-full text-start  gap-2 overflow-hidden '>
          <p className='flex justify-start items-center gap-3 group  '>Book Here<span className='  group-hover:transform group-hover:transition-transform group-hover:duration-500  group-hover:translate-x-12'><FaArrowRight /></span></p>

        </button>
      </div>
      <img src="/images/pexels-fr3nks-305564.jpg" alt='' className='w-full h-[100vh]  object-cover relative -z-10 md:hidden ' />
      <video src={require('../../public/videos/original_Practice_Tour_V1-HB.mp4')} autoPlay muted loop className='w-full   h-auto object-cover relative -z-10 hidden md:block ' />
      <div className="absolute inset-0 bg-black bg-opacity-25  "></div>

    </div>
  )
}

export default Landing
