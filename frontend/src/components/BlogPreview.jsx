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
];

const BlogCard = ({ post, index, featured = false }) => {
  const variant = cardVariants[index] ?? cardVariants[0];

  if (featured) {
    return (
      <motion.article
        variants={variant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group col-span-1 md:col-span-2 relative overflow-hidden"
        style={{ minHeight: 340 }}
      >
        <Link to={`/blog/${post.slug}`} className="block h-full">
          {/* Full image */}
          <motion.img
            src={post.imageSrc}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7 }}
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(2,32,170,0.92) 0%, rgba(2,32,170,0.5) 50%, transparent 100%)' }}
          />
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            {/* Date + Category pill */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs font-black uppercase tracking-widest px-3 py-1"
                style={{ background: BRAND_GOLD, color: BRAND_BLUE }}
              >
                Featured
              </span>
              <span className="text-white/50 text-xs">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-snug mb-3 group-hover:text-yellow-200 transition-colors">
              {post.title}
            </h3>
            <p className="text-white/65 text-sm leading-relaxed mb-4 max-w-xl">{post.excerpt}</p>
            <span
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest"
              style={{ color: BRAND_GOLD }}
            >
              Read Article →
            </span>
          </div>

          {/* Bottom gold bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px]"
            style={{ background: BRAND_GOLD }}
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border border-gray-100 bg-white hover:border-blue-100 transition-colors duration-300"
      style={{ boxShadow: '0 2px 12px rgba(2,32,170,0.04)' }}
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative overflow-hidden aspect-video">
          <motion.img
            src={post.imageSrc}
            alt={post.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6 }}
          />
          {/* Date badge */}
          <div
            className="absolute top-0 left-0 px-3 py-2 text-xs font-black"
            style={{ background: BRAND_BLUE, color: '#fff' }}
          >
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          {/* Bottom gold bar on hover */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px]"
            style={{ background: BRAND_GOLD }}
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.45 }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <h3
            className="font-black text-lg text-gray-900 leading-snug mb-3 line-clamp-2 transition-colors duration-200 group-hover:text-blue-700"
          >
            {post.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-grow mb-5">
            {post.excerpt}
          </p>
          <span
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest transition-colors"
            style={{ color: BRAND_BLUE }}
          >
            Read Article
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >→</motion.span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

const BlogPreview = () => {
  const [featured, ...rest] = blogPosts;

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <motion.div
            className="flex items-center gap-3 mb-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="h-1 w-8 rounded-full" style={{ background: BRAND_GOLD }} />
            <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BRAND_BLUE }}>
              Latest Insights
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Stay Informed with{' '}
              <span style={{ color: BRAND_BLUE }}>Industry Trends</span>
            </h2>
            <motion.p
              className="text-gray-400 text-sm max-w-xs md:text-right"
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

        {/* Grid: featured (left, wide) + 2 standard cards (right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {/* Featured */}
          <BlogCard post={featured} index={0} featured />

          {/* Rest as standard */}
          {rest.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i + 1} />
          ))}
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
              className="px-12 py-4 font-extrabold text-sm uppercase tracking-widest border-2 transition-all"
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
