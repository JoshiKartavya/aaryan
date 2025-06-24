import React from 'react'
import Navbar from '../components/Navbar'
import '../index.css'

const Hero = () => {
  return (
    <>
        <Navbar />
        <div className="main w-full h-screen flex items-center justify-center bg-[var(--primary)] font-satoshi">
            <div className="text-center text-white text-[48px]">
                <h1 className="text-5xl mb-4 text-[var(--secondary)] uppercase">Crafting</h1>
                <h1 className="text-5xl mb-4 text-[var(--secondary)] flex ">experience
                    <div><span className="border-1 border-[var(--secondary)] ml-2  px-2 py-1 rounded-lg">🙂😊</span></div>
                </h1>
                <h1 className="text-5xl mb-4 text-[var(--secondary)]">for humans</h1>
            </div>
        </div>
    </>
  )
}

export default Hero