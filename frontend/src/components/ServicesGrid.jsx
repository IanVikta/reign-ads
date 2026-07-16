import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

// Brand colors
const BB = '#0220aa'; // Royal Azure
const BG = '#ffd22a'; // Golden Dream

// Custom SVG Icons mapped to service IDs
const serviceIcons = {
  'out-of-home': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18v10H3V5zm3 14v-4h12v4M6 19h12" />
    </svg>
  ),
  'branding': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  ),
  'large-format-printing': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  ),
  'events-branding': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.178 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.05 12.09c-.772-.564-.373-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  'promotional-materials': (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
};

// Monospace blueprint codes for the 5 services
const blueprintCodes = {
  'out-of-home': 'OOH_01',
  'branding': 'BRD_02',
  'large-format-printing': 'LFP_03',
  'events-branding': 'EVT_04',
  'promotional-materials': 'PRM_05'
};

const SharpGridCard = ({ service, index, colSpanClass, heightClass }) => {
  return (
    <Link 
      to={`/portfolio?category=${service.portfolioCategory}`}
      className={`${colSpanClass} ${heightClass} relative overflow-hidden group border border-gray-200/10 hover:border-[#ffd22a]/30 transition-colors duration-500 rounded-none flex flex-col justify-between p-6 bg-gray-950`}
    >
      {/* Background Image */}
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700 pointer-events-none rounded-none"
      />
      
      {/* Sharp Technical Dark Vignette Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/35 to-transparent"
      />

      {/* Subtle Royal Azure tint on hover */}
      <div 
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-[0.12] transition-opacity duration-500 pointer-events-none bg-[#0220aa]"
      />

      {/* CAD corner coordinate markings (Blueprint design) */}
      <span className="absolute top-3 left-3 text-white/30 text-[9px] font-mono select-none group-hover:text-[#ffd22a] group-hover:scale-110 transition-all duration-300 pointer-events-none">+</span>
      <span className="absolute top-3 right-3 text-white/30 text-[9px] font-mono select-none group-hover:text-[#ffd22a] group-hover:scale-110 transition-all duration-300 pointer-events-none">+</span>
      <span className="absolute bottom-3 left-3 text-white/30 text-[9px] font-mono select-none group-hover:text-[#ffd22a] group-hover:scale-110 transition-all duration-300 pointer-events-none">+</span>
      <span className="absolute bottom-3 right-3 text-white/30 text-[9px] font-mono select-none group-hover:text-[#ffd22a] group-hover:scale-110 transition-all duration-300 pointer-events-none">+</span>

      {/* Content Area */}
      <div className="relative z-20 mt-auto">
        {/* Large Title */}
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide font-display leading-tight mb-1 group-hover:text-[#ffd22a] transition-colors duration-300">
          {service.title}
        </h3>

        {/* Expandable details wrapper (slides up on desktop hover, always open on mobile) */}
        <div className="lg:max-h-0 lg:opacity-0 group-hover:lg:max-h-40 group-hover:lg:opacity-100 transition-all duration-500 ease-out overflow-hidden">
          <p className="text-white/80 text-xs sm:text-[13px] leading-relaxed font-light mt-3 max-w-xl">
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {service.features.map(f => (
              <span 
                key={f} 
                className="text-[8px] font-bold text-white bg-white/10 px-2 py-0.5 border border-white/10 uppercase tracking-wider font-mono"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Link - fades up on hover */}
        <div 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] font-mono mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: BG }}
        >
          <span>Explore Portfolio</span>
          <span>→</span>
        </div>
      </div>

      {/* Sharp Accent Line */}
      <div className="absolute bottom-0 left-0 h-[3px] bg-[#ffd22a] w-0 group-hover:w-full transition-all duration-500" />
    </Link>
  );
};

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-white font-montserrat overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10" style={{ background: BG }} />
            <p className="text-sm font-black uppercase tracking-[0.35em]" style={{ color: BB }}>
              What We Do
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl md:text-5xl font-black leading-tight text-gray-900 uppercase">
              Our{' '}
              <span className="relative inline-block" style={{ color: BB }}>
                Solutions
                <motion.span
                  className="absolute -bottom-2 left-0 h-[3px] rounded-none"
                  style={{ background: BB }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </h2>
            <p className="text-gray-900 max-w-md text-lg md:text-xl md:text-right leading-relaxed font-bold">
              Our 360° advertising solutions that take your brand places
            </p>
          </div>
        </motion.div>

        {/* 12-Column Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full">
          
          {/* Row 1: 8 + 4 Layout */}
          <SharpGridCard 
            service={services[0]} 
            index={0} 
            colSpanClass="col-span-12 md:col-span-8" 
            heightClass="h-[300px] sm:h-[360px] md:h-[420px]" 
          />
          
          <SharpGridCard 
            service={services[1]} 
            index={1} 
            colSpanClass="col-span-12 md:col-span-4" 
            heightClass="h-[300px] sm:h-[360px] md:h-[420px]" 
          />

          {/* Row 2: 4 + 4 + 4 Layout */}
          <SharpGridCard 
            service={services[2]} 
            index={2} 
            colSpanClass="col-span-12 md:col-span-6 lg:col-span-4" 
            heightClass="h-[260px] sm:h-[300px] md:h-[320px]" 
          />

          <SharpGridCard 
            service={services[3]} 
            index={3} 
            colSpanClass="col-span-12 md:col-span-6 lg:col-span-4" 
            heightClass="h-[260px] sm:h-[300px] md:h-[320px]" 
          />

          <SharpGridCard 
            service={services[4]} 
            index={4} 
            colSpanClass="col-span-12 md:col-span-12 lg:col-span-4" 
            heightClass="h-[260px] sm:h-[300px] md:h-[320px]" 
          />

        </div>

        {/* Dynamic Consultation CTA Strip (Sharp Border style) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-6 border border-gray-150 rounded-none bg-gray-50"
        >
          <div>
            <p className="font-extrabold text-gray-900 text-base uppercase tracking-wide">Not sure which advertising solution fits your campaign goals?</p>
            <p className="text-gray-400 text-xs mt-1">Our marketing specialists will co-create the perfect campaign matrix with you.</p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 px-8 py-3.5 rounded-none font-black text-xs uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-0.5 border border-transparent shadow-sm"
            style={{ background: BB, color: '#ffffff' }}
            onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB; }}
            onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#ffffff'; }}
          >
            Get Free Consultation
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesGrid;
