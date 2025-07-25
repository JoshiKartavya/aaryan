import React from 'react'
import Navbar from '../components/Navbar'
import '../index.css'

const Hero = () => {
  return (
    <>
        <Navbar />
        <div id='hero' className="main w-full h-screen flex items-center justify-center bg-[var(--primary)] font-satoshi relative">
            <img src="./grad1.jpg" alt="graddient" className=' absolute z-10 left-[-5%] top-[30%] h-[420px] xl:h-[720px] blur-[60px] xl:blur-[100px]'/>
            <div className="text-center text-[var(--secondary)] uppercase text-[32px] xl:text-[64px] absolute z-20">
                <h1 className="mb-4 leading-[1]">Crafting</h1>
                <div className="mb-4 flex items-center justify-center flex row leading-[1]">
                    <h2>experience</h2>
                    <div>
                      <span className=" text-[18px] xl:text-[38px] border-[0.4px] border-[var(--secondary)] ml-2  px-2 py-1 rounded-[20px]">🙂😊</span>
                    </div>
                </div>
                <h1 className="mb-4 leading-[1]">for humans</h1>
            </div>
        </div>
    </>
  )
}

export default Hero