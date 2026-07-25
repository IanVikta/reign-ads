import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const SectionEyebrow = ({ label }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="h-1 w-8 inline-block" style={{ background: '#ffd22a' }} />
    <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: '#0220aa' }}>{label}</p>
  </div>
)

const serviceData = [
  {
    id: 'out-of-home',
    name: 'Out of home',
    image: '/images/billboards/Billboard_advertising.jpg',
    description: 'Dominate major highways, city centers, and transit routes with premium spectacular billboards, high-definition digital LED screens, and strategic street pole branding campaigns.',
    features: ['Highway Billboards', 'Digital LED Networks', 'Street Pole Networks', 'Transit & Automobile Ads'],
    stat: '70+ Locations'
  },
  {
    id: 'branding',
    name: 'Branding',
    image: '/images/billboards/Wall-branding.jpg',
    description: 'Transform physical surfaces into active brand touchpoints. From large-scale architectural wall branding and corporate office styling to full-fleet vehicle wrapping and 3D signage.',
    features: ['Office Wall Wraps', 'Vehicle fleet graphics', '3D Fabricated Signage', 'Retail Branding'],
    stat: 'Turnkey Identity'
  },
  {
    id: 'large-format-printing',
    name: 'Large format printing',
    image: '/images/billboards/LargeFormat-printing.jpg',
    description: 'High-precision, ultra-vibrant printing services utilizing premium materials. We produce durable billboards, backlit banners, flags, mesh, and customized corporate stickers.',
    features: ['PVC Banner Print', 'Backlit & Frontlit', 'Stickers & Vinyls', 'Weatherproof Mesh'],
    stat: 'Vibrant Colors'
  },
  {
    id: 'events-branding',
    name: 'Events branding and management',
    image: '/images/campaigns/CAF.jpg',
    description: 'Seamless corporate event experiences from design to teardown. We fabricate custom exhibition pavilions, stage sets, media backdrops, and deploy full experiential setups.',
    features: ['Exhibition Stands', 'Stage Fabrication', 'Media Walls & Podiums', 'Product Launches'],
    stat: 'End-to-End Setup'
  },
  {
    id: 'promotional-materials',
    name: 'Promotional materials',
    image: '/images/services/fabrication.jpg',
    description: 'Custom corporate gifts and high-quality merchandise designed to reflect your brand excellence. Personalize clothing, office stationeries, high-end hampers, and promotional giveaways.',
    features: ['Custom Apparel', 'Corporate Gift Sets', 'Executive Hampers', 'Promotional Giveaways'],
    stat: 'High Retention'
  }
];

const serviceIcons = {
  'out-of-home': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18v10H3V5zm3 14v-4h12v4M6 19h12" />
    </svg>
  ),
  'branding': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  'large-format-printing': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  ),
  'events-branding': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.178 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.05 12.09c-.772-.564-.373-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  'promotional-materials': (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
};

const BB = '#0220aa'
const BG = '#ffd22a'

const Building = ({ w, h, d, x, z, isCentral = false }) => {
  return (
    <div 
      className="absolute"
      style={{
        width: `${w}px`,
        height: `${h}px`,
        left: '50%',
        bottom: '0px',
        transformStyle: 'preserve-3d',
        transform: `translateX(-50%) translateX(${x}px) translateZ(${z}px)`,
      }}
    >
      {/* Front Face */}
      <div 
        className="absolute inset-0 bg-slate-900 border border-slate-800/80 overflow-hidden" 
        style={{ transform: `translateZ(${d/2}px)`, backfaceVisibility: 'hidden' }}
      >
        <div className={`w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(56,189,248,${isCentral ? '0.25' : '0.15'})_50%)] bg-[size:100%_8px] ${isCentral ? 'opacity-90' : 'opacity-70'}`} />
        
        {/* Giant Vertical Screen for Central Tower */}
        {isCentral && (
          <div className="absolute top-4 left-1.5 right-1.5 h-[50px] bg-blue-950 border border-blue-500/50 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_10px_rgba(56,189,248,0.3)]">
            <div className="text-[7px] font-mono font-black text-blue-400 tracking-wider animate-pulse">REIGN ADS</div>
            <div className="text-[5px] font-mono text-[#ffd22a] tracking-widest mt-0.5">OUTDOOR_NET</div>
            {/* Horizontal scanline */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 animate-scanline pointer-events-none" />
          </div>
        )}
      </div>

      {/* Back Face */}
      <div 
        className="absolute inset-0 bg-slate-950 border border-slate-850/80 overflow-hidden" 
        style={{ transform: `rotateY(180deg) translateZ(${d/2}px)`, backfaceVisibility: 'hidden' }}
      >
        <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(56,189,248,0.1)_50%)] bg-[size:100%_8px] opacity-50" />
      </div>

      {/* Left Face */}
      <div 
        className="absolute top-0 bottom-0 bg-slate-950 border-l border-r border-slate-900/80 overflow-hidden" 
        style={{ width: `${d}px`, left: `-${d/2}px`, transform: 'rotateY(-90deg)', backfaceVisibility: 'hidden' }}
      >
        <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(56,189,248,0.12)_50%)] bg-[size:100%_8px] opacity-60" />
      </div>

      {/* Right Face */}
      <div 
        className="absolute top-0 bottom-0 bg-slate-900 border-l border-r border-slate-800/80 overflow-hidden" 
        style={{ width: `${d}px`, right: `-${d/2}px`, transform: 'rotateY(90deg)', backfaceVisibility: 'hidden' }}
      >
        <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(56,189,248,0.15)_50%)] bg-[size:100%_8px] opacity-70" />
      </div>

      {/* Top Face */}
      <div 
        className="absolute left-0 right-0 bg-slate-800 border border-slate-700" 
        style={{ height: `${d}px`, top: `-${d/2}px`, transform: 'rotateX(90deg)', backfaceVisibility: 'hidden' }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className={`w-1.5 h-1.5 rounded-full ${isCentral ? 'bg-blue-400' : 'bg-[#ffd22a]'} animate-ping`} />
        </div>
      </div>
    </div>
  )
}

const Services = () => {
  const [services] = useState(serviceData)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    setHovered(true)
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * 35 // 35deg max horizontal tilt range
    const y = ((e.clientY - top) / height - 0.5) * -20 // 20deg max vertical tilt range
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % services.length)
    }, 6000) // auto transition every 6 seconds
    return () => clearInterval(timer)
  }, [activeIndex, services.length])

  return (
    <div className="bg-white">
      {/* ── Services Hero (Immersive Creative Workspace Redesign) ─────── */}
      <section 
        className="relative bg-slate-950 text-white overflow-hidden py-28 border-b border-slate-800" 
        style={{ paddingTop: 'clamp(140px, 18vh, 200px)' }}
      >
        {/* Futuristic Cyber Grid & Radial Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(2,32,170,0.12)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Heading and Description */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 text-left space-y-8"
            >

              {/* Mega Title - Custom Color Accent */}
              <h1 className="font-black leading-[1.08] tracking-tight uppercase font-display text-white" style={{ fontSize: 'clamp(2.6rem, 5.8vw, 4.8rem)' }}>
                <span className="text-[#ffd22a]">Creative</span> Advertising <br />
                <span>
                  Solutions
                </span>
              </h1>
              
              <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed font-light">
                From high-impact spectacular billboards to digital LED networks, we deliver end-to-end outdoor advertising campaigns that command visibility across major East African corridors.
              </p>
              
              {/* Tech Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 max-w-lg border-t border-b border-slate-900 py-6">
                <div>
                  <p className="text-white text-2xl md:text-3xl font-black tracking-tight font-display">70+</p>
                  <p className="text-slate-500 font-mono text-[9px] uppercase tracking-wider mt-1">Prime Locations</p>
                </div>
                <div>
                  <p className="text-white text-2xl md:text-3xl font-black tracking-tight font-display">10M+</p>
                  <p className="text-slate-500 font-mono text-[9px] uppercase tracking-wider mt-1">Daily Views</p>
                </div>
                <div>
                  <p className="text-white text-2xl md:text-3xl font-black tracking-tight font-display">9+</p>
                  <p className="text-slate-500 font-mono text-[9px] uppercase tracking-wider mt-1">Years of Mastery</p>
                </div>
              </div>

              {/* Premium Button Actions */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4.5 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 rounded-none bg-[#0220aa] border border-transparent cursor-pointer"
                    onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
                    onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}
                  >
                    Request Consultation →
                  </motion.button>
                </Link>
                <a href="#services-interactive-section">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4.5 text-xs font-black uppercase tracking-widest text-slate-300 border border-slate-800 bg-slate-900/30 transition-all duration-300 rounded-none cursor-pointer"
                  >
                    Explore Services
                  </motion.button>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Interactive 3D Cyber City Workspace */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              {/* Mouse reactive container */}
              <div 
                className="relative bg-slate-900/60 border border-slate-800 p-6 shadow-2xl rounded-none group cursor-pointer overflow-hidden backdrop-blur-sm h-[380px] flex flex-col justify-between"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Neon blueprint corner markings */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-blue-500/40 group-hover:border-blue-400 transition-colors" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-blue-500/40 group-hover:border-blue-400 transition-colors" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-blue-500/40 group-hover:border-blue-400 transition-colors" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-blue-500/40 group-hover:border-blue-400 transition-colors" />
                
                {/* Active HUD indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1 font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest z-20">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span>Coverage Grid V2.0</span>
                </div>

                {/* Digital Spec overlay */}
                <div className="absolute bottom-4 left-6 font-mono text-[9px] text-slate-500 space-y-0.5 pointer-events-none z-20">
                  <p>LAT: 0.3176° N (KAMPALA)</p>
                  <p>LON: 32.5811° E</p>
                  <p>SYS_STATUS: CALIBRATED</p>
                </div>

                {/* 3D City Viewport */}
                <div 
                  className="w-full relative h-[260px] flex items-center justify-center pointer-events-none mt-4 overflow-visible"
                  style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                >
                  {/* Ground plate (grid/roads) */}
                  <div 
                    className="absolute bg-slate-950 border border-slate-900" 
                    style={{ 
                      width: '280px', 
                      height: '280px', 
                      transform: 'rotateX(90deg) translateZ(-80px)', 
                      opacity: 0.8,
                      backgroundImage: 'radial-gradient(rgba(56,189,248,0.2) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Intersecting neon roads */}
                    <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 280 280" fill="none">
                      <path d="M 0 140 L 280 140" stroke="#0220aa" strokeWidth="2" strokeDasharray="6 6" className="animate-highway" />
                      <path d="M 140 0 L 140 280" stroke="#ffd22a" strokeWidth="2" strokeDasharray="6 6" className="animate-highway-reverse" />
                      <path d="M 30 30 L 250 250" stroke="#0220aa" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                  </div>

                  {/* City Rotation Container */}
                  <div
                    className={`relative w-[280px] h-[160px] ${hovered ? '' : 'animate-city3D'}`}
                    style={hovered ? {
                      transform: `rotateX(${62 + tilt.y}deg) rotateZ(${-25 + tilt.x}deg)`,
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.15s ease-out',
                    } : {
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Buildings Cluster */}
                    {/* Central Monument */}
                    <Building w={40} h={150} d={40} x={0} z={0} isCentral={true} />

                    {/* Surrounding Skyline */}
                    <Building w={24} h={110} d={24} x={-55} z={-45} />
                    <Building w={26} h={130} d={26} x={55} z={-35} />
                    <Building w={22} h={80} d={22} x={-40} z={45} />
                    <Building w={24} h={95} d={24} x={40} z={35} />
                    <Building w={28} h={100} d={28} x={0} z={-65} />

                    {/* Holographic Concentric Rings (orbiting central tower) */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                      style={{
                        top: '10px',
                        width: '120px',
                        height: '120px',
                        transformStyle: 'preserve-3d',
                        transform: 'translateZ(60px) rotateX(75deg)',
                      }}
                    >
                      <svg className="w-full h-full animate-spin-slow text-[#ffd22a]/40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="50" cy="50" r="45" strokeDasharray="5 5" />
                        <circle cx="50" cy="50" r="30" strokeDasharray="3 3" className="text-blue-400/40" />
                      </svg>
                    </div>

                  </div>
                </div>

                {/* Ground/Chamber Details (Bottom of workspace) */}
                <div className="w-[85%] mx-auto flex items-center justify-between border-t border-slate-800/80 pt-3 relative z-20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <p className="font-mono text-[9px] uppercase text-slate-400 font-bold tracking-wider">
                      Uganda Network coverage
                    </p>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[8px] text-slate-500">
                    <span>SYS_LOAD: CALIBRATED</span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>

        {/* CSS Keyframes for Scanline & 3D sway */}
        <style>{`
          @keyframes scanline {
            0% { top: 0%; }
            50% { top: 100%; }
            100% { top: 0%; }
          }
          .animate-scanline {
            animation: scanline 6s linear infinite;
          }
          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
          .animate-billboard3D {
            animation: billboard3D 12s ease-in-out infinite;
          }
        `}</style>
      </section>


      {/* ── Services Cards List (Interactive 3D Stack) ──────── */}
      <section id="services-interactive-section" className="py-24 bg-white scroll-mt-24">
        <div className="container mx-auto px-6">
          {/* Brand Blue Dome Section */}
          <div className="relative bg-gradient-to-br from-[#0220aa] to-[#010b4f] rounded-t-[60px] md:rounded-t-[100px] py-16 px-6 md:px-12 overflow-hidden shadow-2xl border-t border-l border-r border-[#ffd22a]/30 w-full max-w-[95%] xl:max-w-7xl mx-auto">
            {/* Tech blueprints grids/elements in background */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,210,42,0.05)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,210,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,210,42,0.02)_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none animate-spin-slow" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none animate-spin-slow" />

            <div className="relative z-10 w-full flex flex-col items-center">
              {/* Heading */}
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] text-white text-center font-display mb-10">
                Services
              </h2>

              {/* 3D Stack Frame */}
              <div className="relative w-full h-[220px] md:h-[360px] flex items-center justify-center select-none mb-6 overflow-hidden">
                {services.map((service, idx) => {
                  // Calculate dynamic diff for circular positioning
                  let diff = idx - activeIndex;
                  const length = services.length;
                  if (diff < -length / 2) diff += length;
                  if (diff > length / 2) diff -= length;

                  const isActive = diff === 0;
                  const isPrev = diff === -1;
                  const isNext = diff === 1;

                  // Target animation styles
                  let x = 0;
                  if (isPrev) x = isMobile ? -90 : -200;
                  if (isNext) x = isMobile ? 90 : 200;

                  let rotate = diff * (isMobile ? 6 : 8);
                  let scale = isActive ? 1 : 0.85;
                  let opacity = isActive ? 1 : (Math.abs(diff) === 1 ? 0.55 : 0);
                  let zIndex = isActive ? 20 : (Math.abs(diff) === 1 ? 10 : 0);

                  return (
                    <motion.div
                      key={service.id}
                      onClick={() => {
                        if (!isActive) setActiveIndex(idx);
                      }}
                      className={`absolute border transition-colors duration-300 bg-slate-900 overflow-hidden rounded-none shadow-xl ${
                        isActive 
                          ? 'border-[#ffd22a]/55 cursor-default' 
                          : 'border-white/10 cursor-pointer hover:border-white/20'
                      }`}
                      animate={{
                        x,
                        rotate,
                        scale,
                        scaleX: isActive ? 1 : 0.85,
                        scaleY: isActive ? 1 : 0.85,
                        opacity,
                        zIndex,
                        width: isMobile 
                          ? (isActive ? '240px' : '210px') 
                          : (isActive ? '480px' : '440px'),
                        height: isMobile 
                          ? (isActive ? '160px' : '140px') 
                          : (isActive ? '290px' : '260px'),
                      }}
                      transition={{
                        x: { type: 'spring', stiffness: 90, damping: 11, mass: 0.7 },
                        rotate: { type: 'spring', stiffness: 100, damping: 15 },
                        scale: { type: 'spring', stiffness: 120, damping: 12 },
                        scaleX: { type: 'spring', stiffness: 140, damping: 8 },
                        scaleY: { type: 'spring', stiffness: 140, damping: 8 },
                        width: { type: 'spring', stiffness: 90, damping: 11 },
                        height: { type: 'spring', stiffness: 90, damping: 11 },
                        opacity: { duration: 0.35 }
                      }}
                    >
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className={`w-full h-full object-cover transition-all duration-500 rounded-none pointer-events-none ${
                          isActive ? 'grayscale-0 opacity-100' : 'grayscale opacity-60'
                        }`}
                      />
                      {!isActive && <div className="absolute inset-0 bg-black/40 hover:bg-black/25 transition-colors duration-300 pointer-events-none" />}

                      {/* Monospace code badge in top right */}
                      {isActive && (
                        <div className="absolute top-4 right-4 text-white/50 text-[9px] font-mono">
                          {String(idx + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Active Service Pill */}
              <div className="mb-6">
                <div className="bg-white text-[#0220aa] px-6 py-2.5 rounded-full font-mono text-xs md:text-sm font-black uppercase tracking-wider shadow-lg flex items-center gap-3">
                  <span className="w-5 h-5 flex items-center justify-center bg-[#0220aa] text-white rounded-full text-[10px]">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span>{services[activeIndex].name}</span>
                </div>
              </div>

              {/* Animate Service Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={services[activeIndex].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-2xl text-center space-y-6"
                >

                  <p className="text-blue-100 text-sm md:text-base leading-relaxed font-light px-4">
                    {services[activeIndex].description}
                  </p>

                  {/* Key Solutions (Mini Tags) */}
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {services[activeIndex].features.map(f => (
                      <span 
                        key={f} 
                        className="text-[9px] md:text-[10px] text-white bg-white/10 border border-white/20 px-3 py-1.5 rounded-none font-mono uppercase font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* CTA Enquire Link */}
                  <div className="pt-6 flex justify-center">
                    <Link to="/contact" className="text-xs font-black uppercase tracking-widest text-[#ffd22a] flex items-center gap-2 group transition-colors hover:text-white">
                      <span>Enquire Now</span>
                      <span className="transition-transform group-hover:translate-x-1.5 duration-300">→</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── Advantages Section ────────────────────────────── */}
      <section className="py-24 bg-white text-gray-900 relative overflow-hidden border-t border-b border-gray-150">
        {/* Cyber grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-50/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-8 relative z-10">
          
          {/* Eyebrow and Heading (AOS Scroll Animation) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start space-y-4 mb-16"
          >
            <p className="text-xs md:text-sm tracking-[0.3em] text-[#0220aa] uppercase font-black" style={{ fontFamily: "'Outfit', sans-serif" }}>Why Reign Ads</p>
            
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
              The Reign Ads <span className="text-[#0220aa]">Advantage</span>
            </h2>
            
            {/* Animated accent line */}
            <div className="h-[2px] bg-[#0220aa]/20 w-40 mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                n: '500+',
                l: 'Campaigns Delivered',
                desc: 'Hundreds of successful campaigns executed across Uganda and the wider East African region.',
                accentColor: 'from-[#0220aa] to-blue-500',
                glowColor: 'rgba(2,32,170,0.08)',
                dial: (
                  <div className="relative w-28 h-28 flex items-center justify-center pointer-events-none mb-6">
                    {/* Ring 1 - Dashed */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#0220aa]/20 animate-spin-slow" />
                    {/* Ring 2 - Rotating pointer */}
                    <div className="absolute inset-2 rounded-full border border-[#0220aa]/30" />
                    <div className="absolute inset-2 rounded-full border-t-2 border-[#0220aa] animate-spin" style={{ animationDuration: '3s' }} />
                    {/* Center stats */}
                    <div className="text-2xl font-black font-display text-gray-900 mt-1">500+</div>
                  </div>
                )
              },
              {
                n: '9+',
                l: 'Years of Expertise',
                desc: 'Nearly a decade of mastery, structural excellence, and industry-leading customer satisfaction.',
                accentColor: 'from-[#0220aa] to-blue-500',
                glowColor: 'rgba(2,32,170,0.08)',
                dial: (
                  <div className="relative w-28 h-28 flex items-center justify-center pointer-events-none mb-6">
                    {/* Ring 1 - Dashed */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#0220aa]/20 animate-spin-slow" />
                    {/* Ring 2 - Rotating pointer */}
                    <div className="absolute inset-2 rounded-full border border-[#0220aa]/30" />
                    <div className="absolute inset-2 rounded-full border-t-2 border-[#0220aa] animate-spin" style={{ animationDuration: '3s' }} />
                    {/* Center stats */}
                    <div className="text-2xl font-black font-display text-gray-900 mt-1">9+</div>
                  </div>
                )
              },
              {
                n: '100+',
                l: 'Satisfied Clients',
                desc: 'From leading global multinationals to local startups — we build partnerships that last.',
                accentColor: 'from-[#0220aa] to-blue-500',
                glowColor: 'rgba(2,32,170,0.08)',
                dial: (
                  <div className="relative w-28 h-28 flex items-center justify-center pointer-events-none mb-6">
                    {/* Ring 1 - Dashed */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#0220aa]/20 animate-spin-slow" />
                    {/* Ring 2 - Rotating pointer */}
                    <div className="absolute inset-2 rounded-full border border-[#0220aa]/30" />
                    <div className="absolute inset-2 rounded-full border-t-2 border-[#0220aa] animate-spin" style={{ animationDuration: '3s' }} />
                    {/* Center stats */}
                    <div className="text-2xl font-black font-display text-gray-900 mt-1">100+</div>
                  </div>
                )
              }
            ].map((item, i) => (
              <motion.div
                key={item.l}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ backgroundColor: '#ffffff' }}
                className="group relative p-8 border border-slate-200/80 hover:border-slate-300 transition-all duration-300 rounded-none flex flex-col items-center text-center overflow-hidden h-[340px] justify-between cursor-pointer shadow-sm"
                whileHover={{ 
                  y: -8, 
                  boxShadow: `0 20px 40px ${item.glowColor}`,
                  backgroundColor: '#ffffff'
                }}
              >
                {/* Tech blueprint corner indicators */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-slate-200 group-hover:border-slate-400 transition-colors" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-slate-200 group-hover:border-slate-400 transition-colors" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-slate-200 group-hover:border-slate-400 transition-colors" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-slate-200 group-hover:border-slate-400 transition-colors" />

                {/* Dial Graphic */}
                {item.dial}

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-widest font-mono text-slate-500 group-hover:text-gray-900 transition-colors">
                    {item.l}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom colored loading-bar style line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.accentColor} w-0 group-hover:w-full transition-all duration-500`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Section (Minimal & Unified) ────────── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8 max-w-5xl mx-auto"
          >
            {/* Left side text content */}
            <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-[2px] w-5 inline-block" style={{ background: BG }} />
                <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: BB }}>Start A Campaign</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight uppercase tracking-tight">
                Ready to dominate the <span style={{ color: BB }}>skyline?</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Join East Africa's leading brands. Command visibility and transform public spaces into powerful statements that get remembered.
              </p>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-4">
              <Link to="/contact">
                <button
                  className="px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 transform hover:-translate-y-0.5 rounded-none"
                  style={{ background: BB }}
                  onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
                  onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}
                >
                  Get Started →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
