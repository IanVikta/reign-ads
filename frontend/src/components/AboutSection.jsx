import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BRAND_BLUE = '#0220aa';
const BRAND_GOLD = '#ffd22a';

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-video overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(2,32,170,0.10)' }}>
              <img
                src="/images/billboards/billboard1.JPG"
                alt="Billboard along highway"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gold corner accent */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full -z-10 border-2"
              style={{ borderColor: `${BRAND_GOLD}60` }}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-7 rounded-full" style={{ background: BRAND_GOLD }} />
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BRAND_BLUE }}>
                About Reign Ads
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              Uganda's Premier{' '}
              <span style={{ color: BRAND_BLUE }}>Outdoor Advertising Partner</span>
            </h2>

            <p className="text-gray-500 mb-4 leading-relaxed text-sm">
              Reign Ads provides strategic outdoor advertising solutions across Uganda.
              Our premium billboard locations and creative branding services help businesses
              connect with millions of potential customers every day.
            </p>

            <p className="text-gray-500 mb-7 leading-relaxed text-sm">
              With over 70 strategic locations and a decade of experience, we deliver
              unmatched visibility and results for brands across East Africa.
            </p>

            {/* Quick facts row */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { v: '9+', l: 'Years Experience' },
                { v: '70+', l: 'Locations' },
                { v: '100+', l: 'Clients Served' },
              ].map((s) => (
                <div key={s.l} className="border border-gray-200 py-3 px-2 text-center bg-white">
                  <div className="text-lg font-black" style={{ color: BRAND_BLUE }}>{s.v}</div>
                  <div className="text-xs text-gray-400 mt-0.5 leading-tight">{s.l}</div>
                </div>
              ))}
            </div>

            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 text-xs font-extrabold uppercase tracking-widest text-white transition-all"
                style={{ background: BRAND_BLUE }}
                onMouseEnter={e => { e.currentTarget.style.background = BRAND_GOLD; e.currentTarget.style.color = BRAND_BLUE; }}
                onMouseLeave={e => { e.currentTarget.style.background = BRAND_BLUE; e.currentTarget.style.color = '#fff'; }}
              >
                Learn More About Us →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
