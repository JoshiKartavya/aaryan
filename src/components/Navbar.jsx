import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar absolute z-10 lg:px-8 xl:px-8 w-full h-16 flex items-center justify-between px-8 bg-[var(--primary)] text-white">
      <div className='logo flex items-center gap-2'>
        <span className="text-[var(--secondary)]">Aaryan</span>
        <span> | </span>
        <span className="text-[var(--secondary)] opacity-50">Portfolio</span>
      </div>
    </div>
  )
}

export default Navbar