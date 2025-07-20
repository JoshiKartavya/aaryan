import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar absolute z-10 top-5 lg:px-8 xl:px-8 w-full h-max flex items-center justify-between px-8 bg-[var(--primary)] text-white font-satoshi">
      <div className='logo flex items-center gap-2 text-[16px]'>
        <span className="text-[var(--secondary)]">Aaryan</span>
        <span> | </span>
        <span className="text-[var(--secondary)] opacity-50">Portfolio</span>
      </div>
      <div className='hidden xl:block 2xl:block'>
        <div className="links flex flex-col items-start gap-1 text-[16px]">
          <p className='font-bold'>CONTACT</p>
          <a
            href="mailto:vishwakarmaaryan1003@gmail.com"
            className="hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            vishwakarmaaryan1003@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/aryanuiux/"
            className="hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <a
            href="https://discord.com/users/your-discord-id"
            className="hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar