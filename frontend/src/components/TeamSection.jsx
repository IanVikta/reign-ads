import { motion, useScroll, useTransform } from 'framer-motion';
import { teamMembers } from '../data/team';
import { useState, useRef } from 'react';

const BB = '#0220aa';
const BG = '#ffd22a';

const SectionEyebrow = ({ label }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="h-1 w-7 rounded-full inline-block" style={{ background: BG }} />
    <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>{label}</p>
  </div>
);

const SectionRule = () => (
  <motion.div
    className="mt-5 mb-12 h-px bg-gray-100"
    initial={{ scaleX: 0, originX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
  />
);

const TeamSection = () => {
  const [activeCard, setActiveCard] = useState(null);
  const teamLeader = teamMembers[0];
  const otherMembers = teamMembers.slice(1);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax offsets
  const yText1 = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const yText2 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} className="py-14 bg-white relative overflow-hidden">
      {/* Background Creativity: Sweeping Spotlight Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute bottom-0 left-[15%] w-[350px] h-[700px] origin-bottom opacity-[0.12]"
          style={{
            background: `linear-gradient(to top, ${BG} 0%, transparent 80%)`,
            clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
            transform: 'rotate(-15deg)',
            animation: 'sweep1 14s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute bottom-0 right-[15%] w-[400px] h-[800px] origin-bottom opacity-[0.08]"
          style={{
            background: `linear-gradient(to top, ${BB} 0%, transparent 80%)`,
            clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
            transform: 'rotate(15deg)',
            animation: 'sweep2 18s ease-in-out infinite alternate',
          }}
        />
      </div>

      <style>{`
        @keyframes sweep1 {
          0% { transform: rotate(-25deg); }
          100% { transform: rotate(10deg); }
        }
        @keyframes sweep2 {
          0% { transform: rotate(25deg); }
          100% { transform: rotate(-10deg); }
        }
      `}</style>

      {/* Floating Billboard Wireframe Blueprint */}
      <motion.div
        className="absolute top-[12%] left-[4%] opacity-[0.16] pointer-events-none z-0"
        style={{ y: yText1 }}
      >
        <svg width="200" height="240" viewBox="0 0 200 240" fill="none" stroke={BB} strokeWidth="1.5">
          {/* Billboard Frame */}
          <rect x="10" y="10" width="180" height="110" rx="3" />
          {/* Inner screen grid */}
          <rect x="18" y="18" width="164" height="94" rx="2" strokeDasharray="3 3" />
          {/* Supporting poles */}
          <line x1="100" y1="120" x2="100" y2="220" strokeWidth="3.5" />
          <line x1="60" y1="220" x2="140" y2="220" strokeWidth="2.5" />
          {/* Diagonal braces */}
          <line x1="100" y1="170" x2="60" y2="220" />
          <line x1="100" y1="170" x2="140" y2="220" />
          {/* Spotlights details */}
          <circle cx="50" cy="5" r="3" fill={BG} />
          <circle cx="100" cy="5" r="3" fill={BG} />
          <circle cx="150" cy="5" r="3" fill={BG} />
        </svg>
      </motion.div>

      {/* Floating Location Network Route Grid */}
      <motion.div
        className="absolute bottom-[15%] right-[5%] opacity-[0.15] pointer-events-none z-0"
        style={{ y: yText2 }}
      >
        <svg width="240" height="160" viewBox="0 0 240 160" fill="none" stroke={BB} strokeWidth="1.5">
          {/* Curved route */}
          <path d="M10 80 Q 60 10, 120 80 T 230 80" strokeDasharray="4 4" />
          {/* Location pins */}
          <circle cx="60" cy="45" r="5" />
          <circle cx="60" cy="45" r="1.5" fill={BG} />
          <circle cx="120" cy="80" r="5" />
          <circle cx="120" cy="80" r="1.5" fill={BG} />
          <circle cx="180" cy="115" r="5" />
          <circle cx="180" cy="115" r="1.5" fill={BG} />
          {/* Connecting grid lines */}
          <line x1="60" y1="45" x2="60" y2="80" />
          <line x1="120" y1="80" x2="120" y2="115" />
        </svg>
      </motion.div>

      {/* Decorative dot grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(2,32,170,0.025)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionEyebrow label="Meet The Team" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            The People Behind <span style={{ color: BB }}>Our Success</span>
          </h2>
        </div>
        <SectionRule />
        
        {/* Zigzag/Staggered Layout */}
        <div className="space-y-3">
          {/* Team Leader - Full Width Feature */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="flex flex-col md:flex-row items-stretch bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden group">
              {/* Image Side */}
              <div className="md:w-2/5 relative overflow-hidden min-h-[400px] md:min-h-[500px]">
                <img
                  src={teamLeader.image}
                  alt={teamLeader.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/90" />
                
                {/* Floating badge */}
                <div className="absolute top-6 left-6 px-4 py-2 text-xs font-black uppercase tracking-widest"
                  style={{ background: BG, color: BB }}>
                  Team Leader
                </div>
              </div>
              
              {/* Content Side */}
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative">
                {/* Large decorative number */}
                <div className="absolute top-6 right-6 text-[120px] font-black opacity-5 leading-none select-none"
                  style={{ color: BG }}>
                  01
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10"
                >
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                    {teamLeader.name}
                  </h3>
                  <p className="text-base font-bold uppercase tracking-wider mb-6" style={{ color: BG }}>
                    {teamLeader.position}
                  </p>
                  <p className="text-gray-300 text-base leading-relaxed max-w-2xl mb-8">
                    {teamLeader.bio}
                  </p>
                  
                  {/* Decorative lines */}
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="h-1"
                      style={{ background: BG, width: 80 }}
                      initial={{ width: 0 }}
                      whileInView={{ width: 80 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    />
                    <motion.div 
                      className="h-1"
                      style={{ background: 'white', width: 40 }}
                      initial={{ width: 0 }}
                      whileInView={{ width: 40 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                    <motion.div 
                      className="h-1"
                      style={{ background: BG, width: 20 }}
                      initial={{ width: 0 }}
                      whileInView={{ width: 20 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Other Team Members - Zigzag Staggered Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {otherMembers.map((member, index) => {
              const isLeft = index % 2 === 0;
              const number = String(index + 2).padStart(2, '0');
              
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative ${isLeft ? 'md:mr-8' : 'md:ml-8 md:mt-12'}`}
                  onMouseEnter={() => setActiveCard(member.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className={`relative bg-white border-2 overflow-hidden transition-all duration-300 ${
                    activeCard === member.id ? 'border-blue-400 shadow-2xl' : 'border-gray-200 shadow-md'
                  }`}>
                    {/* Diagonal split design */}
                    <div className="flex flex-col sm:flex-row items-stretch min-h-[200px]">
                      {/* Content */}
                      <div className="flex-1 p-6 relative bg-white">
                        {/* Number badge */}
                        <div className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-sm font-black border-2"
                          style={{ 
                            borderColor: activeCard === member.id ? BG : BB,
                            color: activeCard === member.id ? BG : BB,
                            background: activeCard === member.id ? `${BG}20` : `${BB}10`
                          }}>
                          {number}
                        </div>
                        
                        <div className="pr-16">
                          <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">
                            {member.name}
                          </h3>
                          <p className="text-[11px] font-bold uppercase tracking-wider mb-4" style={{ color: BB }}>
                            {member.position}
                          </p>
                          <p className="text-gray-500 text-sm leading-relaxed">
                            {member.bio}
                          </p>
                        </div>
                        
                        {/* Bottom accent bar */}
                        <motion.div 
                          className="absolute bottom-0 left-0 h-1 transition-all duration-300"
                          style={{ 
                            background: BG,
                            width: activeCard === member.id ? '100%' : '30%'
                          }}
                        />
                      </div>
                      
                      {/* Image */}
                      <div className="w-full sm:w-40 h-64 sm:h-auto relative overflow-hidden bg-gray-100 order-first sm:order-last">
                        <img
                          src={member.image}
                          alt={member.name}
                          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ${
                            activeCard === member.id ? 'scale-110 opacity-100' : 'scale-100 opacity-90'
                          }`}
                        />
                        {/* Diagonal overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
                      </div>
                    </div>

                    {/* Corner triangle accent */}
                    <div 
                      className="absolute top-0 left-0 transition-all duration-300"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: `${activeCard === member.id ? '60' : '40'}px solid ${BG}`,
                        borderBottom: `${activeCard === member.id ? '60' : '40'}px solid transparent`,
                        opacity: activeCard === member.id ? 1 : 0.7
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
