import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const ClientManager = () => {
  const [activeTab, setActiveTab] = useState('clients')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data - replace with real API calls
  const clients = [
    {
      id: 1,
      name: 'MTN Uganda',
      email: 'marketing@mtn.co.ug',
      phone: '+256 700 123 456',
      status: 'active',
      joinDate: '2025-06-15',
      totalSpent: 45000000,
      activeCampaigns: 3,
      completedProjects: 12,
      logo: '/images/clients/mtn-logo.png',
      industry: 'Telecommunications',
      contactPerson: 'Sarah Nakato'
    },
    {
      id: 2,
      name: 'Coca Cola Uganda',
      email: 'ads@cocacola.ug',
      phone: '+256 700 234 567',
      status: 'active',
      joinDate: '2024-03-20',
      totalSpent: 32000000,
      activeCampaigns: 2,
      completedProjects: 8,
      logo: '/images/clients/cocacola-logo.png',
      industry: 'Beverages',
      contactPerson: 'John Mukasa'
    },
    {
      id: 3,
      name: 'Bank of Uganda',
      email: 'communications@bou.or.ug',
      phone: '+256 700 345 678',
      status: 'inactive',
      joinDate: '2023-11-10',
      totalSpent: 18000000,
      activeCampaigns: 0,
      completedProjects: 5,
      logo: '/images/clients/bou-logo.png',
      industry: 'Banking',
      contactPerson: 'Grace Namuli'
    }
  ]

  const testimonials = [
    {
      id: 1,
      clientId: 1,
      clientName: 'MTN Uganda',
      rating: 5,
      text: 'Reign Ads has been instrumental in our brand visibility across Uganda. Their strategic billboard placements have significantly increased our market presence.',
      author: 'Sarah Nakato',
      position: 'Marketing Director',
      date: '2026-02-15',
      featured: true,
      approved: true
    },
    {
      id: 2,
      clientId: 2,
      clientName: 'Coca Cola Uganda',
      rating: 5,
      text: 'The LED screen campaigns delivered exceptional results. We saw a 40% increase in brand awareness in targeted areas.',
      author: 'John Mukasa',
      position: 'Brand Manager',
      date: '2026-01-28',
      featured: false,
      approved: true
    },
    {
      id: 3,
      clientId: 3,
      clientName: 'Bank of Uganda',
      rating: 4,
      text: 'Professional service and excellent execution of our financial literacy campaign. Highly recommended for outdoor advertising.',
      author: 'Grace Namuli',
      position: 'Communications Manager',
      date: '2025-12-10',
      featured: false,
      approved: false
    }
  ]

  const tabs = [
    { id: 'clients', label: 'Clients', icon: '👥', count: clients.length },
    { id: 'testimonials', label: 'Testimonials', icon: '⭐', count: testimonials.length }
  ]

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.author.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const ClientCard = ({ client }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            {client.logo ? (
              <img src={client.logo} alt={client.name} className="w-8 h-8 object-contain" />
            ) : (
              <span className="text-lg font-bold text-gray-600">
                {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-600">{client.industry}</p>
            <p className="text-sm text-gray-500">{client.contactPerson}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          client.status === 'active' ? 'bg-green-100 text-green-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {client.status}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            {(client.totalSpent / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-500">Total Spent (UGX)</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{client.activeCampaigns}</div>
          <div className="text-xs text-gray-500">Active Campaigns</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{client.completedProjects}</div>
          <div className="text-xs text-gray-500">Completed Projects</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            {Math.floor((new Date() - new Date(client.joinDate)) / (365.25 * 24 * 60 * 60 * 1000))}y
          </div>
          <div className="text-xs text-gray-500">Client Since</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>{client.email}</span>
        <span>{client.phone}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Details
          </button>
          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
            Edit
          </button>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            New Campaign
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

  const TestimonialCard = ({ testimonial }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-gray-600">
              {testimonial.author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
            <p className="text-sm text-gray-600">{testimonial.position}</p>
            <p className="text-sm text-gray-500">{testimonial.clientName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {testimonial.featured && (
            <span 
              className="px-2 py-1 text-xs font-bold rounded-full text-white"
              style={{ background: BRAND_GOLD, color: BRAND_BLUE }}
            >
              Featured
            </span>
          )}
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            testimonial.approved ? 'bg-green-100 text-green-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {testimonial.approved ? 'Approved' : 'Pending'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-sm text-gray-500 ml-2">
          {new Date(testimonial.date).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-3">{testimonial.text}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Edit
          </button>
          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
            {testimonial.approved ? 'Unpublish' : 'Approve'}
          </button>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            {testimonial.featured ? 'Unfeature' : 'Feature'}
          </button>
        </div>
        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
          Delete
        </button>
      </div>
    </motion.div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'clients':
        return (
          <div className="space-y-4">
            {filteredClients.map(client => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        )
      case 'testimonials':
        return (
          <div className="space-y-4">
            {filteredTestimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
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
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-600">Manage your clients and testimonials</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
          style={{ background: BRAND_BLUE }}
        >
          + Add New {activeTab === 'clients' ? 'Client' : 'Testimonial'}
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
        
        {activeTab === 'clients' && (
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        )}
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

      {/* Empty State */}
      {((activeTab === 'clients' && filteredClients.length === 0) || 
        (activeTab === 'testimonials' && filteredTestimonials.length === 0)) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeTab} found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : `Add your first ${activeTab.slice(0, -1)} to get started`}
          </p>
          <button
            className="px-6 py-3 text-white font-medium rounded-lg"
            style={{ background: BRAND_BLUE }}
          >
            Add New {activeTab === 'clients' ? 'Client' : 'Testimonial'}
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default ClientManager