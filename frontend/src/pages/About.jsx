import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import TeamSection from '../components/TeamSection'

const BB = '#0220aa'
const BG = '#ffd22a'

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
    <div className="container mx-auto px-6 relative z-10">
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 inline-block" style={{ background: BG }} />
          <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>{eyebrow}</p>
          <span className="h-px w-8 inline-block" style={{ background: BG }} />
        </div>
        <h1 className="font-black text-gray-900 leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          {title}{' '}<span style={{ color: BB }}>{highlight}</span>
        </h1>
        {sub && <p className="text-gray-500 text-base max-w-xl leading-relaxed mb-8">{sub}</p>}
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
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovation',
      desc: 'Constantly pushing boundaries with cutting-edge technology and creative solutions that set new industry standards.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Excellence',
      desc: 'Unwavering commitment to quality in every project, from concept to execution, delivering superior results.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Integrity',
      desc: 'Building trust through transparency, honesty, and ethical business practices in all our partnerships.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Client Focus',
      desc: 'Putting our clients first, understanding their needs, and delivering solutions that exceed expectations.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Agility',
      desc: 'Adapting quickly to market changes and client needs with flexible, responsive service delivery.'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-3.078-3.078a3.007 3.007 0 00-3.078 3.078a3 3 0 006.156 0zm0 0h5.656C17 16.122 20 14 20 10.5C20 7 17.5 4 12 4C6.5 4 4 7 4 10.5c0 1.25.5 2.5 1.5 3" />
        </svg>
      ),
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
          <div className="flex flex-wrap gap-3">
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

      {/* ── Mission & Vision ────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          <SectionEyebrow label="Who We Are" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">Mission &amp; <span style={{ color: BB }}>Vision</span></h2>
          </div>
          <SectionRule />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Card 1: Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group border border-gray-100 bg-white hover:border-blue-200 transition-all duration-300 flex flex-col"
              style={{ boxShadow: '0 8px 30px rgba(2,32,170,0.03)' }}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src="/images/about/mission.jpg"
                  alt="Our Mission"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase tracking-wider text-white" style={{ background: BB }}>
                  Mission
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-3" style={{ color: BB }}>Our Mission</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    To evolve and define the future of brand and media visibility through innovation, creativity, communication, and excellence — delivering integrated advertising solutions that transform brands into market leaders.
                  </p>
                </div>
                <div className="mt-6 h-[2px] w-0 group-hover:w-16 transition-all duration-500" style={{ background: BG }} />
              </div>
            </motion.div>

            {/* Card 2: Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group border border-gray-100 bg-white hover:border-blue-200 transition-all duration-300 flex flex-col"
              style={{ boxShadow: '0 8px 30px rgba(2,32,170,0.03)' }}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src="/images/about/vision.jpg"
                  alt="Our Vision"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase tracking-wider text-white" style={{ background: BB }}>
                  Vision
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-3" style={{ color: BB }}>Our Vision</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    To be the outstanding outdoor advertising company in East Africa and beyond, delivering exceptional experiences and innovation that set industry standards and redefine brand visibility.
                  </p>
                </div>
                <div className="mt-6 h-[2px] w-0 group-hover:w-16 transition-all duration-500" style={{ background: BG }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Story ───────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionEyebrow label="Our Story" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">A Journey of <span style={{ color: BB }}>Excellence</span></h2>
          </div>
          <SectionRule />
          <div className="grid md:grid-cols-2 gap-8">
            {[
              'Established in 2015, Reign Ads Limited emerged with a clear vision: to revolutionize outdoor advertising in East Africa. What started as a bold ambition has grown into a dominant force in the industry — spanning spectacular billboards, LED screens, wall branding, and comprehensive agency services.',
              'We pride ourselves on our 360° approach to advertising solutions. Whether it\'s dominating major highways with spectacular billboards, transforming buildings with wall branding, or creating mobile visibility through automobile graphics, we deliver campaigns that don\'t just get seen — they get remembered.',
            ].map((text, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-gray-500 text-sm leading-relaxed">{text}</motion.p>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
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

      {/* ── Core Values ─────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          <SectionEyebrow label="What Drives Us" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">Our Core <span style={{ color: BB }}>Values</span></h2>
          </div>
          <SectionRule />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group p-7 border border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-white transition-all duration-300">
                <div className="mb-4 transition-transform group-hover:scale-110" style={{ color: BG }}>{v.icon}</div>
                <h3 className="font-black text-gray-900 text-base mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                <motion.div className="mt-4 h-[2px] w-0 group-hover:w-12 transition-all duration-500" style={{ background: BB }} />
              </motion.div>
            ))}
          </div>
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
