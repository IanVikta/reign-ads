import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { portfolioProjects } from '../data/portfolio'

const BB = '#0220aa'
const BG = '#ffd22a'

// Faint outline logo SVG for repeating background patterns
const svgLogoOutline = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 761 592' width='120' height='93'%3E%3Cg id='Page-1' transform='matrix(4.16667,0,0,4.16667,0,0)' fill='none' stroke='%23cbd5e1' stroke-width='0.6'%3E%3Crect x='0' y='0' width='182.451' height='141.906' fill='none' stroke='none'/%3E%3Cg id='Layer-1'%3E%3Cg transform='matrix(1,0,0,1,58.0725,46.7847)'%3E%3Cpath d='M0,-6.249L13.148,-6.249C12.555,-9.675 10.067,-11.84 6.574,-11.84C3.078,-11.84 0.652,-9.675 0,-6.249M23.511,-0.239L0.178,-0.239C1.125,3.068 3.908,4.992 8.053,4.992C11.193,4.992 13.265,4.091 15.455,2.167L21.379,8.418C18.299,11.905 13.797,13.707 7.699,13.707C-3.73,13.707 -11.132,6.553 -11.132,-3.183C-11.132,-12.982 -3.613,-19.956 6.515,-19.956C15.989,-19.956 23.687,-13.822 23.687,-3.064C23.687,-2.223 23.569,-1.14 23.511,-0.239' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,85.2877,46.3407)'%3E%3Cpath d='M0,-18.97L11.251,-18.97L11.197,15.748L0,4.469L0,-18.97ZM-1.243,-28.647C-1.243,-32.074 1.482,-34.718 5.625,-34.718C9.77,-34.718 12.494,-32.256 12.494,-28.828C12.494,-25.221 9.77,-22.576 5.625,-22.576C1.482,-22.576 -1.243,-25.221 -1.243,-28.647' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,125.288,56.4668)'%3E%3Cpath d='M0,-13.948C0,-17.915 -2.961,-20.56 -6.987,-20.56C-11.015,-20.56 -14.034,-17.915 -14.034,-13.948C-14.034,-9.979 -11.015,-7.276 -6.987,-7.276C-2.961,-7.276 0,-9.979 0,-13.948M11.132,-29.097L11.132,-2.466C11.132,9.856 4.264,15.688 -7.699,15.688C-13.856,15.688 -19.72,14.244 -23.626,11.417L-19.542,3.425C-16.878,5.587 -12.494,6.912 -8.705,6.912C-2.664,6.912 -0.119,4.148 -0.119,-0.964L-0.119,-2.045C-2.309,0.539 -5.566,1.8 -9.652,1.8C-18.179,1.8 -25.405,-4.329 -25.405,-13.948C-25.405,-23.506 -18.179,-29.636 -9.652,-29.636C-5.212,-29.636 -1.777,-28.194 0.415,-25.128L0.415,-29.097L11.132,-29.097Z' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,174.848,45.4656)'%3E%3Cpath d='M0,-4.149L0,14.487L-11.251,14.487L-11.251,-2.284C-11.251,-6.974 -13.265,-8.956 -16.522,-8.956C-20.133,-8.956 -22.918,-6.674 -22.918,-1.263L-22.918,14.487L-34.169,14.487L-34.169,-18.095L-23.45,-18.095L-23.45,-14.547C-20.904,-17.253 -17.291,-18.636 -13.265,-18.636C-5.744,-18.636 0,-14.248 0,-4.149' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,44.2505,82.3759)'%3E%3Cpath d='M0,8.175L-5.329,-5.289L-10.658,8.175L0,8.175ZM3.435,16.951L-14.093,16.951L-17.352,25.126L-29.311,25.126L-11.015,-16.951L0.534,-16.951L18.892,25.126L6.693,25.126L3.435,16.951Z' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,85.3564,78.1485)'%3E%3Cpath d='M0,13.003C0,8.074 -2.902,5.31 -6.693,5.31C-10.541,5.31 -13.443,8.074 -13.443,13.003C-13.443,17.993 -10.541,20.818 -6.693,20.818C-2.902,20.818 0,17.993 0,13.003M11.019,-5.612L11.075,29.353L0.354,29.353L0.354,26.109C-1.777,28.693 -4.916,29.894 -9.061,29.894C-17.825,29.894 -24.873,23.401 -24.873,13.003C-24.873,2.665 -17.825,-3.768 -9.061,-3.768C-5.329,-3.768 -2.312,-2.687 -0.178,-0.403L-0.178,-16.891L11.019,-5.612Z' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,98.9317,78.0138)'%3E%3Cpath d='M0,26.932L3.374,19.118C6.335,20.98 10.658,22.123 14.566,22.123C18.355,22.123 19.6,21.282 19.6,19.897C19.6,15.509 0.652,20.501 0.652,7.458C0.652,1.324 6.218,-3.366 16.285,-3.366C20.784,-3.366 25.759,-2.404 28.957,-0.6L25.583,7.156C22.383,5.354 19.185,4.752 16.344,4.752C12.553,4.752 11.191,5.834 11.191,7.034C11.191,11.542 30.082,6.674 30.082,19.597C30.082,25.61 24.634,30.298 14.212,30.298C8.764,30.298 3.139,28.917 0,26.932' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,36.8464,31.0964)'%3E%3Cpath d='M0,15.631C5.151,13.106 8.112,8.537 8.112,2.345C8.112,-7.272 1.006,-13.223 -10.304,-13.223L-29.244,-13.223L-17.528,5.996L-17.528,-3.845L-11.015,-3.845C-6.159,-3.845 -3.73,-1.561 -3.73,2.345C-3.73,6.195 -6.159,8.477 -11.015,8.477L-16.015,8.477L-3.594,28.854L8.942,28.854L0,15.631Z' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,29.7953,12.2248)'%3E%3Cpath d='M0,-7.787L0,-7.097C0,-5.333 -1.419,-3.891 -3.156,-3.891C-4.891,-3.891 -6.31,-5.333 -6.31,-7.097L-6.31,-7.787L-10.518,-7.787L-10.518,-7.097C-10.518,-5.333 -11.937,-3.891 -13.672,-3.891C-15.409,-3.891 -16.828,-5.333 -16.828,-7.097L-16.828,-7.787L-22.192,-7.787L-22.192,0L4.719,0L4.719,-7.787L0,-7.787Z' /%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E`

const categories = [
  { slug: 'all', name: 'All Work' },
  { slug: 'out-of-home', name: 'Out of home' },
  { slug: 'branding', name: 'Branding' },
  { slug: 'large-format-printing', name: 'Large format printing' },
  { slug: 'events-branding', name: 'Events branding & management' },
  { slug: 'promotional-materials', name: 'Promotional materials' },
]

const subCategories = {
  'out-of-home': [
    { slug: 'all', name: 'All Out of Home' },
    { slug: 'led-screens', name: 'LED Screens' },
    { slug: 'billboards', name: 'Billboards' },
    { slug: 'billboard-wraps', name: 'Billboard Wraps' },
    { slug: 'street-poles', name: 'Street Poles' },
  ],
  'branding': [
    { slug: 'all', name: 'All Branding' },
    { slug: 'creative-design', name: 'Creative Design' },
    { slug: 'office-branding', name: 'Office Branding' },
    { slug: 'airport-branding', name: 'Airport Branding' },
    { slug: 'wall-branding', name: 'Wall Branding' },
    { slug: 'automobile-branding', name: 'Automobile Branding' },
    { slug: 'shop-branding', name: 'Shop Branding' },
    { slug: 'fabrication', name: '3D Signages & Fabrication' },
  ],
  'large-format-printing': [
    { slug: 'all', name: 'All Printing' }
  ],
  'events-branding': [
    { slug: 'all', name: 'All Events' }
  ],
  'promotional-materials': [
    { slug: 'all', name: 'All Promotional' }
  ]
}

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
      className="group border border-gray-100 bg-white overflow-hidden hover:border-blue-100 transition-all duration-300 rounded-none"
      style={{ boxShadow: '0 2px 12px rgba(2,32,170,0.04)' }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden rounded-none">
        <motion.img
          src={imgSrc}
          alt={project.title}
          className="w-full h-full object-cover rounded-none"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6 }}
        />
      </div>
      {/* Info */}
      <div className="p-5">
        <p className="text-xs font-mono font-bold uppercase tracking-widest mb-1" style={{ color: BG === '#ffd22a' ? BB : BG }}>
          {project.client || 'Client'}
        </p>
        <h3 className="font-black text-gray-900 text-base mb-1 group-hover:text-blue-700 transition-colors leading-snug font-display uppercase">{project.title}</h3>
        {project.description && <p className="text-gray-400 text-xs leading-relaxed font-light">{project.description}</p>}
      </div>
    </motion.article>
  )
}

const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')
  const [subFilter, setSubFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  // Set initial filters from URL parameter
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const subParam = searchParams.get('sub')

    if (categoryParam && categories.some(cat => cat.slug === categoryParam)) {
      setFilter(categoryParam)
    } else {
      setFilter('all')
    }

    if (subParam) {
      setSubFilter(subParam)
    } else {
      setSubFilter('all')
    }
  }, [searchParams])

  // Update URL when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    setSubFilter('all')
    if (newFilter === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: newFilter })
    }
  }

  // Update URL when sub-filter changes
  const handleSubFilterChange = (newSubFilter) => {
    setSubFilter(newSubFilter)
    const newParams = { category: filter }
    if (newSubFilter !== 'all') {
      newParams.sub = newSubFilter
    }
    setSearchParams(newParams)
  }

  useEffect(() => {
    setProjects(portfolioProjects)
    setLoading(false)
  }, [])

  const filtered = filter === 'all' 
    ? projects 
    : projects.filter(p => {
        const matchesMain = p.category?.slug === filter
        const matchesSub = subFilter === 'all' || p.category?.subSlug === subFilter
        return matchesMain && matchesSub
      })

  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden" style={{ paddingTop: 'clamp(100px, 14vh, 150px)', paddingBottom: '0.75rem' }}>
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: BG }} />
        <div className="absolute inset-0 opacity-[0.025]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(2,32,170,1)_1px,transparent_1px),linear-gradient(90deg,rgba(2,32,170,1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="flex flex-col">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
              <p className="text-xs font-mono font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>Case Studies</p>
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
            </div>

            <div className="mb-6">
              <h1 className="font-black text-gray-900 leading-tight mb-3 uppercase" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                Our <span style={{ color: BB }}>Portfolio</span>
              </h1>
              <p className="text-gray-500 text-sm max-w-xl leading-relaxed font-light">
                Explore campaigns that have dominated the East African skyline and delivered real results for leading brands.
              </p>
            </div>

            {/* Main Filter pills - single row horizontal list just above the line */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none items-center justify-start whitespace-nowrap w-full">
              {categories.map(cat => (
                <button key={cat.slug} onClick={() => handleFilterChange(cat.slug)}
                  className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border transition-all rounded-none flex-shrink-0"
                  style={{
                    borderColor: filter === cat.slug ? BB : 'rgba(2,32,170,0.12)',
                    background: filter === cat.slug ? BB : 'transparent',
                    color: filter === cat.slug ? '#fff' : BB,
                  }}>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sub-Category Filters */}
            {filter !== 'all' && subCategories[filter] && subCategories[filter].length > 1 && (
              <div className="w-full mt-4 border-t border-gray-100 pt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none items-center justify-start whitespace-nowrap">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-gray-400 mr-3 flex-shrink-0">
                  SUB-CATEGORY //
                </span>
                {subCategories[filter].map(sub => (
                  <button key={sub.slug} onClick={() => handleSubFilterChange(sub.slug)}
                    className="px-3.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wide border transition-all rounded-none flex-shrink-0"
                    style={{
                      borderColor: subFilter === sub.slug ? BG : 'rgba(2,32,170,0.1)',
                      background: subFilter === sub.slug ? BG : 'rgba(2,32,170,0.02)',
                      color: BB,
                    }}>
                    {sub.name}
                  </button>
                ))}
              </div>
            )}

          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB }} />
      </section>

      {/* ── Grid ────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-10 h-10 border-4 border-gray-100 border-t-blue-600 rounded-none animate-spin" />
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
              <h3 className="text-lg font-black text-gray-700 mb-2 uppercase">No Projects Found</h3>
              <p className="text-gray-400 text-sm mb-6">No projects in this category yet.</p>
              <button onClick={() => handleFilterChange('all')}
                className="px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest border transition-all rounded-none font-mono"
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
      <section 
        className="py-24 relative overflow-hidden border-t border-b border-[#010c42] bg-[#01093a]"
      >
        {/* Repeating Reign Ads Logo outline background pattern (Static / Fixed) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.14]"
          style={{
            backgroundImage: `url("${svgLogoOutline}")`,
            backgroundSize: '180px 140px',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,210,42,0.015)_1.5px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Technical drafting frame */}
        <div className="absolute inset-6 border border-white/5 pointer-events-none hidden md:block">
          {/* CAD corner markings */}
          <span className="absolute top-2 left-2 text-white/20 text-[8px] font-mono select-none pointer-events-none">+</span>
          <span className="absolute top-2 right-2 text-white/20 text-[8px] font-mono select-none pointer-events-none">+</span>
          <span className="absolute bottom-2 left-2 text-white/20 text-[8px] font-mono select-none pointer-events-none">+</span>
          <span className="absolute bottom-2 right-2 text-white/20 text-[8px] font-mono select-none pointer-events-none">+</span>
          
          {/* Faint technical metadata labels in corners */}
          <span className="absolute top-2 left-6 text-white/15 text-[7px] font-mono select-none tracking-widest pointer-events-none">DWG. REF // RA_PORTFOLIO_PDF</span>
          <span className="absolute bottom-2 right-6 text-white/15 text-[7px] font-mono select-none tracking-widest pointer-events-none">SCALE // 1 : 1.00</span>
        </div>

        {/* Soft Radial Center Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(255,210,42,0.05)_0%,transparent_75%)] pointer-events-none filter blur-xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(2,32,170,0.2)_0%,transparent_75%)] pointer-events-none filter blur-xl" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
              <p className="text-xs font-mono font-bold uppercase tracking-[0.35em]" style={{ color: BG }}>
                Complete Portfolio
              </p>
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 uppercase">
              Download Our <span style={{ color: BG }}>Portfolio</span>
            </h2>
            <p className="text-gray-300 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
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
                className="inline-flex items-center gap-2 px-8 py-3 text-xs font-extrabold uppercase tracking-widest border transition-all rounded-none font-mono"
                style={{ 
                  borderColor: '#fff', 
                  color: '#fff',
                  background: 'transparent'
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = '#fff'; 
                  e.currentTarget.style.color = '#01093a'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = 'transparent'; 
                  e.currentTarget.style.color = '#fff'; 
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
                className="inline-flex items-center gap-2 px-8 py-3 text-xs font-extrabold uppercase tracking-widest text-[#01093a] transition-all rounded-none font-mono"
                style={{ background: BG }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = '#fff'; 
                  e.currentTarget.style.color = '#01093a'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = BG; 
                  e.currentTarget.style.color = '#01093a'; 
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
              className="mt-8 p-4 bg-[#01115e]/70 border border-blue-900/50 rounded-none max-w-md mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-2 font-mono">
                <svg className="w-5 h-5" style={{ color: BG }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-bold text-white">Portfolio PDF</span>
              </div>
              <p className="text-xs text-gray-400 font-light">
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
                className="text-center border border-gray-200 bg-white p-6 rounded-none">
                <div className="text-2xl font-black mb-1 font-mono" style={{ color: BB }}>{s.n}</div>
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 uppercase">Your Brand Could Be <span style={{ color: BB }}>Next</span></h2>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-7 font-light">Let's create a campaign that dominates the skyline and delivers measurable results for your brand.</p>
            <Link to="/contact">
              <button className="px-10 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all rounded-none font-mono"
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
