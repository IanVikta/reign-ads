import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Brand: Royal Azure #0220aa, Golden Dream #ffd22a
const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/18RszgKuHv/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/reignadslimited?igsh=amRlOWZkNzBuM2Mz',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    url: 'https://x.com/Reignads1',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.744l7.736-8.857L1.839 2.25H8.33l4.258 5.63 5.655-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

const quickLinks = ['Home', 'About', 'Services', 'Portfolio', 'Clients', 'Contact']
const serviceList = [
  'Spectacular Billboards',
  'LED Screens',
  'Wall Branding',
  'Automobile Branding',
  'Fabrication',
  'Large Format Printing',
]

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-2 mb-5">
    <div className="h-px w-5" style={{ background: BRAND_GOLD }} />
    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/50">{children}</h4>
  </div>
)

const Footer = () => {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => { setSubscribed(false); setEmail('') }, 3500)
    }
  }

  return (
    <footer style={{ background: '#07090f' }}>

      {/* Gold top rule */}
      <div className="h-[3px]" style={{ background: BRAND_GOLD }} />

      <div className="container mx-auto px-6">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-16 pb-12">

          {/* Brand col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4"
          >
            <Link to="/" className="inline-block mb-6">
              <img
                src="/images/logo/png logo white.png"
                alt="Reign Ads"
                className="h-12 w-auto"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              {/* Fallback text logo */}
              <span className="text-2xl font-black text-white tracking-widest">REIGN ADS</span>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              <span className="font-bold" style={{ color: BRAND_GOLD }}>Taking your brand places.</span>{' '}
              East Africa's premier outdoor advertising company since 2015.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { val: '9+', label: 'Years' },
                { val: '500+', label: 'Projects' },
                { val: '100+', label: 'Clients' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center py-3 border border-white/10"
                >
                  <div className="text-lg font-black" style={{ color: BRAND_GOLD }}>{s.val}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Social icons */}
            <SectionLabel>Connect</SectionLabel>
            <div className="flex gap-2">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  aria-label={s.name}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/50 transition-all"
                  style={{ transition: 'border-color 0.2s, color 0.2s' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = BRAND_GOLD
                    e.currentTarget.style.color = BRAND_GOLD
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.50)'
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
          >
            <SectionLabel>Navigate</SectionLabel>
            <ul className="space-y-2.5">
              {quickLinks.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="w-0 h-px group-hover:w-4 transition-all duration-300"
                      style={{ background: BRAND_GOLD }}
                    />
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-3"
          >
            <SectionLabel>Services</SectionLabel>
            <ul className="space-y-2.5">
              {serviceList.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.04 }}
                  className="text-sm text-white/40 hover:text-white transition-colors cursor-pointer flex items-center gap-2 group"
                >
                  <span
                    className="w-1 h-1 rounded-full flex-shrink-0 transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  />
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <SectionLabel>Get In Touch</SectionLabel>
            <div className="space-y-4 mb-8">
              {[
                { label: 'Address', value: 'Plot 35, Kanjokya Street\nKampala, Uganda' },
                { label: 'Phone', value: '+256 706 829 331', href: 'tel:+256706829331' },
                { label: 'Email', value: 'sales@reignads.co.ug', href: 'mailto:sales@reignads.co.ug' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: BRAND_GOLD }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-white/50 whitespace-pre-line">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <SectionLabel>Newsletter</SectionLabel>
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-extrabold uppercase tracking-widest transition-all"
                    style={{ background: BRAND_GOLD, color: BRAND_BLUE }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.background = BRAND_GOLD }}
                  >
                    Subscribe
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 py-3"
                >
                  <span className="text-xl">✓</span>
                  <p className="text-sm font-semibold text-white/70">Thank you for subscribing!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {year}{' '}
            <span className="text-white/60 font-bold">Reign Ads Limited</span>. All Rights Reserved.
            <span className="mx-2 text-white/10">|</span>
            OUTDOOR · BRANDING · PRINT
          </p>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/60 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Bottom brand rule */}
      <div className="h-[3px]" style={{ background: BRAND_BLUE }} />
    </footer>
  )
}

export default Footer
