import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

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
    { icon: '◈', title: 'Innovation', desc: 'Constantly pushing boundaries with cutting-edge technology and creative solutions that set new industry standards.' },
    { icon: '◆', title: 'Excellence', desc: 'Unwavering commitment to quality in every project, from concept to execution, delivering superior results.' },
    { icon: '◇', title: 'Integrity', desc: 'Building trust through transparency, honesty, and ethical business practices in all our partnerships.' },
    { icon: '△', title: 'Client Focus', desc: 'Putting our clients first, understanding their needs, and delivering solutions that exceed expectations.' },
    { icon: '○', title: 'Agility', desc: 'Adapting quickly to market changes and client needs with flexible, responsive service delivery.' },
    { icon: '☆', title: 'Creativity', desc: 'Bringing bold, imaginative ideas to life that capture attention and create lasting brand impact.' },
  ]

  const stats = [
    { v: 9, s: '+', l: 'Years Experience' },
    { v: 70, s: '+', l: 'Locations' },
    { v: 100, s: '+', l: 'Clients Served' },
    { v: 500, s: '+', l: 'Campaigns' },
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

      {/* ── Stats ──────────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                className="border border-gray-200 bg-white py-8 text-center hover:border-blue-100 transition-colors">
                <div className="text-3xl font-black mb-1" style={{ color: BB }}><Counter end={s.v} suffix={s.s} /></div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          <SectionEyebrow label="Who We Are" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">Mission &amp; <span style={{ color: BB }}>Vision</span></h2>
          </div>
          <SectionRule />
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
              className="relative">
              <div className="aspect-video overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(2,32,170,0.10)' }}>
                <img src="/images/billboards/billboard1.JPG" alt="About Reign Ads" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full -z-10 border-2" style={{ borderColor: `${BG}80` }} />
            </motion.div>
            {/* Text */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }} className="space-y-8">
              {[
                { heading: 'Our Mission', text: 'To evolve and define the future of brand and media visibility through innovation, creativity, communication, and excellence — delivering integrated advertising solutions that transform brands into market leaders.' },
                { heading: 'Our Vision', text: 'To be the outstanding outdoor advertising company in East Africa and beyond, delivering exceptional experiences and innovation that set industry standards and redefine brand visibility.' },
              ].map(item => (
                <div key={item.heading} className="border-l-4 pl-6" style={{ borderColor: BB }}>
                  <h3 className="text-lg font-black text-gray-900 mb-2" style={{ color: BB }}>{item.heading}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
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
                <div className="text-2xl mb-4 font-black transition-transform group-hover:scale-110" style={{ color: BG }}>{v.icon}</div>
                <h3 className="font-black text-gray-900 text-base mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                <motion.div className="mt-4 h-[2px] w-0 group-hover:w-12 transition-all duration-500" style={{ background: BB }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionEyebrow label="Work With Us" />
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Ready to Work with the <span style={{ color: BB }}>Best?</span></h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">Join the elite circle of brands that trust Reign Ads to take their visibility to new heights across East Africa.</p>
            <Link to="/contact">
              <button className="px-10 py-3.5 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
                style={{ background: BB }}
                onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
                onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
                Get In Touch →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
