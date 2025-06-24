import React from 'react'
import Navbar from '../components/Navbar'

const Hero = () => {
  return (
    <>
        <Navbar />
        <div className="main w-full h-screen flex items-center justify-center bg-[var(--primary)]">
            <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4 text-[var(--secondary)]">Hero section</h1>
            </div>
        </div>
    </>
  )
}

export default Hero