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
  const imgY = useTransform(scrollYProgress, [0, 1], ['-4%', '0%']);

  return (
    <section ref={sectionRef} className="relative md:overflow-visible overflow-hidden" style={{ background: '#07090f' }}>

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
            className="pt-14 pb-[310px] md:py-14 pr-0 md:pr-14 z-10 relative"
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

          {/* Right: Spacer column */}
          <div className="hidden md:block relative h-full min-h-[440px]">
            {/* Blue vertical accent line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] z-10"
              style={{ background: BRAND_BLUE }}
            />
          </div>
        </div>
      </div>

      {/* 3D Billboard sitting exactly on the blue line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 right-auto md:right-[1.5%] lg:right-[3%] xl:right-[6%] top-auto md:top-[-90px] bottom-[2px] w-[290px] md:w-[48%] lg:w-[43%] h-[290px] md:h-auto z-20 flex items-end justify-center pointer-events-none"
      >
        <img
          src="/images/square.png"
          alt="Brand in the spotlight"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(2,32,170,0.3)] md:drop-shadow-[0_25px_60px_rgba(2,32,170,0.35)] select-none"
        />
      </motion.div>

      {/* Blue bottom rule */}
      <div className="h-[3px]" style={{ background: BRAND_BLUE }} />
    </section>
  );
};

export default CTASection;
