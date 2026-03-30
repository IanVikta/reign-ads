import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../services/api'
import useJQueryValidation from '../hooks/useJQueryValidation'

const BB = '#0220aa'
const BG = '#ffd22a'

const services = [
  'Spectacular Billboards',
  'LED Screens',
  'Wall Branding',
  'Automobile Branding',
  'Fabrication & Signage',
  'Large Format Printing',
  'Multiple Services',
]

const timelines = [
  'ASAP (Under 2 weeks)',
  '1 Month',
  '2–3 Months',
  '3–6 Months',
  '1-2 Years',
  '2 Years and Above',
  'Flexible / Ongoing',
]

const InputField = ({ label, required, hint, children }) => (
  <div>
    <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: BB }}>
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
    {children}
    {hint && <p className="mt-1 text-xs text-gray-300">{hint}</p>}
  </div>
)

const fieldClass = `w-full px-4 py-3 border border-gray-200 text-gray-900 text-sm placeholder:text-gray-300 outline-none transition-colors bg-white focus:border-blue-400`

// ─── Step 1 form ──────────────────────────────────────────────
const Step1 = ({ form, set, onNext }) => {
  const { triggerValidation } = useJQueryValidation(
    'quote-step1',
    {
      name:  { required: true, minlength: 2 },
      email: { required: true, email: true },
      phone: { required: true, minlength: 7 },
    },
    {
      name:  { required: 'Your name is required', minlength: 'At least 2 characters' },
      email: { required: 'Email address is required', email: 'Enter a valid email address' },
      phone: { required: 'Phone number is required', minlength: 'Phone number is too short' },
    },
    null
  )

  const handleNext = (e) => {
    e.preventDefault()
    if (triggerValidation()) onNext()
  }

  return (
    <form id="quote-step1" onSubmit={handleNext} noValidate className="space-y-5">
      <h3 className="text-lg font-black text-gray-900 mb-5">Your Contact Details</h3>
      <div className="grid md:grid-cols-2 gap-5">
        <InputField label="Full Name" required>
          <input type="text" name="name" placeholder="John Doe"
            value={form.name} onChange={e => set('name', e.target.value)}
            className={fieldClass} />
        </InputField>
        <InputField label="Company / Organisation">
          <input type="text" name="company" placeholder="Acme Corp"
            value={form.company} onChange={e => set('company', e.target.value)}
            className={fieldClass} />
        </InputField>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <InputField label="Email Address" required>
          <input type="email" name="email" placeholder="you@company.com"
            value={form.email} onChange={e => set('email', e.target.value)}
            className={fieldClass} />
        </InputField>
        <InputField label="Phone Number" required>
          <input type="tel" name="phone" placeholder="+256 700 000 000"
            value={form.phone} onChange={e => set('phone', e.target.value)}
            className={fieldClass} />
        </InputField>
      </div>
      <div className="pt-2">
        <button type="submit"
          className="px-8 py-3 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
          style={{ background: BB }}
          onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
          onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
          Next: Campaign Details →
        </button>
      </div>
    </form>
  )
}

// ─── Step 2 form ──────────────────────────────────────────────
const Step2 = ({ form, set, onNext, onBack }) => {
  const { triggerValidation } = useJQueryValidation(
    'quote-step2',
    {
      service: { required: true },
    },
    {
      service: { required: 'Please select a service' },
    },
    null
  )

  const handleNext = (e) => {
    e.preventDefault()
    if (triggerValidation()) onNext()
  }

  return (
    <form id="quote-step2" onSubmit={handleNext} noValidate className="space-y-5">
      <h3 className="text-lg font-black text-gray-900 mb-5">Campaign Needs</h3>

      <InputField label="Service Required" required hint="Select the primary service you're interested in">
        <select name="service" value={form.service} onChange={e => set('service', e.target.value)} className={fieldClass}>
          <option value="">Select a service…</option>
          {services.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </InputField>

      <InputField label="Campaign Timeline">
        <select name="timeline" value={form.timeline} onChange={e => set('timeline', e.target.value)} className={fieldClass}>
          <option value="">Select timeline…</option>
          {timelines.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </InputField>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack}
          className="px-5 py-3 text-xs font-extrabold uppercase tracking-widest border-2 transition-all"
          style={{ borderColor: '#e5e7eb', color: '#9ca3af' }}>
          ← Back
        </button>
        <button type="submit"
          className="px-8 py-3 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
          style={{ background: BB }}
          onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB }}
          onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
          Next: Final Details →
        </button>
      </div>
    </form>
  )
}

// ─── Step 3 form ──────────────────────────────────────────────
const Step3 = ({ form, set, onBack, status }) => {
  const { triggerValidation } = useJQueryValidation(
    'quote-step3',
    {
      message: { required: true, minlength: 15 },
    },
    {
      message: { required: 'Please describe your campaign', minlength: 'Please provide at least 15 characters' },
    },
    null
  )

  return (
    <form id="quote-step3" noValidate className="space-y-5">
      <h3 className="text-lg font-black text-gray-900 mb-5">Additional Details</h3>

      <InputField label="Preferred Billboard Locations" hint="City, road, or specific area — e.g. Kampala Road, Jinja">
        <input type="text" name="locations" placeholder="e.g. Kampala CBD, Entebbe Road…"
          value={form.locations} onChange={e => set('locations', e.target.value)}
          className={fieldClass} />
      </InputField>

      <InputField label="Tell Us More" required>
        <textarea name="message" placeholder="Describe your campaign goals, target audience, or any specific requirements…" rows={5}
          value={form.message} onChange={e => set('message', e.target.value)}
          className={`${fieldClass} resize-none`} />
      </InputField>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack}
          className="px-5 py-3 text-xs font-extrabold uppercase tracking-widest border-2 transition-all"
          style={{ borderColor: '#e5e7eb', color: '#9ca3af' }}>
          ← Back
        </button>
        {/* triggerValidation injected via data attr — handled by parent */}
        <button type="submit" form="quote-step3"
          data-submit-quote="true"
          disabled={status === 'sending'}
          className="flex-grow py-3.5 text-xs font-extrabold uppercase tracking-widest text-white transition-all disabled:opacity-50"
          style={{ background: BB }}
          onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.background = BG; e.currentTarget.style.color = BB } }}
          onMouseLeave={e => { e.currentTarget.style.background = BB; e.currentTarget.style.color = '#fff' }}>
          {status === 'sending' ? 'Submitting…' : 'Submit Quote Request →'}
        </button>
      </div>

      {status === 'error' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="p-4 border text-sm font-semibold text-center" style={{ borderColor: '#dc2626', background: '#fef2f2', color: '#dc2626' }}>
          ✗ Submission failed. Please try again or call us directly.
        </motion.div>
      )}
    </form>
  )
}

// ─── Main Page ───────────────────────────────────────────────
const GetQuote = () => {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    service: '', timeline: '', locations: '', message: '',
  })
  const [status, setStatus] = useState(null)
  const [step, setStep] = useState(1)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  // Step 3 needs its own validation call on submit
  const step3Validator = useJQueryValidation(
    'quote-step3',
    { message: { required: true, minlength: 15 } },
    { message: { required: 'Please describe your campaign', minlength: 'At least 15 characters' } },
    null
  )

  const handleFinalSubmit = async () => {
    if (!step3Validator.triggerValidation()) return
    setStatus('sending')
    try {
      // Include all form fields including the new quote-specific ones
      const quoteData = {
        ...form,
        subject: `Quote Request: ${form.service}`
      }
      
      await api.post('/contact', quoteData)
      
      // Show elegant, professional success message
      await Swal.fire({
        title: false,
        html: `
          <div style="text-align: center; padding: 16px 8px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #0220aa 0%, #1e40af 100%); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(2, 32, 170, 0.25);">
              <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <h3 style="color: #1f2937; font-size: 18px; font-weight: 700; margin: 0 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              Quote Request Sent
            </h3>
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px 0; line-height: 1.4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              Thank you, <strong style="color: #374151;">${form.name}</strong>. We'll respond within 24 hours.
            </p>
            <div style="background: linear-gradient(135deg, #0220aa 0%, #1e40af 100%); color: white; padding: 12px 16px; border-radius: 8px; margin: 16px 0; font-size: 13px; font-weight: 600;">
              ⚡ 24-Hour Response Guarantee
            </div>
            <p style="color: #9ca3af; font-size: 12px; margin: 12px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              Need help? Call <strong style="color: #0220aa;">+256 706 829 331</strong>
            </p>
          </div>
        `,
        icon: false,
        confirmButtonText: 'Continue',
        confirmButtonColor: '#0220aa',
        allowOutsideClick: true,
        width: '90%',
        padding: '1rem',
        showClass: {
          popup: 'animate__animated animate__fadeInUp animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        customClass: {
          popup: 'swal-compact-popup',
          confirmButton: 'swal-compact-button'
        },
        didOpen: () => {
          // Add custom styles
          const style = document.createElement('style');
          style.textContent = `
            .swal-compact-popup {
              border-radius: 12px !important;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
              border: 1px solid #e5e7eb !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              max-width: 400px !important;
            }
            .swal-compact-button {
              border-radius: 6px !important;
              padding: 10px 20px !important;
              font-weight: 600 !important;
              font-size: 13px !important;
              text-transform: none !important;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
              transition: all 0.2s ease !important;
            }
            .swal-compact-button:hover {
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15) !important;
            }
            @media (max-width: 480px) {
              .swal-compact-popup {
                margin: 1rem !important;
                max-width: calc(100vw - 2rem) !important;
              }
            }
          `;
          document.head.appendChild(style);
        }
      })
      
      // Reset form and go back to step 1
      setForm({
        name: '', company: '', email: '', phone: '',
        service: '', timeline: '', locations: '', message: '',
      })
      setStep(1)
      setStatus(null)
      
    } catch (error) {
      console.error('Quote submission error:', error)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
      
      // Show clean error message
      Swal.fire({
        title: false,
        html: `
          <div style="text-align: center; padding: 16px 8px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(220, 38, 38, 0.25);">
              <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>
            <h3 style="color: #1f2937; font-size: 18px; font-weight: 700; margin: 0 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              Submission Failed
            </h3>
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 16px 0; line-height: 1.4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              Please try again or contact us directly.
            </p>
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-left: 3px solid #dc2626; padding: 12px; border-radius: 6px; margin: 16px 0; font-size: 13px;">
              <div style="color: #374151; font-weight: 500; margin-bottom: 4px;">Contact us:</div>
              <div style="color: #6b7280;">
                📞 <strong style="color: #0220aa;">+256 706 829 331</strong><br>
                📧 <strong style="color: #0220aa;">sales@reignads.co.ug</strong>
              </div>
            </div>
          </div>
        `,
        icon: false,
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#dc2626',
        width: '90%',
        padding: '1rem',
        showClass: {
          popup: 'animate__animated animate__fadeInUp animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        customClass: {
          popup: 'swal-compact-popup',
          confirmButton: 'swal-compact-button-error'
        },
        didOpen: () => {
          // Add custom styles for error
          const style = document.createElement('style');
          style.textContent = `
            .swal-compact-button-error {
              border-radius: 6px !important;
              padding: 10px 20px !important;
              font-weight: 600 !important;
              font-size: 13px !important;
              text-transform: none !important;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
              transition: all 0.2s ease !important;
            }
            .swal-compact-button-error:hover {
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15) !important;
            }
          `;
          document.head.appendChild(style);
        }
      })
    }
  }

  // Wire the step3 submit button
  const handleStep3Submit = (e) => {
    if (e.target.dataset.submitQuote) handleFinalSubmit()
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
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>Free Quote</p>
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
            </div>
            <h1 className="font-black text-gray-900 leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Request a <span style={{ color: BB }}>Custom Quote</span>
            </h1>
            <p className="text-gray-500 text-base max-w-lg leading-relaxed">
              Tell us about your campaign and we'll put together a tailored advertising package in under 24 hours — no obligation.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB }} />
      </section>

      {/* ── Form + Sidebar ───────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10">

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
              className="lg:col-span-8">

              {/* Step indicators */}
              <div className="flex items-center gap-0 mb-8">
                {[1, 2, 3].map(s => (
                  <div key={s} className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center text-xs font-black transition-all"
                      style={{ background: step >= s ? BB : '#e5e7eb', color: step >= s ? '#fff' : '#9ca3af' }}>
                      {s}
                    </div>
                    {s < 3 && <div className="w-10 h-px" style={{ background: step > s ? BB : '#e5e7eb' }} />}
                  </div>
                ))}
                <span className="ml-4 text-xs text-gray-400 uppercase tracking-wider">
                  Step {step} / 3 — {['Your Details', 'Campaign Needs', 'Final Details'][step - 1]}
                </span>
              </div>

              <div className="bg-white border border-gray-100 p-8 md:p-10" onClick={handleStep3Submit}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <Step1 form={form} set={set} onNext={() => setStep(2)} />
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <Step2 form={form} set={set} onNext={() => setStep(3)} onBack={() => setStep(1)} />
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <Step3 form={form} set={set} onBack={() => setStep(2)} status={status} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
              className="lg:col-span-4 space-y-4">

              <div className="bg-white border border-gray-100 p-6">
                <h4 className="font-black text-sm mb-4" style={{ color: BB }}>Why Request a Quote?</h4>
                <ul className="space-y-3">
                  {[
                    'Free, no-obligation consultation',
                    'Custom package for your budget',
                    'Response within 24 hours',
                    'Expert advice on best locations',
                    'Access to 70+ prime billboard sites',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="mt-0.5 w-4 h-4 flex-shrink-0 flex items-center justify-center text-xs" style={{ background: BG, color: BB }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border-l-4 bg-white" style={{ borderColor: BB }}>
                <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: BB }}>Prefer to Call?</p>
                <a href="tel:+256706829331" className="text-gray-900 font-bold text-base block hover:text-blue-700 transition-colors">+256 706 829 331</a>
                <p className="text-xs text-gray-400 mt-1">Mon–Fri, 8AM–6PM EAT</p>
              </div>

              <div className="bg-white border border-gray-100 p-6">
                <h4 className="font-black text-gray-900 text-sm mb-4">Our Services</h4>
                <div className="space-y-2">
                  {services.slice(0, -1).map(s => (
                    <div key={s} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BB }} />
                      {s}
                    </div>
                  ))}
                </div>
                <Link to="/services" className="mt-4 inline-block text-xs font-bold uppercase tracking-wider" style={{ color: BB }}>
                  See All Services →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GetQuote
