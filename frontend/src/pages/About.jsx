import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import TeamSection from '../components/TeamSection'

const BB = '#0220aa'
const BG = '#ffd22a'
 
// Faint outline logo SVG for repeating background patterns
const svgLogoOutline = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 761 592' width='120' height='93'%3E%3Cg id='Page-1' transform='matrix(4.16667,0,0,4.16667,0,0)' fill='none' stroke='%23cbd5e1' stroke-width='0.6'%3E%3Crect x='0' y='0' width='182.451' height='141.906' fill='none' stroke='none'/%3E%3Cg id='Layer-1'%3E%3Cg transform='matrix(1,0,0,1,58.0725,46.7847)'%3E%3Cpath d='M0,-6.249L13.148,-6.249C12.555,-9.675 10.067,-11.84 6.574,-11.84C3.078,-11.84 0.652,-9.675 0,-6.249M23.511,-0.239L0.178,-0.239C1.125,3.068 3.908,4.992 8.053,4.992C11.193,4.992 13.265,4.091 15.455,2.167L21.379,8.418C18.299,11.905 13.797,13.707 7.699,13.707C-3.73,13.707 -11.132,6.553 -11.132,-3.183C-11.132,-12.982 -3.613,-19.956 6.515,-19.956C15.989,-19.956 23.687,-13.822 23.687,-3.064C23.687,-2.223 23.569,-1.14 23.511,-0.239' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,85.2877,46.3407)'%3E%3Cpath d='M0,-18.97L11.251,-18.97L11.197,15.748L0,4.469L0,-18.97ZM-1.243,-28.647C-1.243,-32.074 1.482,-34.718 5.625,-34.718C9.77,-34.718 12.494,-32.256 12.494,-28.828C12.494,-25.221 9.77,-22.576 5.625,-22.576C1.482,-22.576 -1.243,-25.221 -1.243,-28.647' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,125.288,56.4668)'%3E%3Cpath d='M0,-13.948C0,-17.915 -2.961,-20.56 -6.987,-20.56C-11.015,-20.56 -14.034,-17.915 -14.034,-13.948C-14.034,-9.979 -11.015,-7.276 -6.987,-7.276C-2.961,-7.276 0,-9.979 0,-13.948M11.132,-29.097L11.132,-2.466C11.132,9.856 4.264,15.688 -7.699,15.688C-13.856,15.688 -19.72,14.244 -23.626,11.417L-19.542,3.425C-16.878,5.587 -12.494,6.912 -8.705,6.912C-2.664,6.912 -0.119,4.148 -0.119,-0.964L-0.119,-2.045C-2.309,0.539 -5.566,1.8 -9.652,1.8C-18.179,1.8 -25.405,-4.329 -25.405,-13.948C-25.405,-23.506 -18.179,-29.636 -9.652,-29.636C-5.212,-29.636 -1.777,-28.194 0.415,-25.128L0.415,-29.097L11.132,-29.097Z' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,174.848,45.4656)'%3E%3Cpath d='M0,-4.149L0,14.487L-11.251,14.487L-11.251,-2.284C-11.251,-6.974 -13.265,-8.956 -16.522,-8.956C-20.133,-8.956 -22.918,-6.674 -22.918,-1.263L-22.918,14.487L-34.169,14.487L-34.169,-18.095L-23.45,-18.095L-23.45,-14.547C-20.904,-17.253 -17.291,-18.636 -13.265,-18.636C-5.744,-18.636 0,-14.248 0,-4.149' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,44.2505,82.3759)'%3E%3Cpath d='M0,8.175L-5.329,-5.289L-10.658,8.175L0,8.175ZM3.435,16.951L-14.093,16.951L-17.352,25.126L-29.311,25.126L-11.015,-16.951L0.534,-16.951L18.892,25.126L6.693,25.126L3.435,16.951Z' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,85.3564,78.1485)'%3E%3Cpath d='M0,13.003C0,8.074 -2.902,5.31 -6.693,5.31C-10.541,5.31 -13.443,8.074 -13.443,13.003C-13.443,17.993 -10.541,20.818 -6.693,20.818C-2.902,20.818 0,17.993 0,13.003M11.019,-5.612L11.075,29.353L0.354,29.353L0.354,26.109C-1.777,28.693 -4.916,29.894 -9.061,29.894C-17.825,29.894 -24.873,23.401 -24.873,13.003C-24.873,2.665 -17.825,-3.768 -9.061,-3.768C-5.329,-3.768 -2.312,-2.687 -0.178,-0.403L-0.178,-16.891L11.019,-5.612Z' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,98.9317,78.0138)'%3E%3Cpath d='M0,26.932L3.374,19.118C6.335,20.98 10.658,22.123 14.566,22.123C18.355,22.123 19.6,21.282 19.6,19.897C19.6,15.509 0.652,20.501 0.652,7.458C0.652,1.324 6.218,-3.366 16.285,-3.366C20.784,-3.366 25.759,-2.404 28.957,-0.6L25.583,7.156C22.383,5.354 19.185,4.752 16.344,4.752C12.553,4.752 11.191,5.834 11.191,7.034C11.191,11.542 30.082,6.674 30.082,19.597C30.082,25.61 24.634,30.298 14.212,30.298C8.764,30.298 3.139,28.917 0,26.932' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,36.8464,31.0964)'%3E%3Cpath d='M0,15.631C5.151,13.106 8.112,8.537 8.112,2.345C8.112,-7.272 1.006,-13.223 -10.304,-13.223L-29.244,-13.223L-17.528,5.996L-17.528,-3.845L-11.015,-3.845C-6.159,-3.845 -3.73,-1.561 -3.73,2.345C-3.73,6.195 -6.159,8.477 -11.015,8.477L-16.015,8.477L-3.594,28.854L8.942,28.854L0,15.631Z' /%3E%3C/g%3E%3Cg transform='matrix(1,0,0,1,29.7953,12.2248)'%3E%3Cpath d='M0,-7.787L0,-7.097C0,-5.333 -1.419,-3.891 -3.156,-3.891C-4.891,-3.891 -6.31,-5.333 -6.31,-7.097L-6.31,-7.787L-10.518,-7.787L-10.518,-7.097C-10.518,-5.333 -11.937,-3.891 -13.672,-3.891C-15.409,-3.891 -16.828,-5.333 -16.828,-7.097L-16.828,-7.787L-22.192,-7.787L-22.192,0L4.719,0L4.719,-7.787L0,-7.787Z' /%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;


// ── Shared Primitives ────────────────────────────────────────
const SectionEyebrow = ({ label }) => (
  <div className="flex items-center gap-3 mb-3">
    <span className="h-1 w-7 rounded-full inline-block" style={{ background: BG }} />
    <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>{label}</p>
  </div>
)

const SectionRule = () => (
  <motion.div
    className="mt-5 mb-12 h-px bg-gray-100"
    initial={{ scaleX: 0, originX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
  />
)

// ── Animated Counter ─────────────────────────────────────────
const Counter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    let s = 0; const inc = end / 120
    const t = setInterval(() => { s += inc; if (s >= end) { setCount(end); clearInterval(t) } else setCount(Math.floor(s)) }, 1000/60)
    return () => clearInterval(t)
  }, [started, end])
  return <span ref={ref}>{count}{suffix}</span>
}

// ── Page Hero (reusable pattern) ─────────────────────────────
const PageHero = ({ eyebrow, title, highlight, sub, actions }) => (
  <section className="relative bg-white overflow-hidden" style={{ paddingTop: 'clamp(100px, 14vh, 150px)', paddingBottom: '4rem' }}>
    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: BG }} />
    <div className="absolute inset-0 opacity-[0.025]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,32,170,1)_1px,transparent_1px),linear-gradient(90deg,rgba(2,32,170,1)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
    <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
      <motion.div 
        className="max-w-4xl flex flex-col items-center"
        initial={{ opacity: 0, y: 28 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
      >
        <div className="flex items-center gap-3 mb-4 justify-center">
          <span className="h-px w-8 inline-block" style={{ background: BG }} />
          <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>{eyebrow}</p>
          <span className="h-px w-8 inline-block" style={{ background: BG }} />
        </div>
        <h1 className="font-black text-gray-900 leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          {title}{' '}<span style={{ color: BB }}>{highlight}</span>
        </h1>
        {sub && <p className="text-gray-500 text-base max-w-xl leading-relaxed mb-8 mx-auto text-center">{sub}</p>}
        {actions}
      </motion.div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB }} />
  </section>
)

// ────────────────────────────────────────────────────────────
const About = () => {
  const values = [
    {
      icon: <img src="/images/about/innovation.png" alt="Innovation" className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(82%) saturate(5260%) hue-rotate(235deg) brightness(79%) contrast(124%)' }} />,
      title: 'Innovation',
      desc: 'Constantly pushing boundaries with cutting-edge technology and creative solutions that set new industry standards.'
    },
    {
      icon: <img src="/images/about/excellence.png" alt="Excellence" className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(82%) saturate(5260%) hue-rotate(235deg) brightness(79%) contrast(124%)' }} />,
      title: 'Excellence',
      desc: 'Unwavering commitment to quality in every project, from concept to execution, delivering superior results.'
    },
    {
      icon: <img src="/images/about/integrity.png" alt="Integrity" className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(82%) saturate(5260%) hue-rotate(235deg) brightness(79%) contrast(124%)' }} />,
      title: 'Integrity',
      desc: 'Building trust through transparency, honesty, and ethical business practices in all our partnerships.'
    },
    {
      icon: <img src="/images/about/client-focus.png" alt="Client Focus" className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(82%) saturate(5260%) hue-rotate(235deg) brightness(79%) contrast(124%)' }} />,
      title: 'Client Focus',
      desc: 'Putting our clients first, understanding their needs, and delivering solutions that exceed expectations.'
    },
    {
      icon: <img src="/images/about/agility.png" alt="Agility" className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(82%) saturate(5260%) hue-rotate(235deg) brightness(79%) contrast(124%)' }} />,
      title: 'Agility',
      desc: 'Adapting quickly to market changes and client needs with flexible, responsive service delivery.'
    },
    {
      icon: <img src="/images/about/creativity.png" alt="Creativity" className="w-8 h-8 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(82%) saturate(5260%) hue-rotate(235deg) brightness(79%) contrast(124%)' }} />,
      title: 'Creativity',
      desc: 'Bringing bold, imaginative ideas to life that capture attention and create lasting brand impact.'
    },
  ]
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Since 2015"
        title="Uganda's Premier"
        highlight="Outdoor Advertising Partner"
        sub="Headquartered in Kampala, we've evolved from a local startup to a regional powerhouse in Out-of-Home advertising — delivering unmatched brand visibility across East Africa."
        actions={
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact">
              <button className="px-7 py-3 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
                style={{ background: BB }}
                onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
                onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
                Get In Touch →
              </button>
            </Link>
            <Link to="/portfolio">
              <button className="px-7 py-3 text-xs font-extrabold uppercase tracking-widest border-2 transition-all"
                style={{ borderColor: BB, color: BB }}
                onMouseEnter={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BB }}>
                View Portfolio
              </button>
            </Link>
          </div>
        }
      />

      {/* ── Our Story ───────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 inline-block" style={{ background: BG }} />
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>Our Story</p>
            <span className="h-px w-8 inline-block" style={{ background: BG }} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            A Journey of <span style={{ color: BB }}>Excellence</span>
          </h2>
 
          <div className="w-full max-w-4xl mx-auto">
            <SectionRule />
          </div>
 
          <div className="grid md:grid-cols-2 gap-8 w-full text-left">
            {[
              'Established in 2015, Reign Ads Limited emerged with a clear vision: to revolutionize outdoor advertising in East Africa. What started as a bold ambition has grown into a dominant force in the industry — spanning spectacular billboards, LED screens, wall branding, and comprehensive agency services.',
              'We pride ourselves on our 360° approach to advertising solutions. Whether it\'s dominating major highways with spectacular billboards, transforming buildings with wall branding, or creating mobile visibility through automobile graphics, we deliver campaigns that don\'t just get seen — they get remembered.',
            ].map((text, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-gray-500 text-sm leading-relaxed">{text}</motion.p>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[['2015', 'Founded in Kampala'], ['2017', 'First 10 Locations'], ['2020', 'LED Screen Launch'], ['2024', '6+ Cities Covered']].map(([yr, label], i) => (
              <motion.div key={yr} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="text-center p-5 border border-gray-200 bg-white">
                <div className="text-xl font-black mb-1" style={{ color: BB }}>{yr}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── Mission & Vision ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white md:overflow-visible overflow-hidden relative border-t border-b border-gray-100">
        {/* Repeating Reign Ads Logo outline background pattern (Static / Fixed) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.55]"
          style={{
            backgroundImage: `url("${svgLogoOutline}")`,
            backgroundSize: '180px 140px',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'fixed'
          }}
        />
 
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 inline-block" style={{ background: BG }} />
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>Who We Are</p>
            <span className="h-px w-8 inline-block" style={{ background: BG }} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            Mission &amp; <span style={{ color: BB }}>Vision</span>
          </h2>
 
          <div className="w-full max-w-4xl mx-auto">
            <SectionRule />
          </div>
 
          <div className="max-w-4xl mx-auto flex flex-col gap-24 mt-20">
            {/* Mission Card (Horizontal panel with left overlap) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 12, y: -4 }}
              className="group relative w-full bg-gradient-to-r from-gray-950 via-[#03091e] to-gray-950 border border-white/5 hover:border-[#0220aa]/40 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6 md:gap-12 transition-all duration-500 ease-out shadow-2xl"
              style={{
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
              }}
            >
              {/* Radial Ambient Glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-blue-600/5 rounded-3xl blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
 
              {/* Billboard structural wireframe grid lines */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
 
              {/* 3D Floating Target Artwork (Overlaps Left border) */}
              <div className="relative w-[260px] md:w-[320px] h-[200px] md:h-[240px] flex-shrink-0 flex items-center justify-center -mt-20 md:-mt-0 md:-ml-24 z-20">
                <motion.img
                  src="/images/about/mission1.png"
                  alt="Our Mission"
                  className="max-w-[280px] md:max-w-[360px] max-h-full object-contain filter drop-shadow-[0_25px_50px_rgba(2,32,170,0.5)] group-hover:drop-shadow-[0_30px_60px_rgba(2,32,170,0.7)] select-none pointer-events-none"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
              </div>
 
              {/* Text Content */}
              <div className="relative z-10 flex-1 text-center md:text-left pb-4 md:pb-0 md:pl-6 md:border-l border-white/10">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="h-1 w-5 rounded-full" style={{ background: BB }} />
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wider">Our Mission</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  To evolve and define the future of brand and media visibility through innovation, creativity, communication, and excellence — delivering integrated advertising solutions that transform brands into market leaders.
                </p>
                <div className="mt-6 h-[2px] w-0 group-hover:w-20 transition-all duration-500" style={{ background: BB }} />
              </div>
            </motion.div>
 
            {/* Vision Card (Horizontal panel with right overlap) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              whileHover={{ x: -12, y: -4 }}
              className="group relative w-full bg-gradient-to-r from-gray-950 via-[#03091e] to-gray-950 border border-white/5 hover:border-slate-400/40 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12 transition-all duration-500 ease-out shadow-2xl"
              style={{
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
              }}
            >
              {/* Radial Ambient Glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-slate-300/5 rounded-3xl blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
 
              {/* Billboard structural wireframe grid lines */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
 
              {/* 3D Floating Bulb Artwork (Overlaps Right border) */}
              <div className="relative w-[240px] md:w-[300px] h-[200px] md:h-[240px] flex-shrink-0 flex items-center justify-center -mt-20 md:-mt-0 md:-mr-20 z-20">
                <motion.img
                  src="/images/about/vision1.png"
                  alt="Our Vision"
                  className="max-w-[250px] md:max-w-[320px] max-h-full object-contain filter drop-shadow-[0_25px_50px_rgba(253,186,116,0.4)] group-hover:drop-shadow-[0_30px_60px_rgba(253,186,116,0.6)] select-none pointer-events-none"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                />
              </div>
 
              {/* Text Content */}
              <div className="relative z-10 flex-1 text-center md:text-left pb-4 md:pb-0 md:pr-6 md:border-r border-white/10">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <span className="h-1 w-5 rounded-full" style={{ background: BG }} />
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-wider">Our Vision</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  To be the outstanding outdoor advertising company in East Africa and beyond, delivering exceptional experiences and innovation that set industry standards and redefine brand visibility.
                </p>
                <div className="mt-6 h-[2px] w-0 group-hover:w-20 transition-all duration-500" style={{ background: BG }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ─────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 inline-block" style={{ background: BG }} />
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>What Drives Us</p>
            <span className="h-px w-8 inline-block" style={{ background: BG }} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            Our Core <span style={{ color: BB }}>Values</span>
          </h2>
 
          <div className="w-full max-w-4xl mx-auto">
            <SectionRule />
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group p-7 border border-gray-100 bg-white hover:border-blue-200 hover:bg-gray-50 transition-all duration-300">
                <div className="mb-4 shake-on-group-hover">{v.icon}</div>
                <h3 className="font-black text-gray-900 text-base mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                <motion.div className="mt-4 h-[2px] w-0 group-hover:w-12 transition-all duration-500" style={{ background: BB }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Message From CEO (Parallax) ───────────────── */}
      <section
        className="relative py-24 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url('/images/about/ceo-bg.png')` }}
      >
        {/* Blue/Dark Overlay */}
        <div className="absolute inset-0 bg-[#0220aa]/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-blue-900/60 to-blue-950/80" />

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-wider text-yellow-400 uppercase">
              Message From The CEO
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative bg-white shadow-2xl p-8 md:p-12"
            style={{
              borderBottomRightRadius: '80px',
              boxShadow: '0 20px 40px rgba(2,32,170,0.15)'
            }}
          >
            {/* The Page Curl Effect */}
            <div
              className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tr from-transparent via-gray-200 to-gray-300 pointer-events-none"
              style={{
                borderTopLeftRadius: '85px',
                boxShadow: '-10px -10px 20px rgba(0,0,0,0.1)',
                borderLeft: '1px solid rgba(0,0,0,0.06)',
                borderTop: '1px solid rgba(0,0,0,0.06)'
              }}
            />

            {/* CEO Text */}
            <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                <span className="font-bold text-gray-900" style={{ color: BB }}>At Reign Ads Limited</span>, we believe that outdoor advertising is more than just visibility. It is about creating lasting impressions that connect brands with people in meaningful ways.
              </p>
              <p>
                Since our establishment in 2015, we have grown into a trusted leader in out-of-home advertising, offering innovative solutions that combines creativity, technology and strategic placement of adverts.
              </p>
              <p>
                Our portfolio spans from digital & static billboards, exterior & interior branding, streetpole & suburban signs advertising, kilometre marker signs, vehicle branding, fabrication works, trade marketing, and printing services, to give our clients a one stop solution.
              </p>
              <p className="italic font-medium text-gray-950">
                Reign Ads' vision is simple yet powerful: <strong style={{ color: BB }}>to be the trusted partner for brands that dare to stand out, inspire, and lead.</strong> We are committed to transforming everyday spaces into dynamic storytelling platforms that elevate businesses and enrich communities.
              </p>
              <p>
                With end-to-end production, installation, and events management, we ensure every brand presence is consistent, relevant, and unforgettable.
              </p>

              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-black text-gray-950 text-base" style={{ color: BB }}>CEO Reign Ads</h4>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Team Section ────────────────────────────── */}
      <TeamSection />

      {/* ── CTA (Minimal Creative Agency Theme) ───────────────── */}
      <section className="py-20 bg-white border-t border-gray-150 relative overflow-hidden">
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
                <span className="h-[2px] w-5 rounded-full inline-block" style={{ background: BG }} />
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
                  className="px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 transform hover:-translate-y-0.5"
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

export default About
