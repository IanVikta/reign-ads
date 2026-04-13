import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const QuoteManager = () => {
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedQuotes, setSelectedQuotes] = useState([])

  // Mock quote data
  const quotes = [
    {
      id: 1,
      clientName: 'Sarah Nakamya',
      company: 'Tech Solutions Ltd',
      email: 'sarah@techsolutions.ug',
      phone: '+256 700 123 456',
      service: 'Billboard Advertising',
      location: 'Kampala Road Junction',
      budget: '5M - 10M UGX',
      duration: '3 months',
      message: 'We need billboard advertising for our new product launch targeting tech professionals in Kampala.',
      status: 'pending',
      priority: 'high',
      submittedAt: '2026-03-10T10:30:00Z',
      followUpDate: '2026-03-12T09:00:00Z'
    },
    {
      id: 2,
      clientName: 'John Mukasa',
      company: 'Mukasa Enterprises',
      email: 'john@mukasa.co.ug',
      phone: '+256 700 234 567',
      service: 'LED Screen Advertising',
      location: 'Ntinda Shopping Complex',
      budget: '10M - 20M UGX',
      duration: '6 months',
      message: 'Looking for LED screen advertising to promote our retail business during peak shopping seasons.',
      status: 'in_progress',
      priority: 'medium',
      submittedAt: '2026-03-08T14:15:00Z',
      followUpDate: '2026-03-11T11:00:00Z'
    },
    {
      id: 3,
      clientName: 'Grace Namuli',
      company: 'Namuli Marketing Agency',
      email: 'grace@namulimarketing.com',
      phone: '+256 700 345 678',
      service: 'Wall Branding',
      location: 'Industrial Area',
      budget: '2M - 5M UGX',
      duration: '12 months',
      message: 'We represent a client who needs long-term wall branding for brand visibility in the industrial area.',
      status: 'quoted',
      priority: 'low',
      submittedAt: '2026-03-05T16:45:00Z',
      followUpDate: null
    },
    {
      id: 4,
      clientName: 'David Ssemakula',
      company: 'Ssemakula Motors',
      email: 'david@ssemakulamotors.ug',
      phone: '+256 700 456 789',
      service: 'Multiple Services',
      location: 'Multiple Locations',
      budget: '20M+ UGX',
      duration: '12 months',
      message: 'We need a comprehensive advertising package including billboards, LED screens, and wall branding for our car dealership expansion.',
      status: 'converted',
      priority: 'high',
      submittedAt: '2026-02-28T09:20:00Z',
      followUpDate: null
    }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Quotes', count: quotes.length },
    { value: 'pending', label: 'Pending', count: quotes.filter(q => q.status === 'pending').length },
    { value: 'in_progress', label: 'In Progress', count: quotes.filter(q => q.status === 'in_progress').length },
    { value: 'quoted', label: 'Quoted', count: quotes.filter(q => q.status === 'quoted').length },
    { value: 'converted', label: 'Converted', count: quotes.filter(q => q.status === 'converted').length }
  ]

  const filteredQuotes = quotes.filter(quote => {
    const matchesStatus = filterStatus === 'all' || quote.status === filterStatus
    const matchesSearch = quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.service.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleQuoteSelect = (quoteId) => {
    setSelectedQuotes(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'in_progress': return 'bg-blue-100 text-blue-700'
      case 'quoted': return 'bg-purple-100 text-purple-700'
      case 'converted': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const QuoteCard = ({ quote }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white border-2 rounded-lg p-6 cursor-pointer transition-all ${
        selectedQuotes.includes(quote.id) 
          ? 'border-blue-500 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={() => handleQuoteSelect(quote.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-gray-900">{quote.clientName}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(quote.priority)}`}>
              {quote.priority} priority
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{quote.company}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{quote.email}</span>
            <span>{quote.phone}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
            {quote.status.replace('_', ' ')}
          </div>
          {selectedQuotes.includes(quote.id) && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Service</div>
          <div className="text-sm font-medium text-gray-900">{quote.service}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Location</div>
          <div className="text-sm font-medium text-gray-900">{quote.location}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Budget</div>
          <div className="text-sm font-medium text-gray-900">{quote.budget}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Duration</div>
          <div className="text-sm font-medium text-gray-900">{quote.duration}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Message</div>
        <p className="text-sm text-gray-700 line-clamp-2">{quote.message}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Submitted: {new Date(quote.submittedAt).toLocaleDateString()}</span>
        {quote.followUpDate && (
          <span className="text-orange-600 font-medium">
            Follow-up: {new Date(quote.followUpDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Details
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            Send Quote
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Schedule Call
          </button>
        </div>
        <div className="text-xs text-gray-400">
          #{quote.id.toString().padStart(4, '0')}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quote Management</h2>
          <p className="text-gray-600">Manage incoming quote requests and follow-ups</p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
            style={{ background: BRAND_BLUE }}
          >
            + Manual Quote
          </motion.button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => setFilterStatus(status.value)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                filterStatus === status.value
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {status.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                {status.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {selectedQuotes.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {selectedQuotes.length} selected
            </span>
            <button className="px-3 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
              Bulk Update Status
            </button>
            <button className="px-3 py-2 text-green-600 hover:text-green-700 text-sm font-medium">
              Send Quotes
            </button>
            <button 
              onClick={() => setSelectedQuotes([])}
              className="px-3 py-2 text-gray-600 hover:text-gray-700 text-sm font-medium"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Quotes List */}
      <AnimatePresence>
        <div className="space-y-4">
          {filteredQuotes.map(quote => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredQuotes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'No quote requests match the selected filter'}
          </p>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {quotes.filter(q => q.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-500">Pending Quotes</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {quotes.filter(q => q.status === 'in_progress').length}
              </div>
              <div className="text-sm text-gray-500">In Progress</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {quotes.filter(q => q.status === 'quoted').length}
              </div>
              <div className="text-sm text-gray-500">Quotes Sent</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {quotes.filter(q => q.status === 'converted').length}
              </div>
              <div className="text-sm text-gray-500">Converted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuoteManager