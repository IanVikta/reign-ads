import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

// Brand: Royal Azure #0220aa, Golden Dream #ffd22a
const BRAND_BLUE = '#0220aa';
const BRAND_GOLD = '#ffd22a';

const cardVariants = [
  { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, y: 50 },  visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, y: 50 },  visible: { opacity: 1, y: 0 } },
  { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0 } },
];

const BlogCard = ({ post, index, featured = false }) => {
  const variant = cardVariants[index] ?? cardVariants[0];
  const imgSrc = post.imageSrc || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80';

  if (featured) {
    return (
      <motion.article
        variants={variant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group flex flex-col border border-gray-100 bg-white hover:border-blue-100 transition-colors duration-300 rounded-none w-full"
        style={{ boxShadow: '0 2px 12px rgba(2,32,170,0.04)' }}
      >
        <Link to={`/blog/${post.slug}`} className="flex flex-col h-full relative">
          {/* CAD corner markings */}
          <div className="absolute top-2 left-2 text-[#0220aa]/20 text-[8px] font-mono select-none pointer-events-none z-20">+</div>
          <div className="absolute top-2 right-2 text-[#0220aa]/20 text-[8px] font-mono select-none pointer-events-none z-20">+</div>
          
          {/* Image */}
          <div className="relative overflow-hidden aspect-video">
            <motion.img
              src={imgSrc}
              alt={post.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7 }}
            />
            {/* Featured badge */}
            <div
              className="absolute top-4 left-4 px-3 py-2 text-xs font-mono font-black uppercase tracking-widest rounded-none"
              style={{ background: BRAND_GOLD, color: BRAND_BLUE }}
            >
              Featured //
            </div>
            {/* Date badge */}
            <div
              className="absolute top-4 right-4 px-3 py-2 text-xs font-mono font-black rounded-none"
              style={{ background: BRAND_BLUE, color: '#fff' }}
            >
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-8 border-t border-gray-100 bg-white">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest mb-2" style={{ color: BRAND_BLUE }}>
              [ INSIGHT_FEATURED ]
            </p>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-snug mb-4 group-hover:text-blue-700 transition-colors font-display uppercase">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-6 font-light">
              {post.excerpt}
            </p>
            <span
              className="inline-flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-widest transition-colors"
              style={{ color: BRAND_BLUE }}
            >
              Read Article
              <motion.span className="inline-block" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>→</motion.span>
            </span>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Standard horizontal stack cards
  return (
    <motion.article
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col sm:flex-row border border-gray-100 bg-white hover:border-blue-100 transition-all duration-300 rounded-none w-full flex-1"
      style={{ boxShadow: '0 2px 12px rgba(2,32,170,0.02)' }}
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-col sm:flex-row h-full w-full relative">
        {/* CAD corner markings */}
        <div className="absolute top-2 left-2 text-[#0220aa]/20 text-[8px] font-mono select-none pointer-events-none z-20">+</div>
        
        {/* Image - left side on tablet/desktop */}
        <div className="relative overflow-hidden w-full sm:w-[120px] md:w-[130px] sm:h-full flex-shrink-0 aspect-video sm:aspect-auto">
          <motion.img
            src={imgSrc}
            alt={post.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6 }}
          />
          {/* Date badge */}
          <div
            className="absolute top-0 left-0 px-2 py-1 text-[9px] font-mono font-black"
            style={{ background: BRAND_BLUE, color: '#fff' }}
          >
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4 justify-between bg-white">
          <div>
            <p className="text-[9px] font-mono font-bold uppercase tracking-widest mb-1" style={{ color: BRAND_BLUE }}>
              [ INSIGHT_ROW_0{index} ]
            </p>
            <h3 className="font-black text-xs md:text-sm text-gray-900 leading-snug mb-1 group-hover:text-blue-700 transition-colors line-clamp-2 uppercase font-display">
              {post.title}
            </h3>
            <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-2 mb-2 font-light">
              {post.excerpt}
            </p>
          </div>
          <span
            className="inline-flex items-center gap-2 text-[10px] font-mono font-extrabold uppercase tracking-widest transition-colors mt-auto"
            style={{ color: BRAND_BLUE }}
          >
            Read Article
            <motion.span className="inline-block" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>→</motion.span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

const BlogPreview = () => {
  const [featured, post2, post3, post4, post5] = blogPosts;

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="h-1.5 w-6 rounded-none" style={{ background: BRAND_GOLD }} />
            <p className="text-xs font-mono font-bold uppercase tracking-[0.35em]" style={{ color: BRAND_BLUE }}>
              Latest Insights
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight uppercase font-display">
              Stay Informed with{' '}
              <span style={{ color: BRAND_BLUE }}>Industry Trends</span>
            </h2>
            <motion.p
              className="text-gray-400 text-xs max-w-xs md:text-right font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Explore the latest trends and insights in outdoor advertising.
            </motion.p>
          </div>
          <motion.div
            className="mt-5 h-px bg-gray-200"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Grid: 8 + 4 column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Featured (Cols 8 of 12) */}
          <div className="lg:col-span-8 flex">
            <BlogCard post={featured} index={0} featured />
          </div>

          {/* Stacked Row Cards (Cols 4 of 12) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {post2 && <BlogCard post={post2} index={1} />}
            {post3 && <BlogCard post={post3} index={2} />}
            {post4 && <BlogCard post={post4} index={3} />}
            {post5 && <BlogCard post={post5} index={4} />}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <Link to="/blog">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-4 font-extrabold text-xs uppercase tracking-widest border transition-all rounded-none font-mono"
              style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE, background: 'transparent' }}
              onMouseEnter={e => {
                e.currentTarget.style.background = BRAND_BLUE;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = BRAND_BLUE;
              }}
            >
              View All Articles →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
