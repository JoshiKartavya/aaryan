import React from 'react'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-[var(--primary)] flex flex-col items-center justify-center font-satoshi relative">
        {/* Left side: Contact label */}
        <div className="flex flex-col justify-center items-start w-1/5 pl-8 absolute top-0 left-0">
          <span className="text-white font-bold tracking-wide text-base mb-2 uppercase">Contact <span className="ml-1">&rarr;</span></span>
        </div>
        <div className='w-[50%] flex flex-col items-end'>
          {/* Center: Main content */}
          <div className="flex flex-col items-start justify-center px-4">
            <h2 className="text-white text-[24px] md:text-2xl font-bold mb-4 w-2/4">
              Let’s talk. Even if it’s just about good design or bad coffee.<span className="font-normal">,</span>
            </h2>
            <h2 className="text-white text-[24px] md:text-2xl font-bold mb-4 w-2/4 flex items-center gap-8">
              &rarr; <span>vishwakarmaaryan1003@gmail.com</span>
            </h2>
          </div>
        </div>
        {/* FOOTER */}
        <Footer />
      </div>
    </>
  )
}

export default Contact