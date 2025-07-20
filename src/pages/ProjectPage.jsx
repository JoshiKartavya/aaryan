import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import sanityClient from '../sanityClient'

// Portable Text renderer for Sanity rich text blocks
// Now accepts projectName prop for highlighting
function PortableText({ blocks, projectName }) {
    if (!Array.isArray(blocks)) return null

    // Helper to highlight project name in a string (only the word, not the whole paragraph)
    function highlightProjectName(text) {
        if (!projectName || typeof text !== 'string' || !text.toLowerCase().includes(projectName.toLowerCase())) {
            return text
        }
        // Split and wrap all occurrences (case-insensitive)
        const regex = new RegExp(`(${projectName})`, 'gi')
        const parts = text.split(regex)
        return parts.map((part, idx) =>
            part.toLowerCase() === projectName.toLowerCase() ? (
                <span
                    key={idx}
                    style={{
                        color: '#ffffff',
                        fontWeight: 700,
                    }}
                >
                    {part}
                </span>
            ) : (
                part
            )
        )
    }

    // Helper to render marks (bold, italic, underline, highlight)
    function renderMarks(children, marks, markDefs) {
        if (!marks || marks.length === 0) return children

        return marks.reduce((acc, mark) => {
            if (mark === 'strong') {
                return <strong>{acc}</strong>
            }
            if (mark === 'em') {
                return <em>{acc}</em>
            }
            if (mark === 'underline') {
                return <u>{acc}</u>
            }
            // Handle highlight annotation
            const highlightDef = markDefs?.find(def => def._key === mark && def._type === 'highlight')
            if (highlightDef) {
                return <span style={{ background: highlightDef.color || '#ffe066', borderRadius: '0.2em', padding: '0.1em 0.2em' }}>{acc}</span>
            }
            return acc
        }, children)
    }

    return (
        <>
            {blocks.map((block, idx) => {
                if (block._type === 'block') {
                    // Render children with marks, and highlight project name in the output
                    return (
                        <p
                            key={block._key || idx}
                            style={{
                                marginBottom: '1em',
                            }}
                        >
                            {block.children.map((child, cidx) => {
                                if (child._type === 'span') {
                                    // If this child contains the project name, highlight it
                                    if (
                                        projectName &&
                                        typeof child.text === 'string' &&
                                        child.text.toLowerCase().includes(projectName.toLowerCase())
                                    ) {
                                        return (
                                            <React.Fragment key={child._key || cidx}>
                                                {renderMarks(
                                                    highlightProjectName(child.text),
                                                    child.marks,
                                                    block.markDefs
                                                )}
                                            </React.Fragment>
                                        )
                                    } else {
                                        return (
                                            <React.Fragment key={child._key || cidx}>
                                                {renderMarks(child.text, child.marks, block.markDefs)}
                                            </React.Fragment>
                                        )
                                    }
                                }
                                // fallback for unknown child types
                                return null
                            })}
                        </p>
                    )
                }
                // fallback for unknown block types
                return null
            })}
        </>
    )
}

const ProjectPage = () => {
    // Use slug from URL params instead of id
    const { projectId: projectSlug } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)

    // Set custom tab title when project loads
    useEffect(() => {
        if (project && project.title) {
            document.title = `${project.title} | Project`;
        } else {
            document.title = 'Project | Portfolio';
        }
    }, [project]);

    useEffect(() => {
        // Fetch project by slug, not id
        if (!projectSlug) {
            setLoading(false)
            setProject(null)
            return
        }
        const query = `*[_type == "project" && slug.current == $slug][0]{
            title,
            coverPhoto{asset->{url}},
            description,
            category,
            role,
            team,
            toolsUsed,
            timeline,
            introduction,
            designDecisions,
            researching,
            launchAndResults,
            finalDesignGlimpse[]{asset->{url}}
        }`
        sanityClient.fetch(query, { slug: projectSlug }).then((data) => {
            setProject(data)
            setLoading(false)
        }).catch(() => {
            setProject(null)
            setLoading(false)
        })
    }, [projectSlug])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--primary)]">
                <span className="text-white text-xl">Loading...</span>
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--primary)]">
                <span className="text-white text-xl">Project not found.</span>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col w-full bg-[var(--primary)] text-[var(--secondary)] relative font-satoshi">
            <Navbar />
            <main className=" flex-1 w-full flex flex-col items-center xl:mt-26 px-4 md:px-12 xl:px-32 py-8 mb-12">
                <div className='w-full flex flex-col xl:flex-row gap-8 items-center justify-between'>
                    {/* Project Header */}
                    <div className="w-full flex flex-col gap-2 my-8">
                        <div className="flex flex-row items-center justify-start gap-4 mb-4">
                            <button
                                onClick={() => window.history.back()}
                                className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors"
                                aria-label="Next Project"
                            >
                                &larr;
                            </button>
                            <h1 className='text-white font-bold text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px]'>{project.title}</h1>
                        </div>
                        <h1 className="text-[#7e7e7e] text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] uppercase">
                            {project.category}
                        </h1>
                        <h1 className="text-white text-[28px] md:text-[36px] lg:text-[44px] xl:text-[54px] font-bold">
                            {project.title}
                        </h1>
                        <p className="text-white text-[14px] md:text-[18px] lg:text-[20px] xl:text-[22px] italic max-w-2xl">
                            "{project.description}"
                        </p>
                    </div>

                    {/* Meta Info */}
                    <div className="w-full flex flex-wrap gap-12 mb-8 text-white text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px]">
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <div className="font-thin text-[#7e7e7e]">MY ROLE</div>
                            <div
                                className='text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-light flex flex-col gap-2'
                            >{Array.isArray(project.role) && project.role.map((r, i) => <div key={i}>{r}</div>)}</div>
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <div className="font-thin text-[#7e7e7e]">TEAM</div>
                            <div
                                className='text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-light flex flex-col gap-2'
                            >{project.team}</div>
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <div className="font-thin text-[#7e7e7e]">TOOLS USED</div>
                            <div
                                className='text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-light flex flex-col gap-2'
                            >{Array.isArray(project.toolsUsed) && project.toolsUsed.map((tool, i) => <div key={i}>{tool}</div>)}</div>
                        </div>
                        <div className='flex flex-col justify-start items-start gap-2'>
                            <div className="font-thin text-[#7e7e7e]">TIMELINE</div>
                            <div
                                className='text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-light flex flex-col gap-2'
                            >{project.timeline}</div>
                        </div>
                    </div>
                </div>

                <hr className='w-full border-white border-2' />

                <div className='xl:w-2/3 flex flex-col gap-8'>
                    {/* Section: Introduction */}
                    <SectionBlock
                        label="INTRODUCTION"
                        content={project.introduction}
                        projectName={project.title}
                    />

                    {/* Section: Design Decisions */}
                    <SectionBlock
                        label="DESIGN DECISIONS"
                        content={project.designDecisions}
                        projectName={project.title}
                    />

                    {/* Section: Researching */}
                    <SectionBlock
                        label="RESEARCHING"
                        content={project.researching}
                        projectName={project.title}
                    />

                    {/* Section: Launch & Results */}
                    <SectionBlock
                        label="LAUNCH & RESULTS"
                        content={project.launchAndResults}
                        projectName={project.title}
                    />
                </div>

                {/* Section: Final Design Glimpse */}
                <div className="w-full mt-12">
                    <div className="text-white font-bold text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px] mb-4">
                        &rarr; FINAL DESIGN GLIMPSE
                    </div>
                    <div className="flex flex-wrap gap-4 justify-start bg-[#191919] p-4">
                        {Array.isArray(project.finalDesignGlimpse) && project.finalDesignGlimpse.map((img, idx) => (
                            <img
                                key={idx}
                                src={img.asset?.url}
                                alt={`Final design ${idx + 1}`}
                                className="w-[180px] md:w-[220px] lg:w-[260px] xl:w-[300px] h-[360px] md:h-[420px] lg:h-[480px] xl:h-[660px] object-cover"
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

// SectionBlock component for reusability and consistent styling
const SectionBlock = ({ label, content, projectName }) => (
    <div className="w-full flex flex-row items-start justify-start gap-4 my-8">
        <div className="w-[30%] gap-2 text-white flex flex-row items-start justify-start text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] mb-2">
            <h1>&rarr;</h1>
            <h1>{label}</h1>
        </div>
        <div className="w-[70%] font-light text-[#7E7E7E] text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] leading-relaxed">
            <PortableText blocks={content} projectName={projectName} />
        </div>
    </div>
)

export default ProjectPage
