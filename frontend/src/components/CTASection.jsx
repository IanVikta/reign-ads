import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

// Brand: Royal Azure #0220aa, Golden Dream #ffd22a
const BRAND_BLUE = '#0220aa';
const BRAND_GOLD = '#ffd22a';

const stats = [
  { value: '500+', label: 'Campaigns Delivered' },
  { value: '100+', label: 'Satisfied Clients' },
  { value: '6+', label: 'Cities Covered' },
];

const CTASection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: '#07090f' }}>

      {/* Gold top rule */}
      <div className="h-[3px]" style={{ background: BRAND_GOLD }} />

      {/* Two-column layout */}
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 items-center min-h-[360px] gap-0">

          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="py-14 pr-0 md:pr-14 z-10 relative"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: BRAND_GOLD }} />
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BRAND_GOLD }}>
                Secure Your Space
              </p>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
              Ready to Put Your Brand{' '}
              <span style={{ color: BRAND_GOLD }}>in the Spotlight?</span>
            </h2>

            {/* Subtext */}
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
              Secure premium outdoor advertising space across Uganda today and let millions of people see your brand every single day.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 font-extrabold text-sm uppercase tracking-widest transition-all"
                  style={{ background: BRAND_GOLD, color: BRAND_BLUE }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = BRAND_GOLD; }}
                >
                  Request Advertising Space →
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-4 font-extrabold text-sm uppercase tracking-widest border border-white/15 text-white/60 hover:border-white/40 hover:text-white transition-all"
                >
                  View Our Work
                </motion.button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 mt-8 pt-6 border-t border-white/10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-xl font-black" style={{ color: BRAND_GOLD }}>{s.value}</div>
                  <div className="text-xs text-white/35 uppercase tracking-wider mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Parallax image */}
          <div className="hidden md:block relative h-full min-h-[420px] overflow-hidden">
            {/* Blue vertical accent line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] z-10"
              style={{ background: BRAND_BLUE }}
            />
            <motion.div
              style={{ y: imgY }}
              className="absolute inset-0"
            >
              <img
                src="https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=1200&q=85"
                alt="Brand in the spotlight"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.75)' }}
              />
              {/* Left-fade so image blends into text */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, #07090f 0%, transparent 40%)',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Blue bottom rule */}
      <div className="h-[3px]" style={{ background: BRAND_BLUE }} />
    </section>
  );
};

export default CTASection;
