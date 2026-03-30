import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

// Brand colors from official Brand Guidelines
// Royal Azure: #0220aa (primary – 65%)
// Golden Dream: #ffd22a (accent – 35%)

// Mapping services to portfolio categories
const serviceToPortfolioMap = {
  'billboard-advertising': 'billboards',
  'rooftop-advertising': 'wall-branding', 
  'street-poles': 'signage',
  'automobiles': 'automobile-branding',
  'digital-led': 'led-screens',
  'large-format-printing': 'signage'
};

// Per-card scroll-in animation variants
// Large/featured tiles slide in from their natural reading direction
// Small tiles get varied entry directions and a slight scale pop
const tileVariants = [
  // 0 – featured left: slide from left
  { hidden: { opacity: 0, x: -70, scale: 0.97 }, visible: { opacity: 1, x: 0, scale: 1 } },
  // 1 – small top-right: drop from top
  { hidden: { opacity: 0, y: -50, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } },
  // 2 – small bottom-right: rise from bottom
  { hidden: { opacity: 0, y: 60, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } },
  // 3 – small top-left: slide from left
  { hidden: { opacity: 0, x: -50, scale: 0.95 }, visible: { opacity: 1, x: 0, scale: 1 } },
  // 4 – small bottom-left: scale pop
  { hidden: { opacity: 0, scale: 0.80 }, visible: { opacity: 1, scale: 1 } },
  // 5 – featured right: slide from right
  { hidden: { opacity: 0, x: 70, scale: 0.97 }, visible: { opacity: 1, x: 0, scale: 1 } },
];

const TRANSITION_BASE = {
  ease: [0.22, 1, 0.36, 1],
  duration: 0.65,
};

const ServiceTile = ({ service, index, featured = false }) => {
  const [hovered, setHovered] = useState(false);
  const variant = tileVariants[index] ?? tileVariants[0];
  
  // Get the portfolio category for this service
  const portfolioCategory = serviceToPortfolioMap[service.id] || 'all';
  const portfolioUrl = `/portfolio?category=${portfolioCategory}`;

  return (
    <Link to={portfolioUrl}>
      <motion.div
        variants={variant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ ...TRANSITION_BASE, delay: index * 0.09 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={`relative overflow-hidden cursor-pointer group ${featured ? 'min-h-[340px]' : 'min-h-[200px]'}`}
        style={{
          boxShadow: hovered
            ? '0 24px 64px rgba(2,32,170,0.20)'
            : '0 2px 16px rgba(2,32,170,0.06)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Full-bleed image */}
        {service.image && (
          <>
            <motion.img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              loading="lazy"
            />
            {/* White → royal blue overlay on hover */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: hovered
                  ? 'linear-gradient(135deg, rgba(2,32,170,0.40) 0%, rgba(2,32,170,0.30) 60%, rgba(255,210,42,0.15) 100%)'
                  : 'linear-gradient(to bottom, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.10) 40%, rgba(2,32,170,0.05) 100%)',
              }}
              transition={{ duration: 0.45 }}
            />
          </>
        )}

        {/* Animated gold-blue bottom bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[4px]"
          style={{ background: 'linear-gradient(to right, #0220aa, #ffd22a)' }}
          animate={{ width: hovered ? '100%' : '32px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Number badge — blue → gold on hover */}
        <div className="absolute top-5 left-5 z-20">
          <motion.div
            animate={{
              backgroundColor: hovered ? '#ffd22a' : '#0220aa',
              color: hovered ? '#0220aa' : '#ffffff',
            }}
            transition={{ duration: 0.3 }}
            className="w-9 h-9 flex items-center justify-center font-black text-xs rounded-full"
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>
        </div>

        {/* Icon – top right */}
        <div className="absolute top-5 right-5 z-20">
          <motion.span
            className="text-2xl"
            animate={{ scale: hovered ? 1.3 : 1, rotate: hovered ? 12 : 0 }}
            transition={{ duration: 0.35 }}
          >
            {service.icon}
          </motion.span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
          <div className="inline-block bg-white/60 backdrop-blur-sm rounded px-2 py-1 border border-white/10 w-fit">
            <motion.h3
              className="font-bold text-sm leading-tight"
              animate={{ color: hovered ? '#0220aa' : '#0220aa' }}
              transition={{ duration: 0.3 }}
            >
              {service.title}
            </motion.h3>
          </div>

          <AnimatePresence>
            {hovered && (
              <motion.div
                key="desc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3 }}
                className="mt-2 inline-block bg-white/60 backdrop-blur-sm rounded px-2 py-1 border border-white/10 w-fit"
              >
                <p className="text-gray-600 text-xs leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hovered && (
              <motion.div
                key="cta"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide bg-white/60 backdrop-blur-sm rounded px-2 py-1 border border-white/10 w-fit"
                style={{ color: '#ffd22a' }}
              >
                <span>View Portfolio</span>
                <span>→</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Link>
  );
};

const ServicesGrid = () => {
  return (
    <section className="py-14 bg-white font-montserrat">
      <div className="container mx-auto px-6">

        {/* Section Header — fades up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          {/* Eyebrow — the gold pill slides in from left */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-1 w-8 rounded-full" style={{ background: '#ffd22a' }} />
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: '#0220aa' }}>
              What We Do
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-black leading-tight text-gray-900">
              Our{' '}
              <span className="relative inline-block" style={{ color: '#0220aa' }}>
                Solutions
                {/* Gold-to-blue swoosh underline animates in */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-[5px] rounded-full"
                  style={{ background: 'linear-gradient(to right, #ffd22a, #0220aa)' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </h2>
            <motion.p
              className="text-gray-500 max-w-xs text-sm md:text-right leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              360° outdoor advertising that puts your brand exactly where it belongs.
            </motion.p>
          </div>
        </motion.div>

        {/* Bento Grid — cards animate individually as they scroll into view */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Row 1: featured left (col 7) + 2 stacked right (col 5) */}
          <div className="md:col-span-7">
            <ServiceTile service={services[0]} index={0} featured />
          </div>
          <div className="md:col-span-5 grid grid-rows-2 gap-4">
            <ServiceTile service={services[1]} index={1} />
            <ServiceTile service={services[2]} index={2} />
          </div>

          {/* Row 2: 2 stacked left (col 5) + featured right (col 7) */}
          <div className="md:col-span-5 grid grid-rows-2 gap-4">
            <ServiceTile service={services[3]} index={3} />
            <ServiceTile service={services[4]} index={4} />
          </div>
          <div className="md:col-span-7">
            <ServiceTile service={services[5]} index={5} featured />
          </div>

        </div>

        {/* CTA Strip — slides up after grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-xl px-7 py-5 border"
          style={{
            background: 'linear-gradient(135deg, rgba(2,32,170,0.04) 0%, rgba(255,210,42,0.07) 100%)',
            borderColor: 'rgba(2,32,170,0.12)',
          }}
        >
          <div>
            <p className="font-bold text-gray-800 text-sm">Not sure which service fits your campaign?</p>
            <p className="text-gray-400 text-xs mt-0.5">Our team will guide you to the perfect solution.</p>
          </div>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0 px-8 py-3 rounded-full font-extrabold text-sm uppercase tracking-widest transition-all"
            style={{ background: '#0220aa', color: '#ffffff' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ffd22a'; e.currentTarget.style.color = '#0220aa'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0220aa'; e.currentTarget.style.color = '#ffffff'; }}
          >
            Get a Free Consultation
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesGrid;
