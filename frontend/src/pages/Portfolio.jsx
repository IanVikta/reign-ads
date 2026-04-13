import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { portfolioProjects } from '../data/portfolio'

const BB = '#0220aa'
const BG = '#ffd22a'

const categories = [
  { slug: 'all', name: 'All Work' },
  { slug: 'billboards', name: 'Billboards' },
  { slug: 'led-screens', name: 'LED Screens' },
  { slug: 'wall-branding', name: 'Wall Branding' },
  { slug: 'automobile-branding', name: 'Automobile Branding' },
  { slug: 'signage', name: 'Signage' },
]

const ProjectCard = ({ project, index }) => {
  const dirs = [
    { opacity: 0, y: 40 }, { opacity: 0, x: 30 }, { opacity: 0, y: 40 },
    { opacity: 0, x: -30 }, { opacity: 0, y: 40 }, { opacity: 0, x: 30 },
  ]
  const d = dirs[index % dirs.length]
  const imgSrc = project.image_url || project.imageSrc || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80'

  return (
    <motion.article
      initial={d}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      className="group border border-gray-100 bg-white overflow-hidden hover:border-blue-100 transition-all duration-300"
      style={{ boxShadow: '0 2px 12px rgba(2,32,170,0.04)' }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={imgSrc}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6 }}
        />
        {/* Blue overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-5"
          style={{ background: `linear-gradient(to top, ${BB}ee, transparent)` }}>
          <Link to="/contact">
            <span className="text-xs font-extrabold uppercase tracking-widest px-4 py-2"
              style={{ background: BG, color: BB }}>
              Enquire →
            </span>
          </Link>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-black uppercase tracking-wider"
          style={{ background: BB, color: '#fff' }}>
          {project.category?.slug?.replace('-', ' ') || 'Campaign'}
        </div>
      </div>
      {/* Info */}
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: BG === '#ffd22a' ? BB : BG }}>
          {project.client || 'Client'}
        </p>
        <h3 className="font-black text-gray-900 text-base mb-1 group-hover:text-blue-700 transition-colors leading-snug">{project.title}</h3>
        {project.description && <p className="text-gray-400 text-xs leading-relaxed">{project.description}</p>}
      </div>
    </motion.article>
  )
}

const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  // Set initial filter from URL parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.some(cat => cat.slug === categoryParam)) {
      setFilter(categoryParam)
    }
  }, [searchParams])

  // Update URL when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    if (newFilter === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: newFilter })
    }
  }

  useEffect(() => {
    // Use static data instead of API call
    setProjects(portfolioProjects)
    setLoading(false)
  }, [])

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category?.slug === filter)

  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden" style={{ paddingTop: 'clamp(100px, 14vh, 150px)', paddingBottom: '4rem' }}>
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: BG }} />
        <div className="absolute inset-0 opacity-[0.025]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(2,32,170,1)_1px,transparent_1px),linear-gradient(90deg,rgba(2,32,170,1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>Case Studies</p>
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-black text-gray-900 leading-tight mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                  Our <span style={{ color: BB }}>Portfolio</span>
                </h1>
                <p className="text-gray-500 text-base max-w-md leading-relaxed">
                  Explore campaigns that have dominated the East African skyline and delivered real results for leading brands.
                </p>
              </div>
              {/* Filter pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button key={cat.slug} onClick={() => handleFilterChange(cat.slug)}
                    className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-all"
                    style={{
                      borderColor: filter === cat.slug ? BB : 'rgba(2,32,170,0.15)',
                      background: filter === cat.slug ? BB : 'transparent',
                      color: filter === cat.slug ? '#fff' : BB,
                    }}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB }} />
      </section>

      {/* ── Grid ────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-10 h-10 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin" />
            </div>
          ) : filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filtered.map((project, i) => (
                  <motion.div key={project.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <ProjectCard project={project} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4" style={{ color: 'rgba(2,32,170,0.1)' }}>◈</div>
              <h3 className="text-lg font-black text-gray-700 mb-2">No Projects Found</h3>
              <p className="text-gray-400 text-sm mb-6">No projects in this category yet.</p>
              <button onClick={() => handleFilterChange('all')}
                className="px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest border-2 transition-all"
                style={{ borderColor: BB, color: BB }}
                onMouseEnter={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BB }}>
                View All →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── PDF Portfolio Section ───────────────────────────────── */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>
                Complete Portfolio
              </p>
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Download Our <span style={{ color: BB }}>Portfolio</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
              Get the complete overview of our work, capabilities, and success stories in a comprehensive PDF portfolio.
            </p>
            
            {/* PDF Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* View PDF Button */}
              <motion.a
                href="/documents/reign-ads-portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 text-xs font-extrabold uppercase tracking-widest border-2 transition-all"
                style={{ 
                  borderColor: BB, 
                  color: BB,
                  background: 'transparent'
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = BB; 
                  e.currentTarget.style.color = '#fff'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = 'transparent'; 
                  e.currentTarget.style.color = BB; 
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Portfolio
              </motion.a>

              {/* Download PDF Button */}
              <motion.a
                href="/documents/reign-ads-portfolio.pdf"
                download="Reign-Ads-Portfolio.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
                style={{ background: BB }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = BG; 
                  e.currentTarget.style.color = BB; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = BB; 
                  e.currentTarget.style.color = '#fff'; 
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </motion.a>
            </div>

            {/* PDF Preview Info */}
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-4 bg-white border border-gray-200 rounded-lg max-w-md mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <svg className="w-5 h-5" style={{ color: BB }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-bold text-gray-700">Portfolio PDF</span>
              </div>
              <p className="text-xs text-gray-500">
                Complete showcase of our advertising campaigns, client testimonials, and service capabilities.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Results stats ───────────────────────────── */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: '500+', l: 'Campaigns Completed' },
              { n: '100+', l: 'Happy Clients' },
              { n: '70+', l: 'Billboard Locations' },
              { n: '100%', l: 'Client Satisfaction' },
            ].map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="text-center border border-gray-200 bg-white p-6">
                <div className="text-2xl font-black mb-1" style={{ color: BB }}>{s.n}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Your Brand Could Be <span style={{ color: BB }}>Next</span></h2>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-7">Let's create a campaign that dominates the skyline and delivers measurable results for your brand.</p>
            <Link to="/contact">
              <button className="px-10 py-3.5 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
                style={{ background: BB }}
                onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
                onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
                Start Your Campaign →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio
