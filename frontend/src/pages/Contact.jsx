import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../services/api'
import useJQueryValidation from '../hooks/useJQueryValidation'

const BB = '#0220aa'
const BG = '#ffd22a'

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Address', value: 'Plot 35, Kanjokya Street\nKampala, Uganda',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone', value: '+256 706 829 331', href: 'tel:+256706829331',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email', value: 'sales@reignads.co.ug', href: 'mailto:sales@reignads.co.ug',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Working Hours', value: 'Mon – Fri, 8:00 AM – 6:00 PM EAT',
  },
]

const InputField = ({ label, required, children }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: BB }}>
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
  </div>
)

const fieldClass = `w-full px-4 py-3 border border-gray-200 text-gray-900 text-sm placeholder:text-gray-300 outline-none transition-colors bg-white focus:border-blue-400`

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  // ── jQuery Validation ──────────────────────────────────
  const { triggerValidation } = useJQueryValidation(
    'contact-form',
    {
      name:    { required: true, minlength: 2 },
      email:   { required: true, email: true },
      phone:   { minlength: 7 },
      message: { required: true, minlength: 10 },
    },
    {
      name:    { required: 'Please enter your name', minlength: 'Name must be at least 2 characters' },
      email:   { required: 'Please enter your email address', email: 'Please enter a valid email' },
      phone:   { minlength: 'Phone number seems too short' },
      message: { required: 'Please write your message', minlength: 'Message should be at least 10 characters' },
    },
    null   // submitHandler handled by React below
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!triggerValidation()) return   // stop if jQuery Validate fails

    setStatus('sending')
    try {
      await api.post('/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <div className="bg-white">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden" style={{ paddingTop: 'clamp(100px, 14vh, 150px)', paddingBottom: '4rem' }}>
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: BG }} />
        <div className="absolute inset-0 opacity-[0.025]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(2,32,170,1)_1px,transparent_1px),linear-gradient(90deg,rgba(2,32,170,1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>Let's Talk</p>
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
            </div>
            <h1 className="font-black text-gray-900 leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Get In <span style={{ color: BB }}>Touch</span>
            </h1>
            <p className="text-gray-500 text-base max-w-xl leading-relaxed">
              Ready to put your brand in the spotlight? Our team is here to help you plan your next campaign across Uganda.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB }} />
      </section>

      {/* ── Contact Grid ────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Left: Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
              className="lg:col-span-2 space-y-0">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Contact <span style={{ color: BB }}>Information</span></h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">Whether you're launching a campaign or just exploring options — we're always ready to help.</p>

              <div className="space-y-4 mb-10">
                {contactInfo.map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 p-4 border border-gray-100 group hover:border-blue-100 transition-colors">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center text-white" style={{ background: BB }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: BB }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="text-gray-600 text-sm hover:text-blue-700 transition-colors whitespace-pre-line">{item.value}</a>
                        : <p className="text-gray-600 text-sm whitespace-pre-line">{item.value}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <a href="tel:+256706829331" className="flex items-center justify-center gap-2 py-3 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
                  style={{ background: BB }}
                  onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
                  onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
                  📞 Call Now
                </a>
                <a href="mailto:sales@reignads.co.ug" className="flex items-center justify-center gap-2 py-3 text-xs font-extrabold uppercase tracking-widest border-2 transition-all"
                  style={{ borderColor: BB, color: BB }}
                  onMouseEnter={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BB }}>
                  ✉ Email Us
                </a>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
              className="lg:col-span-3 bg-gray-50 border border-gray-100 p-8 md:p-10">
              <h3 className="text-xl font-black text-gray-900 mb-1">Send Us a Message</h3>
              <p className="text-gray-400 text-xs mb-7">We'll get back to you within 24 hours.</p>

              <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                <InputField label="Your Name" required>
                  <input type="text" name="name" placeholder="Your name"
                    value={form.name} onChange={e => set('name', e.target.value)}
                    className={fieldClass} />
                </InputField>

                <div className="grid md:grid-cols-2 gap-5">
                  <InputField label="Email Address" required>
                    <input type="email" name="email" placeholder="john@company.com"
                      value={form.email} onChange={e => set('email', e.target.value)}
                      className={fieldClass} />
                  </InputField>
                  <InputField label="Phone Number">
                    <input type="tel" name="phone" placeholder="+256 700 000 000"
                      value={form.phone} onChange={e => set('phone', e.target.value)}
                      className={fieldClass} />
                  </InputField>
                </div>

                <InputField label="Subject">
                  <input type="text" name="subject" placeholder="Campaign Inquiry"
                    value={form.subject} onChange={e => set('subject', e.target.value)}
                    className={fieldClass} />
                </InputField>

                <InputField label="Your Message" required>
                  <textarea name="message" placeholder="Tell us about your project..." rows={5}
                    value={form.message} onChange={e => set('message', e.target.value)}
                    className={`${fieldClass} resize-none`} />
                </InputField>

                <motion.button type="submit" disabled={status === 'sending'}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 text-xs font-extrabold uppercase tracking-widest text-white transition-all disabled:opacity-50"
                  style={{ background: BB }}
                  onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB } }}
                  onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
                  {status === 'sending' ? 'Sending…' : 'Send Message →'}
                </motion.button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="p-4 border text-sm font-semibold text-center" style={{ borderColor: '#16a34a', background: '#f0fdf4', color: '#15803d' }}>
                      ✓ Message sent! We'll get back to you soon.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="p-4 border text-sm font-semibold text-center" style={{ borderColor: '#dc2626', background: '#fef2f2', color: '#dc2626' }}>
                      ✗ Failed to send. Please call us directly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map ──────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 pb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="border border-gray-100 overflow-hidden" style={{ height: 450 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7472758938516!2d32.58952807496463!3d0.34192179965472486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbba175b2a637%3A0x31a0d0aaeddf7d0f!2sReign%20Ads%20Limited!5e0!3m2!1sen!2sug!4v1773099150614!5m2!1sen!2sug"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              // className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
