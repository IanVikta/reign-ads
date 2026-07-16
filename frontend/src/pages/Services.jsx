import { useState } from 'react'
import { motion } from 'framer-motion'
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

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col bg-white border border-gray-150 hover:border-[#0220aa]/20 rounded-none transition-all duration-500 relative group overflow-hidden h-full"
      style={{ boxShadow: '0 8px 30px rgba(2,32,170,0.015)' }}
    >
      {/* CAD corner coordinate markings */}
      <span className="absolute top-3 left-3 text-gray-300/40 text-[9px] font-mono select-none group-hover:text-[#0220aa] group-hover:scale-110 transition-all duration-300 pointer-events-none">+</span>
      <span className="absolute top-3 right-3 text-gray-300/40 text-[9px] font-mono select-none group-hover:text-[#0220aa] group-hover:scale-110 transition-all duration-300 pointer-events-none">+</span>
      <span className="absolute bottom-3 left-3 text-gray-300/40 text-[9px] font-mono select-none group-hover:text-[#0220aa] group-hover:scale-110 transition-all duration-300 pointer-events-none">+</span>
      <span className="absolute bottom-3 right-3 text-gray-300/40 text-[9px] font-mono select-none group-hover:text-[#0220aa] group-hover:scale-110 transition-all duration-300 pointer-events-none">+</span>

      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-none">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Floating Stat Badge */}
        {service.stat && (
          <div 
            className="absolute top-4 left-4 px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest border border-white/20 backdrop-blur-md shadow-sm rounded-none"
            style={{ background: 'rgba(255, 210, 42, 0.95)', color: '#0220aa' }}
          >
            {service.stat}
          </div>
        )}

        {/* Floating Index Number */}
        <div className="absolute bottom-4 right-4 text-white/40 font-black text-2xl font-mono select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between relative bg-white">
        <div>
          {/* Header row with Icon */}
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="w-10 h-10 flex items-center justify-center rounded-none transition-colors duration-300 group-hover:bg-[#0220aa] group-hover:text-white [&>svg]:w-5 [&>svg]:h-5"
              style={{ background: 'rgba(2, 32, 170, 0.05)', color: '#0220aa' }}
            >
              {serviceIcons[service.id] || <span>✦</span>}
            </div>
            <h3 className="text-lg font-black text-gray-900 tracking-wide font-display group-hover:text-[#0220aa] transition-colors">
              {service.name}
            </h3>
          </div>

          <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 font-light h-14 overflow-hidden line-clamp-3">
            {service.description}
          </p>

          {/* Key Solutions (Mini Tags) */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5">
              {service.features.slice(0, 3).map(f => (
                <span 
                  key={f} 
                  className="text-[9px] text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-none font-mono uppercase font-medium"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Enquire Link */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link to="/contact" className="text-[10px] font-black uppercase tracking-widest text-[#0220aa] flex items-center gap-1.5 group/btn transition-colors hover:text-[#ffd22a]">
            <span>Enquire Now</span>
            <span className="transition-transform group-hover/btn:translate-x-1 duration-300">→</span>
          </Link>
        </div>
      </div>

      {/* Dynamic bottom active bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-transparent group-hover:bg-[#ffd22a] w-full transition-all duration-500 rounded-none" />
    </motion.div>
  )
}

const Services = () => {
  const [services] = useState(serviceData)

  return (
    <div className="bg-white">
      {/* ── Services Hero (Agency Blueprint Redesign) ─────── */}
      <section className="relative bg-gray-50 overflow-hidden py-24 border-b border-gray-150" style={{ paddingTop: 'clamp(120px, 16vh, 180px)' }}>
        {/* Decorative blueprint grids in background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(2,32,170,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading and Description */}
            <motion.div 
              initial={{ opacity: 0, y: 35 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 text-left space-y-6"
            >
              <div className="inline-flex items-center gap-2">
                <span className="h-[2px] w-5 inline-block" style={{ background: BG }} />
                <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: BB }}>What We Offer</p>
              </div>

              <h1 className="font-black text-gray-900 leading-tight tracking-tight uppercase" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}>
                Creative Advertising <br />
                <span style={{ color: BB }}>Solutions</span>
              </h1>
              
              <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed font-light">
                From high-impact spectacular billboards to digital LED networks, we deliver end-to-end outdoor advertising campaigns that command visibility across major East African corridors.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 rounded-none"
                    style={{ background: BB }}
                    onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
                    onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}
                  >
                    Request Consultation →
                  </motion.button>
                </Link>
                <a href="#services-list">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 text-xs font-black uppercase tracking-widest text-gray-600 border border-gray-200 hover:border-gray-900 bg-white transition-all duration-300 rounded-none"
                  >
                    Explore Services
                  </motion.button>
                </a>
              </div>
            </motion.div>

            {/* Right Column: Interactive Billboard Wireframe */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 bg-white border border-gray-150 p-6 rounded-none shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-none px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider">Active Grid</span>
              </div>
              
              <svg width="100%" height="280" viewBox="0 0 400 300" fill="none" stroke="currentColor" className="text-gray-300">
                {/* Blueprint mesh grid */}
                <path d="M 0 40 L 400 40 M 0 80 L 400 80 M 0 120 L 400 120 M 0 160 L 400 160 M 0 200 L 400 200 M 0 240 L 400 240 M 0 280 L 400 280" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
                <path d="M 40 0 L 40 300 M 80 0 L 80 300 M 120 0 L 120 300 M 160 0 L 160 300 M 200 0 L 200 300 M 240 0 L 240 300 M 280 0 L 280 300 M 320 0 L 320 300 M 360 0 L 360 300" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
                
                {/* Billboard Structure */}
                <g stroke={BB} strokeWidth="1.5">
                  <rect x="80" y="30" width="240" height="120" fill="white" />
                  <rect x="86" y="36" width="228" height="108" strokeDasharray="3 3" />
                  <line x1="200" y1="150" x2="200" y2="260" strokeWidth="3" />
                  <line x1="140" y1="260" x2="260" y2="260" strokeWidth="2.5" />
                  <line x1="200" y1="200" x2="160" y2="260" />
                  <line x1="200" y1="200" x2="240" y2="260" />
                  
                  {/* Spotlights */}
                  <circle cx="130" cy="20" r="3.5" fill={BG} />
                  <line x1="130" y1="20" x2="140" y2="30" />
                  <circle cx="200" cy="20" r="3.5" fill={BG} />
                  <line x1="200" y1="20" x2="200" y2="30" />
                  <circle cx="270" cy="20" r="3.5" fill={BG} />
                  <line x1="270" y1="20" x2="260" y2="30" />
                </g>

                {/* Annotation Labels */}
                <g fontFamily="monospace" fontSize="8" fontWeight="bold">
                  {/* Left Callout */}
                  <path d="M 80 50 L 30 50" stroke={BB} strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="80" cy="50" r="2" fill={BB} />
                  <text x="5" y="44" fill={BB}>70+ LOCATIONS</text>
                  <text x="5" y="55" fill="gray" fontWeight="normal">UGANDA COVERAGE</text>

                  {/* Right Callout */}
                  <path d="M 320 90 L 370 90" stroke={BB} strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="320" cy="90" r="2" fill={BB} />
                  <text x="330" y="80" fill={BB}>10M+ VIEWS</text>
                  <text x="330" y="91" fill="gray" fontWeight="normal">DAILY IMPRESSIONS</text>

                  {/* Center Support Callout */}
                  <path d="M 200 230 L 255 230" stroke={BB} strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="200" cy="230" r="2" fill={BB} />
                  <text x="262" y="228" fill={BB}>FABRICATION</text>
                  <text x="262" y="238" fill="gray" fontWeight="normal">ENGINEERED STEEL</text>
                </g>
              </svg>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="py-4 bg-white/95 border-b border-gray-150 sticky top-[70px] z-30 backdrop-blur-xl">
        <div className="container mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none items-center justify-start md:justify-center">
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-gray-400 mr-2 flex-shrink-0 hidden md:inline-block">
              Jump To:
            </span>
            {services.map(s => (
              <a 
                key={s.id} 
                href={`#service-${s.id}`}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-none text-xs font-mono font-bold uppercase tracking-wider border transition-all duration-300 shadow-sm group hover:-translate-y-0.5"
                style={{ borderColor: 'rgba(2,32,170,0.12)', color: '#0220aa', background: 'rgba(255, 255, 255, 0.6)' }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = '#0220aa'; 
                  e.currentTarget.style.color = '#ffffff'; 
                  e.currentTarget.style.borderColor = '#0220aa'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; 
                  e.currentTarget.style.color = '#0220aa'; 
                  e.currentTarget.style.borderColor = 'rgba(2,32,170,0.12)'; 
                }}
              >
                <span className="text-inherit flex-shrink-0 flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4">
                  {serviceIcons[s.id]}
                </span>
                <span>{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Cards List ───────────────────────────── */}
      <section id="services-list" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div id={`service-${service.id}`} key={service.id} className="scroll-mt-36">
                <ServiceCard service={service} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advantages Section ────────────────────────────── */}
      <section className="py-20 bg-gray-50 relative overflow-hidden border-t border-b border-gray-150">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(2,32,170,0.012)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <SectionEyebrow label="Why Reign Ads" />
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 leading-tight">
            The Reign Ads <span style={{ color: '#0220aa' }}>Advantage</span>
          </h2>
          
          <motion.div 
            className="mt-6 mb-16 h-[2px] bg-gradient-to-r from-[#0220aa]/20 via-[#0220aa]/10 to-transparent" 
            initial={{ scaleX: 0, originX: 0 }} 
            whileInView={{ scaleX: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }} 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                n: '500+', 
                l: 'Campaigns Delivered', 
                desc: 'Hundreds of successful campaigns executed across Uganda and the wider East African region.',
                icon: (
                  <svg className="w-6 h-6 text-[#0220aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              { 
                n: '9+', 
                l: 'Years of Expertise', 
                desc: 'Nearly a decade of mastery, structural excellence, and industry-leading customer satisfaction.',
                icon: (
                  <svg className="w-6 h-6 text-[#0220aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              { 
                n: '100+', 
                l: 'Satisfied Clients', 
                desc: 'From leading global multinationals to local startups — we build partnerships that last.',
                icon: (
                  <svg className="w-6 h-6 text-[#0220aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <motion.div 
                key={item.l} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="p-8 border border-gray-150 bg-white rounded-none flex flex-col justify-between hover:shadow-xl hover:border-[#0220aa]/15 transition-all duration-400 min-h-[220px] group relative"
              >
                {/* CAD corner coordinate markings */}
                <span className="absolute top-3 left-3 text-gray-300/40 text-[9px] font-mono select-none group-hover:text-[#0220aa] transition-all duration-300 pointer-events-none">+</span>
                <span className="absolute top-3 right-3 text-gray-300/40 text-[9px] font-mono select-none group-hover:text-[#0220aa] transition-all duration-300 pointer-events-none">+</span>
                <span className="absolute bottom-3 left-3 text-gray-300/40 text-[9px] font-mono select-none group-hover:text-[#0220aa] transition-all duration-300 pointer-events-none">+</span>
                <span className="absolute bottom-3 right-3 text-gray-300/40 text-[9px] font-mono select-none group-hover:text-[#0220aa] transition-all duration-300 pointer-events-none">+</span>

                <div>
                  <div className="w-12 h-12 rounded-none bg-[#0220aa]/5 flex items-center justify-center mb-6 transition-colors group-hover:bg-[#0220aa] group-hover:text-white">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-black font-display mb-1 text-gray-900">{item.n}</div>
                  <div className="text-[11px] font-black uppercase tracking-wider mb-3 text-gray-600 font-mono">{item.l}</div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
                
                {/* Active line accent */}
                <div className="absolute bottom-0 left-0 h-1 bg-transparent group-hover:bg-[#ffd22a] w-full transition-all duration-500 rounded-none" />
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
