import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/testimonials';

const BRAND_BLUE = '#0220aa';
const BRAND_GOLD = '#ffd22a';

const Stars = () => (
  <div className="flex gap-1 mb-6">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4" fill={BRAND_GOLD} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialsSlider = () => {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const t = testimonials[active];

  const go = (dir) =>
    setActive((p) => (p + dir + testimonials.length) % testimonials.length);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Pause auto-play on user interaction
  const handleUserInteraction = (callback) => {
    setIsAutoPlaying(false);
    callback();
    // Resume auto-play after 8 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section className="py-14 bg-gray-50">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-8 rounded-full" style={{ background: BRAND_GOLD }} />
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BRAND_BLUE }}>
              Client Voices
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              What Our <span style={{ color: BRAND_BLUE }}>Clients Say</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xs md:text-right">
              Trusted by leading brands across Uganda and East Africa.
            </p>
          </div>
          {/* Rule */}
          <motion.div
            className="mt-5 h-px bg-gray-100"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10 items-start">

          {/* ── Left: Quote panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            {/* Opening quote mark */}
            <div
              className="text-9xl font-black leading-none mb-2 select-none"
              style={{ color: `${BRAND_BLUE}10` }}
            >
              "
            </div>

            {/* Quote + author — animate on change */}
            <div
              className="border-l-4 pl-8"
              style={{ borderColor: BRAND_BLUE }}
            >
              <Stars />

              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={`q-${active}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.38 }}
                  className="text-xl md:text-2xl font-semibold text-gray-800 italic leading-relaxed mb-8"
                >
                  "{t.quote}"
                </motion.blockquote>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`a-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="flex items-center gap-4"
                >
                  <img
                    src={t.photoSrc}
                    alt={t.clientName}
                    className="w-14 h-14 rounded-full object-cover ring-2"
                    style={{ ringColor: BRAND_BLUE, outline: `2px solid ${BRAND_BLUE}`, outlineOffset: 2 }}
                  />
                  <div>
                    <p className="font-extrabold text-gray-900 text-sm">{t.clientName}</p>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: BRAND_BLUE }}>
                      {t.clientTitle}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.company}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Nav row */}
              <div className="flex items-center gap-3 mt-10">
                <button
                  onClick={() => handleUserInteraction(() => go(-1))}
                  className="w-10 h-10 border border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-700 flex items-center justify-center transition-all text-lg"
                >
                  ←
                </button>
                <button
                  onClick={() => handleUserInteraction(() => go(1))}
                  className="w-10 h-10 flex items-center justify-center text-white text-lg transition-all"
                  style={{ background: BRAND_BLUE }}
                  onMouseEnter={e => { e.currentTarget.style.background = BRAND_GOLD; e.currentTarget.style.color = BRAND_BLUE; }}
                  onMouseLeave={e => { e.currentTarget.style.background = BRAND_BLUE; e.currentTarget.style.color = '#fff'; }}
                >
                  →
                </button>
                {/* Dots */}
                <div className="flex items-center gap-1.5 ml-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleUserInteraction(() => setActive(i))}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: active === i ? 22 : 7,
                        height: 7,
                        background: active === i ? BRAND_BLUE : '#d1d5db',
                      }}
                    />
                  ))}
                </div>
                {/* Auto-play indicator */}
                <div className="flex items-center gap-2 ml-4">
                  <div 
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      background: isAutoPlaying ? BRAND_GOLD : '#d1d5db',
                      opacity: isAutoPlaying ? 1 : 0.5 
                    }}
                  />
                  <span className="text-xs text-gray-400">
                    {isAutoPlaying ? 'Auto' : 'Manual'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Client thumbnail list ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="md:col-span-5 space-y-2"
          >
            {testimonials.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => handleUserInteraction(() => setActive(i))}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="w-full flex items-center gap-4 px-5 py-4 text-left border transition-all duration-300"
                style={{
                  borderColor: active === i ? BRAND_BLUE : '#f3f4f6',
                  background: active === i ? `${BRAND_BLUE}07` : '#fafafa',
                }}
              >
                <img
                  src={item.photoSrc}
                  alt={item.clientName}
                  className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                  style={{ border: `2px solid ${active === i ? BRAND_BLUE : '#e5e7eb'}` }}
                />
                <div className="min-w-0 flex-grow">
                  <p className="font-bold text-sm text-gray-900 truncate">{item.clientName}</p>
                  <p className="text-xs text-gray-400 truncate">{item.company}</p>
                </div>
                {active === i && (
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: BRAND_GOLD }}
                  />
                )}
              </motion.button>
            ))}

            {/* Brand stamp block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 p-5 border-l-4"
              style={{ borderColor: BRAND_GOLD, background: `${BRAND_BLUE}06` }}
            >
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: BRAND_BLUE }}>
                Trusted Since 2015
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Over <strong style={{ color: BRAND_BLUE }}>100+ clients</strong> across Uganda and East Africa rely on Reign Ads for premium brand visibility.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
