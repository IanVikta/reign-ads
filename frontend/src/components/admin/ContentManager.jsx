import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('blog')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data - replace with real API calls
  const blogPosts = [
    {
      id: 1,
      title: 'How Billboard Advertising Still Dominates Brand Awareness',
      status: 'published',
      author: 'Admin User',
      date: '2026-03-01',
      views: 1250,
      comments: 8,
      featured: true
    },
    {
      id: 2,
      title: 'Top Advertising Locations in Kampala',
      status: 'published',
      author: 'Admin User',
      date: '2026-02-28',
      views: 980,
      comments: 5,
      featured: false
    },
    {
      id: 3,
      title: 'LED Screens: The Future of Dynamic Advertising',
      status: 'draft',
      author: 'Admin User',
      date: '2026-02-25',
      views: 0,
      comments: 0,
      featured: false
    }
  ]

  const portfolioItems = [
    {
      id: 1,
      title: 'MTN Billboard Campaign - Kampala Road',
      category: 'Billboards',
      status: 'active',
      client: 'MTN Uganda',
      startDate: '2026-01-15',
      endDate: '2026-04-15',
      impressions: 125000
    },
    {
      id: 2,
      title: 'Coca Cola LED Screen - Ntinda',
      category: 'LED Screens',
      status: 'active',
      client: 'Coca Cola',
      startDate: '2026-02-01',
      endDate: '2026-05-01',
      impressions: 98000
    },
    {
      id: 3,
      title: 'Bank of Uganda Wall Branding',
      category: 'Wall Branding',
      status: 'completed',
      client: 'Bank of Uganda',
      startDate: '2025-12-01',
      endDate: '2026-02-28',
      impressions: 87000
    }
  ]

  const services = [
    {
      id: 1,
      name: 'Billboard Advertising',
      description: 'Strategic billboard placements across Uganda',
      price: 'From UGX 2,500,000/month',
      status: 'active',
      locations: 45
    },
    {
      id: 2,
      name: 'LED Screen Advertising',
      description: 'Dynamic digital displays for maximum impact',
      price: 'From UGX 5,000,000/month',
      status: 'active',
      locations: 12
    },
    {
      id: 3,
      name: 'Wall Branding',
      description: 'Large format wall advertisements',
      price: 'From UGX 1,800,000/month',
      status: 'active',
      locations: 28
    }
  ]

  const tabs = [
    { id: 'blog', label: 'Blog Posts', icon: '📝', count: blogPosts.length },
    { id: 'portfolio', label: 'Portfolio', icon: '🖼️', count: portfolioItems.length },
    { id: 'services', label: 'Services', icon: '⚙️', count: services.length }
  ]

  const BlogPostCard = ({ post }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-1">{post.title}</h3>
            {post.featured && (
              <span 
                className="px-2 py-1 text-xs font-bold rounded-full text-white"
                style={{ background: BRAND_GOLD, color: BRAND_BLUE }}
              >
                Featured
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>By {post.author}</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <span>{post.views} views</span>
            <span>{post.comments} comments</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          post.status === 'published' ? 'bg-green-100 text-green-700' :
          post.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {post.status}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Edit
          </button>
          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
            Preview
          </button>
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            Delete
          </button>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </motion.div>
  )

  const PortfolioCard = ({ item }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {item.category}
            </span>
            <span>Client: {item.client}</span>
            <span>{item.impressions.toLocaleString()} impressions</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          item.status === 'active' ? 'bg-green-100 text-green-700' :
          item.status === 'completed' ? 'bg-blue-100 text-blue-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {item.status}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Start: {new Date(item.startDate).toLocaleDateString()}</span>
        <span>End: {new Date(item.endDate).toLocaleDateString()}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Edit
          </button>
          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
            View
          </button>
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            Archive
          </button>
        </div>
      </div>
    </motion.div>
  )

  const ServiceCard = ({ service }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{service.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="font-medium text-gray-900">{service.price}</span>
            <span>{service.locations} locations</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          service.status === 'active' ? 'bg-green-100 text-green-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {service.status}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Edit
          </button>
          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
            Manage Locations
          </button>
        </div>
      </div>
    </motion.div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'blog':
        return (
          <div className="space-y-4">
            {blogPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )
      case 'portfolio':
        return (
          <div className="space-y-4">
            {portfolioItems.map(item => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        )
      case 'services':
        return (
          <div className="space-y-4">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
          <p className="text-gray-600">Manage your blog posts, portfolio, and services</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
          style={{ background: BRAND_BLUE }}
        >
          + Add New {activeTab === 'blog' ? 'Post' : activeTab === 'portfolio' ? 'Item' : 'Service'}
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default ContentManager