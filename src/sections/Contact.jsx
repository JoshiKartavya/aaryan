import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import sanityClient from '../sanityClient'

const Contact = () => {
  const [hovered, setHovered] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [resumeUrl, setResumeUrl] = useState(null)

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "resume"][0]{file{asset->{url}}}`
    ).then((data) => {
      setResumeUrl(data?.file?.asset?.url)
    })
  }, [])

  const handleDownload = async () => {
    setDownloading(true)
    try {
      // Fetch the PDF from Sanity
      const response = await fetch(resumeUrl)
      if (!response.ok) throw new Error('Network response was not ok')
      const blob = await response.blob()
      // Create a link and trigger download
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Aryan_Vishwakarma_Resume.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      alert('Failed to download resume. Please try again later.')
    }
    setDownloading(false)
  }

  return (
    <>
      <div className="max-w-screen min-h-screen bg-[var(--primary)] flex flex-col items-center justify-center font-satoshi relative overflow-y-hidden overflow-x-hidden">
        {/* Left side: Contact label */}
        <div className="flex flex-col justify-center items-start w-max pl-8 absolute top-0 left-0">
          <span className="text-white font-bold tracking-wide text-base mb-2 uppercase">Contact <span className="ml-1">&rarr;</span></span>
        </div>

        {/* Gradient Background */}
        <img src="./grad2.jpg" alt="graddient" className=' absolute z-10 left-[30%] xl:left-[10%] rotate-270 xl:rotate-0 bottom-[-10%] h-[420px] xl:w-[1520px] blur-[60px] xl:blur-[100px]'/>
        
        <div className='w-full xl:w-[50%] xl:px-0 flex flex-col items-end pl-0 xl:pl-[40px]'>
          {/* Center: Main content */}
          <div className="flex flex-col px-6 items-start justify-center w-full">
            <h2 className="text-white text-[16px] md:text-[20px] lg:text-[20px] xl:text-[24px] font-bold mb-4 w-full xl:w-2/4">
              Let's talk. Even if it's just about good design or bad coffee.<span className="font-normal">,</span>
            </h2>
            <a
              href="mailto:vishwakarmaaryan1003@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-[12px] md:text-[16px] lg:text-[16px] xl:text-[18px] mb-4 w-full xl:w-2/4 flex items-center gap-2 xl:gap-8">
              &rarr; 
              <span className='hover:underline transition-colors text-[16px] md:text-[28px] lg:text-[28px] xl:text-[34px] font-bold'>vishwakarmaaryan1003@gmail.com</span>
            </a>
            <button
              className={`
                transition-all duration-300 ease-in-out
                text-[12px] md:text-[16px] lg:text-[16px] xl:text-[18px]
                flex gap-3 border-[0.5px] rounded-[65px] py-[16px] px-[22px]
                font-satoshi font-medium
                ${hovered
                  ? 'bg-[var(--secondary)] text-[var(--primary)] border-[var(--primary)]'
                  : 'bg-[var(--primary)] text-white border-white shadow-none'
                }
                cursor-pointer
                outline-none
                active:scale-95
              `}
              style={{
                boxShadow: hovered
                  ? '0 4px 24px 0 rgba(0,0,0,0.10)'
                  : 'none',
                transition: 'background 0.3s, color 0.3s, border 0.3s, transform 0.2s'
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleDownload}
              disabled={downloading || !resumeUrl}
              aria-label="Download Resume"
            >
              <span
                className={`
                  transition-transform duration-300
                `}
                style={{
                  display: 'inline-block',
                  transition: 'transform 0.3s'
                }}
              >
                &darr;
              </span>
              <span>
                {downloading ? 'Downloading...' : 'Download Resumé'}
              </span>
            </button>
          </div>
        </div>
        {/* FOOTER */}
        <Footer />
      </div>
    </>
  )
}

export default Contact