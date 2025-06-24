import React, { useEffect, useState, useRef } from 'react'
import sanityClient from '../sanityClient'

const CARD_WIDTH = 320; // px, matches w-80
const CARD_GAP = 32; // px, matches space-x-8 (8*4=32px)

const Project = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Fetch projects in ascending order (oldest first)
    sanityClient.fetch(`*[_type == "project"]{ 
      _id, 
      title, 
      coverPhoto{asset->{url}}, 
      moreImages[]{asset->{url}}, 
      description, 
      category, 
      date
    } | order(date asc)`).then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  // Scroll to the active card when activeIndex changes
  useEffect(() => {
    if (scrollContainerRef.current && projects.length > 0) {
      const scrollNode = scrollContainerRef.current;
      const offset = (CARD_WIDTH + CARD_GAP) * activeIndex;
      scrollNode.scrollTo({
        left: offset,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, projects.length]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex + 1 < projects.length) {
        return prevIndex + 1;
      } else {
        return 0;
      }
    });
  };

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center bg-[var(--primary)] text-white">Loading projects...</div>
  }

  const activeProject = projects[activeIndex];

  return (
    <>
      <div className='w-full min-h-screen bg-[var(--primary)] text-white flex flex-col justify-center font-satoshi p-8 sm:p-12 md:p-20 relative'>
        {/* Top Left: PROJECTS label */}
        <div className="absolute top-12 left-12 sm:left-20">
          <span className="font-bold tracking-wide text-base uppercase">PROJECTS <span className="ml-1">&rarr;</span></span>
        </div>

        {/* Top Left: Project Number */}
        {activeProject && (
          <div className="absolute top-24 left-12 sm:left-20">
            <span className="text-lg">0{activeIndex + 1}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col mt-6">
          {/* Image Row */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-hidden py-4 hide-scrollbar"
            style={{
              minHeight: '28rem',
              alignItems: 'flex-end',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              overflowY: 'hidden',
              scrollBehavior: 'smooth'
            }}
            // Remove all pointer events for scrolling
            onWheel={e => e.preventDefault()}
            onTouchMove={e => e.preventDefault()}
            onScroll={e => {
              // Prevent manual scroll
              if (scrollContainerRef.current) {
                const offset = (CARD_WIDTH + CARD_GAP) * activeIndex;
                scrollContainerRef.current.scrollTo({
                  left: offset,
                  behavior: 'auto'
                });
              }
            }}
          >
            {/* Hide scrollbar for Chrome, Safari and Opera */}
            <style>
              {`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}
            </style>
            <div className="flex space-x-8 w-full">
              {projects.map((project, index) => (
                <div
                  key={project._id}
                  className={`flex-shrink-0 transition-transform duration-300 ease-in-out w-80 h-[28rem] relative`}
                  style={{
                    zIndex: index === activeIndex ? 2 : 1,
                    transform: index === activeIndex
                      ? 'scale(1.15) translateY(-1.5rem)'
                      : 'scale(1) translateY(0)',
                    boxShadow: index === activeIndex
                      ? '0 8px 32px 0 rgba(0,0,0,0.25)'
                      : 'none',
                    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)'
                  }}
                  // Remove onMouseEnter for movement, just keep hover effect
                >
                  <img
                    src={project.coverPhoto?.asset?.url}
                    alt={project.title}
                    className="w-full h-full object-cover cursor-pointer rounded-lg"
                    draggable={false}
                    style={{
                      pointerEvents: 'none',
                      userSelect: 'none'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          {activeProject && (
            <div className="mt-6 flex justify-between items-end transition-opacity duration-500 opacity-100">
              <div className="w-4/5">
                <h2 className="text-xl font-bold uppercase">{activeProject.title} | <span className="font-normal normal-case">{activeProject.category}</span></h2>
                <p className="text-base text-gray-400 mt-1">{activeProject.description}</p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleNext}
                  className="w-16 h-16 border border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors"
                  aria-label="Next Project"
                >
                  &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Project