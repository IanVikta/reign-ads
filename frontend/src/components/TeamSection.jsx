import { motion, useScroll, useTransform } from 'framer-motion';
import { teamMembers } from '../data/team';
import { useState, useRef } from 'react';

const BB = '#0220aa';
const BG = '#ffd22a';

const SectionEyebrow = ({ label }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="h-1 w-7 rounded-full inline-block" style={{ background: BG }} />
    <p className="text-sm font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>{label}</p>
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
        .logo-path {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: drawStroke 9s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
        }
        @keyframes drawStroke {
          0% {
            stroke-dashoffset: 1200;
            opacity: 0;
          }
          15% {
            opacity: 0.35;
          }
          75% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
      `}</style>
 
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
 
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none z-0 overflow-hidden">
        <svg 
          width="640" 
          height="500" 
          viewBox="0 0 761 592" 
          fill="none" 
          stroke={BB} 
          strokeWidth="1.2" 
          className="w-[450px] md:w-[700px] h-auto"
        >
          <g id="Page-1" transform="matrix(4.16667,0,0,4.16667,0,0)">
            <g id="Layer-1">
              <g transform="matrix(1,0,0,1,58.0725,46.7847)">
                <path className="logo-path" d="M0,-6.249L13.148,-6.249C12.555,-9.675 10.067,-11.84 6.574,-11.84C3.078,-11.84 0.652,-9.675 0,-6.249M23.511,-0.239L0.178,-0.239C1.125,3.068 3.908,4.992 8.053,4.992C11.193,4.992 13.265,4.091 15.455,2.167L21.379,8.418C18.299,11.905 13.797,13.707 7.699,13.707C-3.73,13.707 -11.132,6.553 -11.132,-3.183C-11.132,-12.982 -3.613,-19.956 6.515,-19.956C15.989,-19.956 23.687,-13.822 23.687,-3.064C23.687,-2.223 23.569,-1.14 23.511,-0.239" />
              </g>
              <g transform="matrix(1,0,0,1,85.2877,46.3407)">
                <path className="logo-path" d="M0,-18.97L11.251,-18.97L11.197,15.748L0,4.469L0,-18.97ZM-1.243,-28.647C-1.243,-32.074 1.482,-34.718 5.625,-34.718C9.77,-34.718 12.494,-32.256 12.494,-28.828C12.494,-25.221 9.77,-22.576 5.625,-22.576C1.482,-22.576 -1.243,-25.221 -1.243,-28.647" />
              </g>
              <g transform="matrix(1,0,0,1,125.288,56.4668)">
                <path className="logo-path" d="M0,-13.948C0,-17.915 -2.961,-20.56 -6.987,-20.56C-11.015,-20.56 -14.034,-17.915 -14.034,-13.948C-14.034,-9.979 -11.015,-7.276 -6.987,-7.276C-2.961,-7.276 0,-9.979 0,-13.948M11.132,-29.097L11.132,-2.466C11.132,9.856 4.264,15.688 -7.699,15.688C-13.856,15.688 -19.72,14.244 -23.626,11.417L-19.542,3.425C-16.878,5.587 -12.494,6.912 -8.705,6.912C-2.664,6.912 -0.119,4.148 -0.119,-0.964L-0.119,-2.045C-2.309,0.539 -5.566,1.8 -9.652,1.8C-18.179,1.8 -25.405,-4.329 -25.405,-13.948C-25.405,-23.506 -18.179,-29.636 -9.652,-29.636C-5.212,-29.636 -1.777,-28.194 0.415,-25.128L0.415,-29.097L11.132,-29.097Z" />
              </g>
              <g transform="matrix(1,0,0,1,174.848,45.4656)">
                <path className="logo-path" d="M0,-4.149L0,14.487L-11.251,14.487L-11.251,-2.284C-11.251,-6.974 -13.265,-8.956 -16.522,-8.956C-20.133,-8.956 -22.918,-6.674 -22.918,-1.263L-22.918,14.487L-34.169,14.487L-34.169,-18.095L-23.45,-18.095L-23.45,-14.547C-20.904,-17.253 -17.291,-18.636 -13.265,-18.636C-5.744,-18.636 0,-14.248 0,-4.149" />
              </g>
              <g transform="matrix(1,0,0,1,44.2505,82.3759)">
                <path className="logo-path" d="M0,8.175L-5.329,-5.289L-10.658,8.175L0,8.175ZM3.435,16.951L-14.093,16.951L-17.352,25.126L-29.311,25.126L-11.015,-16.951L0.534,-16.951L18.892,25.126L6.693,25.126L3.435,16.951Z" />
              </g>
              <g transform="matrix(1,0,0,1,85.3564,78.1485)">
                <path className="logo-path" d="M0,13.003C0,8.074 -2.902,5.31 -6.693,5.31C-10.541,5.31 -13.443,8.074 -13.443,13.003C-13.443,17.993 -10.541,20.818 -6.693,20.818C-2.902,20.818 0,17.993 0,13.003M11.019,-5.612L11.075,29.353L0.354,29.353L0.354,26.109C-1.777,28.693 -4.916,29.894 -9.061,29.894C-17.825,29.894 -24.873,23.401 -24.873,13.003C-24.873,2.665 -17.825,-3.768 -9.061,-3.768C-5.329,-3.768 -2.312,-2.687 -0.178,-0.403L-0.178,-16.891L11.019,-5.612Z" />
              </g>
              <g transform="matrix(1,0,0,1,98.9317,78.0138)">
                <path className="logo-path" d="M0,26.932L3.374,19.118C6.335,20.98 10.658,22.123 14.566,22.123C18.355,22.123 19.6,21.282 19.6,19.897C19.6,15.509 0.652,20.501 0.652,7.458C0.652,1.324 6.218,-3.366 16.285,-3.366C20.784,-3.366 25.759,-2.404 28.957,-0.6L25.583,7.156C22.383,5.354 19.185,4.752 16.344,4.752C12.553,4.752 11.191,5.834 11.191,7.034C11.191,11.542 30.082,6.674 30.082,19.597C30.082,25.61 24.634,30.298 14.212,30.298C8.764,30.298 3.139,28.917 0,26.932" />
              </g>
              <g transform="matrix(1,0,0,1,36.8464,31.0964)">
                <path className="logo-path" d="M0,15.631C5.151,13.106 8.112,8.537 8.112,2.345C8.112,-7.272 1.006,-13.223 -10.304,-13.223L-29.244,-13.223L-17.528,5.996L-17.528,-3.845L-11.015,-3.845C-6.159,-3.845 -3.73,-1.561 -3.73,2.345C-3.73,6.195 -6.159,8.477 -11.015,8.477L-16.015,8.477L-3.594,28.854L8.942,28.854L0,15.631Z" />
              </g>
              <g transform="matrix(1,0,0,1,29.7953,12.2248)">
                <path className="logo-path" d="M0,-7.787L0,-7.097C0,-5.333 -1.419,-3.891 -3.156,-3.891C-4.891,-3.891 -6.31,-5.333 -6.31,-7.097L-6.31,-7.787L-10.518,-7.787L-10.518,-7.097C-10.518,-5.333 -11.937,-3.891 -13.672,-3.891C-15.409,-3.891 -16.828,-5.333 -16.828,-7.097L-16.828,-7.787L-22.192,-7.787L-22.192,0L4.719,0L4.719,-7.787L0,-7.787Z" />
              </g>
            </g>
          </g>
        </svg>
      </div>
 
      {/* Decorative dot grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(2,32,170,0.025)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
 
      <div className="container mx-auto px-6 relative z-10">
        {/* Mobile Header */}
        <div className="md:hidden mb-2">
          <SectionEyebrow label="Meet The Team" />
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              The People Behind <span style={{ color: BB }}>Our Success</span>
            </h2>
          </div>
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
            className="relative pt-12 md:pt-32 pb-4"
          >
            {/* Desktop Header aligned beside the head */}
            <div className="hidden md:block absolute top-[30px] left-[42%] lg:left-[45%] z-30 pr-8">
              <SectionEyebrow label="Meet The Team" />
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                The People Behind <span style={{ color: BB }}>Our Success</span>
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-stretch bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 group relative rounded-3xl md:rounded-none overflow-visible shadow-2xl md:shadow-none">
              {/* Image Side */}
              <div className="md:w-2/5 relative min-h-[380px] md:min-h-[480px] overflow-visible">
                <img
                  src={teamLeader.image}
                  alt={teamLeader.name}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 w-[90%] md:w-[115%] max-w-none h-[115%] md:h-[135%] object-contain object-bottom z-20 filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)] transition-transform duration-700 group-hover:scale-[1.03] origin-bottom pointer-events-none -translate-y-10 md:translate-y-0"
                />
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-gray-900/95 pointer-events-none z-30 md:z-10" />
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
