import React, { useEffect, useState, useRef, useCallback } from 'react'
import sanityClient from '../sanityClient'
import { Link } from 'react-router-dom'

const CARD_WIDTH = 320 // px, matches w-80
const CARD_GAP = 32 // px, matches space-x-8 (8*4=32px)

const Project = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [dragging, setDragging] = useState(false)
  const scrollContainerRef = useRef(null)

  // For drag/slide
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    let isMounted = true
    sanityClient
      .fetch(
        `*[_type == "project"]{ 
          _id, 
          title, 
          slug,
          coverPhoto{asset->{url}}, 
          moreImages[]{asset->{url}}, 
          description, 
          category, 
          date
        } | order(order asc)`
      )
      .then((data) => {
        if (isMounted) {
          setProjects(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  // Scroll to the active card when activeIndex changes (only on desktop, not during drag)
  useEffect(() => {
    if (
      scrollContainerRef.current &&
      projects.length > 0 &&
      !isDragging.current
    ) {
      const scrollNode = scrollContainerRef.current
      const offset = (CARD_WIDTH + CARD_GAP) * activeIndex
      scrollNode.scrollTo({
        left: offset,
        behavior: 'smooth'
      })
    }
  }, [activeIndex, projects.length])

  // Drag/slide handlers
  const handleMouseDown = useCallback((e) => {
    if (!scrollContainerRef.current) return
    isDragging.current = true
    setDragging(true)
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft
    scrollLeft.current = scrollContainerRef.current.scrollLeft
    document.body.style.userSelect = 'none'
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = x - startX.current // px
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    setDragging(false)
    document.body.style.userSelect = ''
    // Snap to nearest card
    if (scrollContainerRef.current) {
      const scrollNode = scrollContainerRef.current
      const index = Math.round(
        scrollNode.scrollLeft / (CARD_WIDTH + CARD_GAP)
      )
      setActiveIndex(Math.max(0, Math.min(index, projects.length - 1)))
    }
  }, [projects.length])

  // Touch events for mobile
  const handleTouchStart = useCallback((e) => {
    if (!scrollContainerRef.current) return
    isDragging.current = true
    setDragging(true)
    startX.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
    scrollLeft.current = scrollContainerRef.current.scrollLeft
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current || !scrollContainerRef.current) return
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
    const walk = x - startX.current
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false
    setDragging(false)
    // Snap to nearest card
    if (scrollContainerRef.current) {
      const scrollNode = scrollContainerRef.current
      const index = Math.round(
        scrollNode.scrollLeft / (CARD_WIDTH + CARD_GAP)
      )
      setActiveIndex(Math.max(0, Math.min(index, projects.length - 1)))
    }
  }, [projects.length])

  // Keyboard navigation for accessibility
  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveIndex(index)
    }
  }

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => {
      if (prevIndex + 1 < projects.length) {
        return prevIndex + 1
      } else {
        return 0
      }
    })
  }, [projects.length])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--primary)] text-white">
        Loading projects...
      </div>
    )
  }

  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex
  const displayProject = projects[displayIndex]

  return (
    <>
      <div className="w-full min-h-screen bg-[var(--primary)] text-white flex flex-col justify-center font-satoshi p-8 sm:p-12 md:p-20 relative">
        {/* Top Left: PROJECTS label */}
        <div className="absolute top-12 left-12 sm:left-20">
          <span className="font-bold tracking-wide text-base uppercase">
            PROJECTS <span className="ml-1">&rarr;</span>
          </span>
        </div>

        {/* Top Left: Project Number */}
        {displayProject && (
          <div className="absolute top-24 left-12 sm:left-20">
            <span className="text-lg">
              {String(displayIndex + 1).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col mt-20 xl:mt-6">
          {/* Image Row */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-auto py-4 hide-scrollbar select-none"
            style={{
              minHeight: '28rem',
              alignItems: 'flex-end',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              overflowY: 'hidden',
              scrollBehavior: 'smooth',
              cursor: isDragging.current ? 'grabbing' : 'grab',
              WebkitOverflowScrolling: 'touch'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
            aria-label="Project carousel"
          >
            {/* Hide scrollbar for Chrome, Safari and Opera */}
            <style>
              {`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .project-img-zoom {
                  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
                }
                .project-img-zoom-active {
                  transform: scale(1.05);
                }
                @media (hover: none) {
                  .group:hover .project-img-zoom {
                    transform: scale(1);
                  }
                }
              `}
            </style>
            <div className="flex space-x-8 w-full">
              {projects.map((project, index) => {
                // Determine if this card should have the zoom effect
                const isActive = index === activeIndex
                const isHovered = index === hoveredIndex
                // Zoom if active or hovered
                const zoomClass =
                  isActive || isHovered
                    ? 'project-img-zoom project-img-zoom-active'
                    : 'project-img-zoom'
                return (
                  <Link
                    to={`/project/${project.slug?.current || ''}`}
                    key={project._id || index}
                    tabIndex={-1}
                    aria-label={`Go to project: ${project.title}`}
                    draggable={false}
                    onClick={e => {
                      if (dragging) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <div
                      className={`flex-shrink-0 w-[320px] xl:w-[364px] h-[410px] xl:h-[544px] relative group transition-shadow duration-300 ease-in-out overflow-hidden`}
                      style={{
                        zIndex: isActive ? 2 : 1,
                        boxShadow: isActive
                          ? '0 8px 32px 0 rgba(0,0,0,0.25)'
                          : 'none',
                        transition: 'box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)'
                      }}
                      onClick={e => {
                        if (dragging) {
                          e.preventDefault()
                          return
                        }
                        setActiveIndex(index)
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View project ${project.title}`}
                      onKeyDown={e => handleKeyDown(e, index)}
                    >
                      <img
                        src={project.coverPhoto?.asset?.url || ''}
                        alt={project.title || 'Project cover'}
                        className={`w-full h-full object-cover cursor-pointer ${zoomClass}`}
                        draggable={false}
                        style={{
                          pointerEvents: 'auto',
                          userSelect: 'none'
                        }}
                        onMouseDown={e => e.preventDefault()}
                      />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Project Details */}
          {displayProject && (
            <div className="mt-6 flex justify-between items-end transition-opacity duration-500 opacity-100">
              <div className="w-4/5">
                <h2 className="text-[16px] font-bold uppercase">
                  {displayProject.title}{' '}
                  <span className="font-normal normal-case">
                    | {displayProject.category}
                  </span>
                </h2>
                <p className="text-base hidden md:block lg:block xl:block 2xl:block text-gray-400 mt-1">
                  {displayProject.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleNext}
                  className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors"
                  aria-label="Next Project"
                  type="button"
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