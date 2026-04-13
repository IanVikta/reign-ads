import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/blogPosts'
import BlogComments from '../components/BlogComments'
import BlogLikes from '../components/BlogLikes'
import BlogCommentIcon from '../components/BlogCommentIcon'

const BB = '#0220aa'
const BG = '#ffd22a'

const blogArticles = {
  'billboard-advertising-dominates': {
    title: 'How Billboard Advertising Still Dominates Brand Awareness',
    date: '2026-03-01',
    author: 'Reign Ads Team',
    readTime: '5 min read',
    image: '/images/blog/double_decker.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'In an era dominated by digital marketing and social media advertising, one might assume that traditional outdoor advertising has lost its relevance. However, billboard advertising continues to be one of the most powerful tools for building brand awareness and reaching mass audiences across East Africa.'
      },
      {
        type: 'heading',
        text: 'The Enduring Power of Billboards'
      },
      {
        type: 'paragraph',
        text: 'Billboard advertising offers something that digital marketing cannot replicate: unavoidable visibility. When strategically placed along major highways, in city centers, or near commercial hubs, billboards capture the attention of thousands of potential customers daily. In Uganda alone, major routes like Entebbe Road, Kampala-Jinja Highway, and Northern Bypass see over 100,000 vehicles daily.'
      },
      {
        type: 'paragraph',
        text: 'Unlike digital ads that can be blocked, skipped, or ignored, billboards create lasting impressions through repeated exposure. Studies show that consumers need to see a brand message 7-10 times before taking action, and billboards excel at providing this consistent exposure.'
      },
      {
        type: 'heading',
        text: 'Why Billboards Work in East Africa'
      },
      {
        type: 'list',
        items: [
          'High traffic volumes on major routes ensure maximum exposure',
          'Cost-effective reach compared to TV and radio advertising',
          'Perfect for building brand recognition and recall',
          'Ideal for location-based businesses and services',
          'Creates a sense of credibility and establishment'
        ]
      },
      {
        type: 'paragraph',
        text: 'At Reign Ads, we understand the strategic importance of billboard placement. Our team conducts thorough traffic analysis and demographic studies to ensure your message reaches the right audience at the right time.'
      }
    ]
  },
  'top-advertising-locations-kampala': {
    title: 'Top Advertising Locations in Kampala',
    date: '2026-02-28',
    author: 'Reign Ads Team',
    readTime: '6 min read',
    image: '/images/portfolio/billboards/Gentex-Billboard along airport road.JPG',
    content: [
      {
        type: 'paragraph',
        text: 'Kampala, Uganda\'s bustling capital, offers numerous strategic locations for outdoor advertising. With over 2 million residents and countless daily commuters, choosing the right billboard placement can make or break your advertising campaign.'
      },
      {
        type: 'heading',
        text: 'Prime Highway Locations'
      },
      {
        type: 'paragraph',
        text: 'The major highways connecting Kampala to other cities provide excellent visibility for billboard advertising. Entebbe Road, with its heavy traffic to and from the airport, offers premium exposure to both local and international audiences.'
      },
      {
        type: 'list',
        items: [
          'Entebbe Road - Airport traffic and business commuters',
          'Kampala-Jinja Highway - Industrial and commercial traffic',
          'Northern Bypass - Heavy commuter and cargo traffic',
          'Masaka Road - Southern region connectivity',
          'Bombo Road - Northern corridor access'
        ]
      },
      {
        type: 'heading',
        text: 'City Center Hotspots'
      },
      {
        type: 'paragraph',
        text: 'Downtown Kampala\'s commercial districts offer targeted exposure to business professionals, shoppers, and tourists. Strategic placement in areas like Nakasero, Kololo, and the Central Business District ensures maximum urban reach.'
      },
      {
        type: 'paragraph',
        text: 'Contact Reign Ads today to secure premium billboard locations in Kampala and maximize your brand\'s visibility across Uganda\'s capital city.'
      }
    ]
  },
  'outdoor-advertising-trends-africa': {
    title: 'Outdoor Advertising Trends in Africa',
    date: '2026-02-25',
    author: 'Reign Ads Team',
    readTime: '7 min read',
    image: '/images/portfolio/wall-branding/mtn_wall_lugogo.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'The outdoor advertising landscape across Africa is experiencing unprecedented transformation. From digital billboards in Lagos to innovative street furniture in Nairobi, the continent is embracing new technologies and creative approaches that are reshaping how brands connect with consumers.'
      },
      {
        type: 'heading',
        text: 'Digital Revolution in Outdoor Advertising'
      },
      {
        type: 'paragraph',
        text: 'LED screens and digital billboards are becoming increasingly popular across major African cities. These dynamic displays allow for real-time content updates, multiple advertiser rotations, and interactive campaigns that engage audiences in new ways.'
      },
      {
        type: 'heading',
        text: 'Sustainable Advertising Solutions'
      },
      {
        type: 'paragraph',
        text: 'Environmental consciousness is driving innovation in outdoor advertising materials and practices. Solar-powered displays, eco-friendly printing materials, and sustainable installation methods are becoming standard across the continent.'
      },
      {
        type: 'list',
        items: [
          'Solar-powered LED displays reducing energy costs',
          'Recyclable and biodegradable printing materials',
          'Smart placement strategies minimizing environmental impact',
          'Integration with urban planning and development',
          'Community-focused advertising that adds local value'
        ]
      },
      {
        type: 'heading',
        text: 'The Future of African Outdoor Advertising'
      },
      {
        type: 'paragraph',
        text: 'As Africa\'s urban population continues to grow, outdoor advertising will play an increasingly important role in brand communication. The integration of mobile technology, data analytics, and creative storytelling is creating new opportunities for meaningful brand-consumer connections.'
      },
      {
        type: 'paragraph',
        text: 'Reign Ads is at the forefront of these trends, bringing innovative outdoor advertising solutions to Uganda and East Africa. Partner with us to leverage the latest in outdoor advertising technology and strategy.'
      }
    ]
  },
  'led-screens-future-advertising': {
    title: 'LED Screens: The Future of Dynamic Advertising',
    date: '2026-02-20',
    author: 'Reign Ads Team',
    readTime: '4 min read',
    image: '/images/billboards/LED.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'LED screens are revolutionizing outdoor advertising with their vibrant displays, real-time content updates, and ability to capture attention day and night. As technology advances and costs decrease, LED advertising is becoming the preferred choice for brands seeking maximum impact.'
      },
      {
        type: 'heading',
        text: 'Advantages of LED Advertising'
      },
      {
        type: 'list',
        items: [
          'Bright, vibrant displays visible in all lighting conditions',
          'Real-time content updates and scheduling flexibility',
          'Multiple advertiser rotations maximizing revenue potential',
          'Interactive capabilities and dynamic content options',
          'Long-term cost effectiveness and durability'
        ]
      },
      {
        type: 'paragraph',
        text: 'LED screens offer unmatched flexibility in content delivery. Advertisers can update campaigns instantly, run time-sensitive promotions, and even display live social media feeds or news updates to keep content fresh and engaging.'
      }
    ]
  },
  'automobile-branding-mobile-marketing': {
    title: 'Automobile Branding: Taking Your Brand on the Road',
    date: '2026-02-15',
    author: 'Reign Ads Team',
    readTime: '5 min read',
    image: '/images/billboards/Automobile branding.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'Vehicle branding transforms your fleet into mobile billboards, reaching diverse audiences across multiple locations throughout the day. This dynamic form of advertising offers exceptional value and extensive reach that traditional static advertising cannot match.'
      },
      {
        type: 'heading',
        text: 'Benefits of Vehicle Branding'
      },
      {
        type: 'list',
        items: [
          'Cost-effective advertising with long-term visibility',
          'Mobile reach across diverse geographic areas',
          'Professional appearance enhancing brand credibility',
          '24/7 advertising exposure during vehicle operation',
          'Targeted local market penetration'
        ]
      },
      {
        type: 'paragraph',
        text: 'Effective vehicle branding requires careful design consideration. Bold colors, clear messaging, and strategic logo placement ensure maximum visibility and brand recognition while maintaining professional aesthetics.'
      }
    ]
  },
  'large-format-printing-impact': {
    title: 'The Impact of Large Format Printing in Outdoor Advertising',
    date: '2026-02-10',
    author: 'Reign Ads Team',
    readTime: '6 min read',
    image: '/images/billboards/LargeFormat-printing.jpg',
    content: [
      {
        type: 'paragraph',
        text: 'High-quality large format printing creates stunning visual displays that command attention and deliver powerful brand messages. Advanced printing technology has revolutionized outdoor advertising, enabling crisp, vibrant graphics that maintain their impact over time.'
      },
      {
        type: 'heading',
        text: 'Technology Advancements'
      },
      {
        type: 'list',
        items: [
          'UV-resistant inks preventing color degradation',
          'Weather-resistant materials for durability',
          'High-resolution printing for crisp detail',
          'Eco-friendly printing options available',
          'Quick turnaround times for urgent campaigns'
        ]
      },
      {
        type: 'paragraph',
        text: 'Partner with Reign Ads to leverage cutting-edge large format printing technology for your next outdoor advertising campaign. Our state-of-the-art equipment and experienced team ensure exceptional results that drive brand success.'
      }
    ]
  }
}

const BlogArticle = () => {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])
  
  useEffect(() => {
    // Use static data instead of API calls
    const article = blogArticles[slug]
    if (article) {
      setArticle(article)
    } else {
      setArticle(null)
    }
    
    // Get related posts from static data
    const related = blogPosts.filter(post => post.slug !== slug).slice(0, 2)
    setRelatedPosts(related)
    
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (!article) {
    return <Navigate to="/blog" replace />
  }

  const scrollToComments = () => {
    const commentsSection = document.getElementById('comments-section')
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderContent = (item, index) => {
    switch (item.type) {
      case 'heading':
        return (
          <h2 key={index} className="text-2xl font-black text-gray-900 mb-4 mt-8" style={{ color: BB }}>
            {item.text}
          </h2>
        )
      case 'paragraph':
        return (
          <p key={index} className="text-gray-600 leading-relaxed mb-6">
            {item.text}
          </p>
        )
      case 'list':
        return (
          <ul key={index} className="space-y-2 mb-6 ml-4">
            {item.items.map((listItem, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600">
                <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: BG }} />
                {listItem}
              </li>
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden" style={{ paddingTop: 'clamp(100px, 14vh, 150px)', paddingBottom: '2rem' }}>
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: BG }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest mb-6 transition-colors" style={{ color: BB }}>
              ← Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>
                {article.date} • {article.readTime}
              </p>
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
            </div>
            <h1 className="font-black text-gray-900 leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              {article.title}
            </h1>
            <p className="text-gray-500 text-base">By {article.author}</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB }} />
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video overflow-hidden mb-8"
            style={{ boxShadow: '0 8px 40px rgba(2,32,170,0.10)' }}
          >
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              {article.content.map((item, index) => renderContent(item, index))}
            </motion.div>

            {/* Article Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <BlogLikes postId={slug} />
                  <BlogCommentIcon postId={slug} onClick={scrollToComments} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section id="comments-section" className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <BlogComments postId={slug} />
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-14 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-6">
            <h3 className="text-2xl font-black text-gray-900 mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group border border-gray-100 bg-white overflow-hidden hover:border-blue-100 transition-all duration-300"
                  style={{ boxShadow: '0 2px 12px rgba(2,32,170,0.04)' }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative aspect-video overflow-hidden">
                      <img src={post.imageSrc} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <h4 className="font-black text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{post.excerpt}</p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default BlogArticle