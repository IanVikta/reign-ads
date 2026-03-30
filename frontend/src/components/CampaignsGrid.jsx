import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { campaigns } from '../data/campaigns';

// Brand: Royal Azure #0220aa, Golden Dream #ffd22a
const BRAND_BLUE = '#0220aa';
const BRAND_GOLD = '#ffd22a';

const cardVariants = [
  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
  { hidden: { opacity: 0, y: 50 },  visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, x: 50 },  visible: { opacity: 1, x: 0 } },
  { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
];

const CampaignCard = ({ campaign, index }) => {
  const [hovered, setHovered] = useState(false);
  const variant = cardVariants[index % cardVariants.length];

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative aspect-video overflow-hidden cursor-pointer"
      style={{ boxShadow: hovered ? '0 20px 50px rgba(2,32,170,0.18)' : '0 2px 12px rgba(0,0,0,0.06)', transition: 'box-shadow 0.4s' }}
    >
      {/* Image */}
      <motion.img
        src={campaign.imageSrc}
        alt={campaign.title}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Overlay — slides up on hover */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-7"
        animate={{ background: hovered ? 'rgba(2,32,170,0.88)' : 'rgba(2,32,170,0)' }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35 }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: BRAND_GOLD }}
              >
                {campaign.client}
              </p>
              <h3 className="text-xl font-black text-white mb-2 leading-snug">
                {campaign.title}
              </h3>
              <p className="text-white/75 text-sm leading-relaxed mb-5">
                {campaign.description}
              </p>
              {campaign.caseStudyLink && (
                <Link to={campaign.caseStudyLink}>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="text-xs font-extrabold uppercase tracking-widest px-6 py-2.5 transition-all"
                    style={{ background: BRAND_GOLD, color: BRAND_BLUE }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = BRAND_GOLD; }}
                  >
                    View Case Study →
                  </motion.button>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Corner number tag */}
      <div
        className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center text-xs font-black"
        style={{ background: BRAND_BLUE, color: '#fff' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Bottom gold bar — grows on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px]"
        style={{ background: BRAND_GOLD }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </motion.div>
  );
};

const CampaignsGrid = () => {
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="h-1 w-8 rounded-full" style={{ background: BRAND_GOLD }} />
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BRAND_BLUE }}>
              Case Studies
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Featured <span style={{ color: BRAND_BLUE }}>Campaigns</span>
            </h2>
            <motion.p
              className="text-gray-400 text-sm max-w-xs md:text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Award-winning advertising campaigns that delivered exceptional brand results.
            </motion.p>
          </div>
          <motion.div
            className="mt-5 h-px bg-gray-200"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={campaign.id} campaign={campaign} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-4 font-extrabold text-sm uppercase tracking-widest transition-all"
              style={{ background: BRAND_BLUE, color: '#fff' }}
              onMouseEnter={e => { e.currentTarget.style.background = BRAND_GOLD; e.currentTarget.style.color = BRAND_BLUE; }}
              onMouseLeave={e => { e.currentTarget.style.background = BRAND_BLUE; e.currentTarget.style.color = '#fff'; }}
            >
              View Full Portfolio →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignsGrid;
