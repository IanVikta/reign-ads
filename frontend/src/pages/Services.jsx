import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const BB = '#0220aa'
const BG = '#ffd22a'

const servicesList = [
  {
    number: '01',
    id: 'out-of-home',
    category: 'Outdoor Media Network',
    title: 'Out of Home Advertising',
    image: '/images/billboards/Billboard_advertising.jpg',
    portfolioCategory: 'out-of-home',
    summary:
      'We own and manage over 70 high-visibility outdoor advertising structures across Kampala and major Ugandan transit corridors, giving your brand unmissable daily presence.',
    deliverables: [
      {
        name: 'Spectacular & Highway Billboards',
        detail: 'Large-format static and double-decker structures positioned along high-traffic highways, roundabouts, and commercial arteries.'
      },
      {
        name: 'Digital LED Screens',
        detail: 'High-brightness digital billboards at prime city intersections supporting dynamic video and flexible campaign scheduling.'
      },
      {
        name: 'Street Pole Networks',
        detail: 'Sequential lamp-post advertising along busy urban roads designed for high-frequency brand repetition.'
      },
      {
        name: 'Highway & Bridge Gantries',
        detail: 'Overhead spanning structures capturing commuter traffic entering and exiting key commercial districts.'
      }
    ],
    specs: '70+ Prime Sites · 6+ Cities · Static & Digital Formats'
  },
  {
    number: '02',
    id: 'branding',
    category: 'Identity & Fabrication',
    title: 'Corporate Branding & Signage',
    image: '/images/billboards/Wall-branding.jpg',
    portfolioCategory: 'branding',
    summary:
      'From commercial buildings and retail branches to corporate vehicle fleets, we fabricate and install durable interior and exterior branding built to withstand East African weather.',
    deliverables: [
      {
        name: 'Building & Wall Branding',
        detail: 'Large-scale exterior wall wraps, painted murals, and facade graphics for commercial buildings, depots, and service centers.'
      },
      {
        name: 'Automobile & Fleet Graphics',
        detail: 'Full and partial vinyl vehicle wraps for corporate cars, delivery vans, trucks, and public transit fleets.'
      },
      {
        name: '3D Signage & Fabrication',
        detail: 'Illuminated 3D acrylic and metallic channel letters, pylon signs, directional signage, and custom steel fabrication.'
      },
      {
        name: 'Office & Retail Environments',
        detail: 'Reception signage, frosted glass partitioning, interior wall graphics, and in-store point-of-sale displays.'
      }
    ],
    specs: 'In-House Steel & Acrylic Workshop · Nationwide Installation'
  },
  {
    number: '03',
    id: 'large-format-printing',
    category: 'In-House Production',
    title: 'Large Format Printing',
    image: '/images/billboards/LargeFormat-printing.jpg',
    portfolioCategory: 'large-format-printing',
    summary:
      'Our Kampala production facility runs high-resolution outdoor and indoor printers using UV-stable inks and heavy-duty media for crisp color accuracy and long outdoor life.',
    deliverables: [
      {
        name: 'Frontlit & Backlit PVC Banners',
        detail: 'Heavy-duty outdoor billboard skins and light-box flex banners printed for vibrant day and night visibility.'
      },
      {
        name: 'Vinyl & One-Way Vision Film',
        detail: 'High-tack self-adhesive vinyl, clear stickers, and perforated window graphics for glass facades and vehicles.'
      },
      {
        name: 'Mesh & Scaffolding Wraps',
        detail: 'Wind-permeable mesh banners engineered for multi-story building wraps and construction hoarding.'
      },
      {
        name: 'Portable Display Systems',
        detail: 'Roll-up banners, teardrop and telescopic flags, X-stands, pop-up backdrops, and promo tables.'
      }
    ],
    specs: 'UV-Resistant Inks · Weatherproof Media · Fast Turnaround'
  },
  {
    number: '04',
    id: 'events-branding',
    category: 'Experiential & Exhibitions',
    title: 'Events Branding & Management',
    image: '/images/campaigns/CAF.jpg',
    portfolioCategory: 'events-branding',
    summary:
      'We handle complete event branding and technical production for corporate launches, conferences, sports tournaments, and nationwide brand activations.',
    deliverables: [
      {
        name: 'Custom Exhibition Stands',
        detail: 'Bespoke wooden and modular exhibition booths, branded counters, and product display zones for trade shows.'
      },
      {
        name: 'Stage Sets & Media Backdrops',
        detail: 'Stage fabrication, press conference media walls, branded podiums, and red-carpet step-and-repeat boards.'
      },
      {
        name: 'On-Ground Brand Activations',
        detail: 'Branded gazebos, sampling kiosks, directional signage, and roadshow setups for field marketing teams.'
      },
      {
        name: 'Full Rigging & Site Operations',
        detail: 'Dedicated technical crew managing transport, on-site assembly, quality checks, and post-event teardown.'
      }
    ],
    specs: 'Concept to Teardown · Custom Carpentry & Truss Systems'
  },
  {
    number: '05',
    id: 'promotional-materials',
    category: 'Corporate Merchandise',
    title: 'Promotional Materials',
    image: '/images/services/fabrication.jpg',
    portfolioCategory: 'promotional-materials',
    summary:
      'Quality branded merchandise, corporate gifts, and staff apparel produced with clean embroidery, screen printing, UV printing, and laser engraving.',
    deliverables: [
      {
        name: 'Corporate & Campaign Apparel',
        detail: 'Embroidered polo shirts, promotional T-shirts, branded caps, workwear, reflectors, and field team uniforms.'
      },
      {
        name: 'Executive Gift Sets',
        detail: 'Custom-branded notebooks, metal pens, insulated flasks, power banks, and curated client gift hampers.'
      },
      {
        name: 'Office & Print Stationery',
        detail: 'Branded presentation folders, desk and wall calendars, diaries, lanyards, ID holders, and brochures.'
      },
      {
        name: 'Mass Campaign Giveaways',
        detail: 'Branded umbrellas, tote bags, keyrings, wristbands, and promotional items produced at scale.'
      }
    ],
    specs: 'Embroidery · Screen Print · UV Direct Print · Laser Engraving'
  }
]

const processSteps = [
  {
    step: '01',
    title: 'Site Selection & Planning',
    description:
      'We review your campaign objectives, target audience, and budget to recommend the most effective billboard sites, formats, or branding scope.'
  },
  {
    step: '02',
    title: 'Specifications & Artwork',
    description:
      'Our team provides exact structural measurements, conducts site surveys where needed, and prepares print-ready production files.'
  },
  {
    step: '03',
    title: 'In-House Production',
    description:
      'All large-format printing, steel fabrication, and signage assembly are executed in-house under strict quality control.'
  },
  {
    step: '04',
    title: 'Installation & Monitoring',
    description:
      'Our field operations crew handles safe installation, shares completion photography, and maintains your display throughout the campaign.'
  }
]

const heroStats = [
  {
    value: '70+',
    label: 'Billboard Locations',
    desc: 'Across Kampala CBD, highways, and regional hubs.'
  },
  {
    value: '500+',
    label: 'Campaigns Executed',
    desc: 'For banks, telecoms, FMCG, and institutions.'
  },
  {
    value: 'In-House',
    label: 'Print & Fabrication',
    desc: 'Direct quality control and faster turnaround times.'
  },
  {
    value: 'Since 2015',
    label: 'Proven Track Record',
    desc: 'Trusted outdoor media partner across Uganda.'
  }
]

const Services = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen overflow-x-hidden">
      {/* ── Page Hero ─────────────────────────────────────────────────────── */}
      <section
        className="relative bg-white border-b border-gray-200"
        style={{ paddingTop: 'clamp(110px, 15vh, 160px)', paddingBottom: '4.5rem' }}
      >
        {/* Top Gold Rule */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: BG }} />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            {/* Left Column: Editorial Heading */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="h-[2px] w-8 inline-block" style={{ background: BG }} />
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: BB }}>
                  Our Capabilities
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-black text-gray-900 tracking-tight leading-[1.08] mb-6"
                style={{ fontSize: 'clamp(2.25rem, 4.8vw, 3.75rem)' }}
              >
                Full-Service Outdoor{' '}
                <span style={{ color: BB }}>Advertising &amp; Branding</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mb-8"
              >
                From highway billboards and digital LED screens to commercial fleet wrapping, 3D signage, and large-format printing — we handle planning, production, and nationwide installation under one roof.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/quote">
                  <button
                    className="px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-white transition-colors cursor-pointer"
                    style={{ background: BB }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = BG
                      e.currentTarget.style.color = BB
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = BB
                      e.currentTarget.style.color = '#fff'
                    }}
                  >
                    Request a Quote →
                  </button>
                </Link>
                <Link to="/portfolio">
                  <button
                    className="px-8 py-4 text-xs font-extrabold uppercase tracking-widest border-2 transition-colors cursor-pointer"
                    style={{ borderColor: BB, color: BB }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = BB
                      e.currentTarget.style.color = '#fff'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = BB
                    }}
                  >
                    View Our Work
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Key Operational Facts */}
            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-gray-200 pt-8 lg:pt-0 lg:pl-10">
              <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                {heroStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={i >= 2 ? 'pt-6 border-t border-gray-200' : ''}
                  >
                    <div className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: BB }}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-900 mt-1">
                      {stat.label}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {stat.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Blue Rule */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB }} />
      </section>

      {/* ── Quick Service Index Strip ─────────────────────────────────────── */}
      <nav aria-label="Services directory" className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {servicesList.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                className="py-4 px-3 md:px-5 flex items-center justify-between gap-2 text-left hover:bg-white transition-colors group"
              >
                <div className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-widest" style={{ color: BB }}>
                    {s.number}
                  </span>
                  <span className="block text-xs md:text-sm font-extrabold text-gray-900 group-hover:text-[#0220aa] transition-colors truncate mt-0.5">
                    {s.title}
                  </span>
                </div>
                <span className="text-gray-400 group-hover:text-[#0220aa] group-hover:translate-y-0.5 text-xs transition-all flex-shrink-0">
                  ↓
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Detailed Service Sections (Balanced Height + AOS Animations) ──── */}
      <section className="bg-white">
        <div className="container mx-auto px-6">
          {servicesList.map((service, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={service.id}
                id={service.id}
                className="py-16 md:py-24 border-b border-gray-200 last:border-b-0 scroll-mt-24"
              >
                {/* 12-Column Equal-Height Grid so Image & Content Align Top-to-Bottom */}
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                  
                  {/* Image Column (Stretches to match exact height of right column on desktop) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className={`lg:col-span-5 flex flex-col justify-between ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    {/* Main Image Container — fills vertical space so bottoms align */}
                    <div className="relative w-full flex-grow min-h-[280px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden bg-gray-100 group">
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        initial={{ scale: 1.08 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Top-left solid number tag */}
                      <div
                        className="absolute top-0 left-0 px-3.5 py-2 text-xs font-black tracking-widest"
                        style={{ background: BB, color: '#fff' }}
                      >
                        {service.number}
                      </div>
                      {/* Bottom gold accent bar */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-[3px]"
                        style={{ background: BG }}
                      />
                    </div>

                    {/* Clean Spec Bar under image — aligned with CTA buttons row */}
                    <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between gap-4">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 flex-shrink-0">
                        Coverage &amp; Specs
                      </span>
                      <span className="text-xs font-bold text-gray-900 text-right">
                        {service.specs}
                      </span>
                    </div>
                  </motion.div>

                  {/* Content Column (Flex column justify-between so top & bottom align with image) */}
                  <div
                    className={`lg:col-span-7 flex flex-col justify-between ${
                      isEven ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4'
                    }`}
                  >
                    {/* Top: Header & Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="h-[2px] w-7 inline-block" style={{ background: BG }} />
                        <span
                          className="text-xs font-extrabold uppercase tracking-[0.28em]"
                          style={{ color: BB }}
                        >
                          {service.category}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                        {service.title}
                      </h2>

                      <p className="text-gray-600 text-base leading-relaxed max-w-2xl">
                        {service.summary}
                      </p>
                    </motion.div>

                    {/* Middle: 2×2 Deliverables Grid (Balanced height & clean column alignment) */}
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 my-8 py-7 border-y border-gray-200">
                      {service.deliverables.map((item, idx) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 22 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 0.55,
                            delay: 0.1 + idx * 0.1,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                          className="flex flex-col"
                        >
                          <div className="flex items-center gap-2.5 mb-2">
                            <span
                              className="w-1.5 h-1.5 flex-shrink-0"
                              style={{ background: BB }}
                            />
                            <h3 className="text-sm font-extrabold text-gray-900 leading-snug">
                              {item.name}
                            </h3>
                          </div>
                          <p className="text-xs md:text-sm text-gray-500 leading-relaxed pl-4">
                            {item.detail}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom: Actions Row (Aligns with bottom of image column) */}
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-wrap items-center justify-between gap-4"
                    >
                      <Link
                        to={`/portfolio?category=${service.portfolioCategory}`}
                        className="inline-flex items-center gap-3 px-7 py-3.5 text-xs font-extrabold uppercase tracking-widest text-white transition-colors"
                        style={{ background: BB }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = BG
                          e.currentTarget.style.color = BB
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = BB
                          e.currentTarget.style.color = '#fff'
                        }}
                      >
                        <span>View {service.title} Work</span>
                        <span>→</span>
                      </Link>

                      <Link
                        to="/quote"
                        className="text-xs font-extrabold uppercase tracking-widest py-2 border-b-2 transition-colors hover:opacity-80"
                        style={{ color: BB, borderColor: BG }}
                      >
                        Request Pricing &amp; Availability →
                      </Link>
                    </motion.div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── How We Work (Solid Dark Section, Clean Columns, AOS Stagger) ───── */}
      <section className="relative" style={{ background: '#07090f' }}>
        <div className="h-[3px]" style={{ background: BG }} />

        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-8 inline-block" style={{ background: BG }} />
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: BG }}>
                  How We Work
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                From Brief to Installation
              </h2>
            </div>
            <p className="text-white/60 text-sm max-w-md leading-relaxed">
              Every campaign is managed by our in-house planning, production, and field engineering teams for reliable delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`py-8 md:py-10 ${i === 0 ? 'md:pr-8' : i === 3 ? 'md:pl-8' : 'md:px-8'}`}
              >
                <div className="text-xs font-extrabold uppercase tracking-widest mb-3" style={{ color: BG }}>
                  Step {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="h-[3px]" style={{ background: BB }} />
      </section>

      {/* ── Bottom CTA Section ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8 max-w-5xl mx-auto"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-6 inline-block" style={{ background: BG }} />
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: BB }}>
                  Start a Campaign
                </p>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-3">
                Ready to Plan Your Next <span style={{ color: BB }}>Outdoor Campaign?</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Speak with our team for current billboard availability, site maps, or a custom production quote.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/quote">
                <button
                  className="px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-white transition-colors cursor-pointer"
                  style={{ background: BB }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = BG
                    e.currentTarget.style.color = BB
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = BB
                    e.currentTarget.style.color = '#fff'
                  }}
                >
                  Request a Quote →
                </button>
              </Link>
              <Link to="/contact">
                <button
                  className="px-8 py-4 text-xs font-extrabold uppercase tracking-widest border-2 transition-colors cursor-pointer"
                  style={{ borderColor: BB, color: BB }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = BB
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = BB
                  }}
                >
                  Contact Sales
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
