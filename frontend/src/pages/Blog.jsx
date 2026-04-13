import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { blogPosts as staticBlogPosts } from '../data/blogPosts'

const BB = '#0220aa'
const BG = '#ffd22a'

const BlogCard = ({ post, index }) => {
  // Use static stats for now since we're loading from frontend
  const stats = { likes: Math.floor(Math.random() * 50) + 5, comments: Math.floor(Math.random() * 20) + 2 }

  const dirs = [
    { opacity: 0, y: 40 }, { opacity: 0, x: 30 }, { opacity: 0, y: 40 },
    { opacity: 0, x: -30 }, { opacity: 0, y: 40 }, { opacity: 0, x: 30 },
  ]
  const d = dirs[index % dirs.length]

  return (
    <motion.article
      initial={d}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.08 }}
      className="group border border-gray-100 bg-white overflow-hidden hover:border-blue-100 transition-all duration-300"
      style={{ boxShadow: '0 2px 12px rgba(2,32,170,0.04)' }}
    >
      <Link to={`/blog/${post.slug}`}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={post.imageSrc}
            alt={post.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6 }}
          />
          {/* Date badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 text-xs font-black uppercase tracking-widest"
            style={{ background: BB, color: '#fff' }}>
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-5"
            style={{ background: `linear-gradient(to top, ${BB}ee, transparent)` }}>
            <span className="text-xs font-extrabold uppercase tracking-widest px-4 py-2"
              style={{ background: BG, color: BB }}>
              Read Article →
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          <h3 className="font-black text-gray-900 text-lg mb-3 group-hover:text-blue-700 transition-colors leading-snug">
            {post.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className={`text-base ${stats.likes > 0 ? 'text-red-500' : 'text-gray-400'}`}>❤️</span>
                <span className="text-xs text-gray-500 font-medium">{stats.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-base text-gray-400">💬</span>
                <span className="text-xs text-gray-500 font-medium">{stats.comments}</span>
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: BB }}>
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use static data instead of API call
    setBlogPosts(staticBlogPosts)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
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
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>Industry Insights</p>
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
            </div>
            <h1 className="font-black text-gray-900 leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Our <span style={{ color: BB }}>Blog</span>
            </h1>
            <p className="text-gray-500 text-base max-w-xl leading-relaxed">
              Stay updated with the latest trends, insights, and innovations in outdoor advertising across East Africa.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB }} />
      </section>

      {/* ── Blog Grid ────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Ready to Start Your <span style={{ color: BB }}>Campaign?</span></h2>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-7">Let's discuss how outdoor advertising can elevate your brand visibility across East Africa.</p>
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

export default Blog