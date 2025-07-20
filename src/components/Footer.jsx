import React from 'react'

const Footer = () => {
  return (
    <>
        <div className="footer w-full h-max bg-transparent text-[var(--secondary)] font-satoshi flex flex-row items-center justify-between py-8 px-8 absolute z-20 bottom-0 left-0">
        <a
            href="https://www.linkedin.com/in/aryanuiux/"
            className="hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <a
            href="https://discord.com/users/irubix_"
            className="hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          <button
            className="hover:underline transition-colors focus:outline-none"
            style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
            onClick={() => {
              const hero = document.getElementById('hero');
              if (hero) {
                hero.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            aria-label="Scroll to top"
          >
            <h1>TOP &#8593;</h1>
          </button>
        </div>
    </>
  )
}

export default Footer