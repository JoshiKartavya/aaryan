import React, { useEffect } from 'react'
import { Hero, About, Project, Contact } from './sections'

const App = () => {
  useEffect(() => {
    document.title = "Aryan's Portfolio"
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Project />
      <Contact />
    </>
  )
}

export default App