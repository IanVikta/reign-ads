import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../services/api'

const BB = '#0220aa'
const BG = '#ffd22a'

const SectionEyebrow = ({ label }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="h-1 w-7 rounded-full inline-block" style={{ background: BG }} />
    <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>{label}</p>
  </div>
)

const serviceData = [
  {
    id: 1, name: 'Spectacular Billboards', icon: '🏗️',
    image: '/images/services/billboard1.JPG',
    description: 'Dominate major highways and city centers with premium billboard placements that capture maximum attention and drive brand recognition at scale.',
    features: ['Double Deckers', 'Highway Billboards', 'City Center Locations', 'Prime Visibility', 'Structural Installation'],
    stat: '70+ Locations'
  },
  {
    id: 2, name: 'LED Screens', icon: '💡',
    image: '/images/services/LED.jpg',
    description: 'Dynamic digital displays with vibrant colors, animations, and real-time content management that command attention 24/7.',
    features: ['Full HD Displays', 'Dynamic Content', '24/7 Visibility', 'Remote Management', 'Multiple Formats'],
    stat: '24/7 Active'
  },
  {
    id: 3, name: 'Wall Branding', icon: '🏢',
    image: '/images/services/wall_brand.jpg',
    description: 'Transform entire buildings into powerful brand statements visible from miles away with our large-format wall branding solutions.',
    features: ['Building Wraps', 'Exterior Branding', 'Large Scale Impact', 'Weather Resistant', 'Creative Design'],
    stat: 'Citywide Reach'
  },
  {
    id: 4, name: 'Automobile Branding', icon: '🚗',
    image: '/images/services/startimes_automobile.jpg',
    description: 'Mobile advertising that takes your brand everywhere — reaching millions of audiences across every city street and highway.',
    features: ['Vehicle Wraps', 'Automobile Graphics', 'Mobile Visibility', 'Durable Materials', 'Route Targeting'],
    // stat: 'Unlimited Reach'
  },
  {
    id: 5, name: 'Fabrication', icon: '⚙️',
    image: '/images/services/fabrication2.jpg',
    description: 'Custom 3D signage and structural installations crafted with precision and excellence — from concept to completion.',
    features: ['3D Signage', 'Custom Structures', 'Metal Fabrication', 'Quality Craftsmanship', 'On-Site Installation'],
    stat: '500+ Built'
  },
  {
    id: 6, name: 'Large Format Printing', icon: '🖨️',
    image: '/images/services/LFP.JPG',
    description: 'High-quality printing for all outdoor applications with vibrant, long-lasting results and UV-resistant materials.',
    features: ['Billboard Printing', 'Banner Production', 'High Resolution', 'UV Resistant', 'Quick Turnaround'],
    stat: '1000+ Jobs'
  },
]

const ServiceCard = ({ service, index }) => {
  const dir = index % 2 === 0 ? { opacity: 0, x: -30 } : { opacity: 0, x: 30 }
  return (
    <motion.div
      initial={dir}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`grid md:grid-cols-2 gap-0 border border-gray-100 overflow-hidden bg-white hover:border-blue-100 transition-all duration-300 ${index % 2 !== 0 ? 'md:[&>:first-child]:order-2' : ''}`}
      style={{ boxShadow: '0 2px 16px rgba(2,32,170,0.04)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video md:aspect-auto">
        <motion.img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        {/* Stat badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 text-xs font-black uppercase tracking-widest"
          style={{ background: BG, color: BB }}>
          {service.stat}
        </div>
      </div>
      {/* Content */}
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <div className="text-2xl mb-3">{service.icon}</div>
        <h3 className="text-xl font-black text-gray-900 mb-3">{service.name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{service.description}</p>
        <ul className="space-y-1.5 mb-7">
          {service.features.map(f => (
            <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BB }} />
              {f}
            </li>
          ))}
        </ul>
        <Link to="/contact">
          <button className="text-xs font-extrabold uppercase tracking-widest px-6 py-3 transition-all border-2"
            style={{ borderColor: BB, color: BB }}
            onMouseEnter={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BB }}>
            Enquire About This →
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

const Services = () => {
  const [services] = useState(serviceData)

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
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>What We Offer</p>
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
            </div>
            <h1 className="font-black text-gray-900 leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Advertising <span style={{ color: BB }}>Services</span>
            </h1>
            <p className="text-gray-500 text-base max-w-xl leading-relaxed mb-8">
              From spectacular billboards to LED screens, we deliver end-to-end outdoor advertising solutions that put your brand in front of millions every day.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <button className="px-7 py-3 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
                  style={{ background: BB }}
                  onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
                  onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
                  Get A Quote →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB }} />
      </section>

      {/* ── Service pills navigation ─────────────────── */}
      <section className="py-6 bg-gray-50 border-b border-gray-100 sticky top-0 z-30">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {serviceData.map(s => (
              <a key={s.id} href={`#service-${s.id}`}
                className="flex-shrink-0 px-4 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all"
                style={{ borderColor: 'rgba(2,32,170,0.15)', color: BB }}
                onMouseEnter={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = BB }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BB; e.currentTarget.style.borderColor = 'rgba(2,32,170,0.15)' }}>
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services List ────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6 space-y-8">
          {services.map((service, i) => (
            <div id={`service-${service.id}`} key={service.id}>
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionEyebrow label="Why Reign Ads" />
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">The Reign Ads <span style={{ color: BB }}>Advantage</span></h2>
          <motion.div className="mt-5 mb-12 h-px bg-gray-200" initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { n: '500+', l: 'Campaigns Delivered', desc: 'Hundreds of successful campaigns executed across Uganda and East Africa.' },
              { n: '9+', l: 'Years of Expertise', desc: 'Almost a decade of mastery in outdoor advertising and creative branding.' },
              { n: '100+', l: 'Satisfied Clients', desc: 'From multinationals to local brands — our clients keep coming back.' },
            ].map((item, i) => (
              <motion.div key={item.l} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-7 border border-gray-100 bg-white text-center">
                <div className="text-3xl font-black mb-1" style={{ color: BB }}>{item.n}</div>
                <div className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-700">{item.l}</div>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Ready to <span style={{ color: BB }}>Get Started?</span></h2>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-7">Tell us about your campaign and we'll find the perfect advertising solution for your brand.</p>
            <Link to="/contact">
              <button className="px-10 py-3.5 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
                style={{ background: BB }}
                onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
                onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
                Request A Quote →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
