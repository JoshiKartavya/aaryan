import React from 'react'

const About = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--primary)] flex flex-col items-center justify-center font-satoshi relative">
      {/* Left side: ABOUT label */}
      <div className="flex flex-col justify-center items-start w-1/5 pl-8 absolute top-0 left-0">
        <span className="text-white font-bold tracking-wide text-base mb-2 uppercase">ABOUT <span className="ml-1">&rarr;</span></span>
      </div>
      <div className='w-[50%] flex flex-col items-end'>
        {/* Center: Main content */}
        <div className="flex flex-col items-start justify-center px-4">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-4">
            Hey, I'm Aryan Vishwakarma<span className="font-normal">,</span>
            <span className="font-normal"> a UI/UX designer based in Indore, India. I craft experiences that feel natural, human, and meaningful. I began my design journey in 2022, and since then, I've had the chance to work with startups and individual clients across a variety of projects. What excites me most is working on ideas that bring something fresh to the table — concepts that aim to shape or inspire the way people experience the world. I'm all about design with purpose, not just visuals.</span>
          </h2>
        </div>
        {/* Right: Image and caption */}
        <div className="flex flex-row-reverse items-end w-[60%]">
          <img src="/aaryan.jpg" alt="Aryan Vishwakarma" className="rounded-md w-full max-w-xs object-cover mb-4" />
          <div className="text-center pb-4 mr-4">
            <div className="text-white text-[16px] font-satoshi">UI/UX Designer</div>
            <div className="text-gray-400 text-[16px] font-satoshi">(Indore, India)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About