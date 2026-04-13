import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const CampaignManager = () => {
  const [activeView, setActiveView] = useState('campaigns')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data
  const campaigns = [
    {
      id: 1,
      name: 'MTN Summer Promotion',
      client: 'MTN Uganda',
      status: 'active',
      startDate: '2026-03-01',
      endDate: '2026-05-31',
      budget: 25000000,
      spent: 8500000,
      locations: ['Kampala Road', 'Entebbe Highway', 'Ntinda Junction'],
      impressions: 2500000,
      type: 'Billboard'
    },
    {
      id: 2,
      name: 'Coca Cola Refresh Campaign',
      client: 'Coca Cola Uganda',
      status: 'active',
      startDate: '2026-02-15',
      endDate: '2026-04-15',
      budget: 18000000,
      spent: 12000000,
      locations: ['LED Screen - Ntinda', 'LED Screen - Garden City'],
      impressions: 1800000,
      type: 'LED Screen'
    },
    {
      id: 3,
      name: 'Bank of Uganda Financial Literacy',
      client: 'Bank of Uganda',
      status: 'completed',
      startDate: '2025-12-01',
      endDate: '2026-02-28',
      budget: 15000000,
      spent: 14500000,
      locations: ['Wall Branding - Lugogo', 'Billboard - Jinja Road'],
      impressions: 1200000,
      type: 'Mixed'
    }
  ]

  const locations = [
    {
      id: 1,
      name: 'Kampala Road Junction',
      type: 'Billboard',
      size: '48 Sheet',
      status: 'occupied',
      currentClient: 'MTN Uganda',
      monthlyRate: 2500000,
      impressions: 125000,
      coordinates: { lat: 0.3476, lng: 32.5825 }
    },
    {
      id: 2,
      name: 'Entebbe Airport Highway',
      type: 'Billboard',
      size: '96 Sheet',
      status: 'available',
      currentClient: null,
      monthlyRate: 3500000,
      impressions: 98000,
      coordinates: { lat: 0.3476, lng: 32.5825 }
    },
    {
      id: 3,
      name: 'Ntinda Shopping Complex',
      type: 'LED Screen',
      size: '10x6m',
      status: 'occupied',
      currentClient: 'Coca Cola Uganda',
      monthlyRate: 5000000,
      impressions: 87000,
      coordinates: { lat: 0.3476, lng: 32.5825 }
    }
  ]

  const CampaignCard = ({ campaign }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{campaign.name}</h3>
          <p className="text-sm text-gray-600">{campaign.client}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {campaign.type}
            </span>
            <span className="text-xs text-gray-500">
              {campaign.locations.length} location{campaign.locations.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          campaign.status === 'active' ? 'bg-green-100 text-green-700' :
          campaign.status === 'completed' ? 'bg-blue-100 text-blue-700' :
          campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {campaign.status}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="text-lg font-bold text-gray-900">
            {(campaign.budget / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-500">Budget (UGX)</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900">
            {(campaign.spent / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-500">Spent (UGX)</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900">
            {(campaign.impressions / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-500">Impressions</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900">
            {Math.round((campaign.spent / campaign.budget) * 100)}%
          </div>
          <div className="text-xs text-gray-500">Budget Used</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Campaign Progress</span>
          <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all"
            style={{ 
              width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%`,
              background: BRAND_BLUE 
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Start: {new Date(campaign.startDate).toLocaleDateString()}</span>
        <span>End: {new Date(campaign.endDate).toLocaleDateString()}</span>
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
            Reports
          </button>
        </div>
      </div>
    </motion.div>
  )

  const LocationCard = ({ location }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{location.name}</h3>
          <p className="text-sm text-gray-600">{location.type} - {location.size}</p>
          {location.currentClient && (
            <p className="text-sm text-blue-600 mt-1">Current: {location.currentClient}</p>
          )}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          location.status === 'available' ? 'bg-green-100 text-green-700' :
          location.status === 'occupied' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {location.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-lg font-bold text-gray-900">
            {(location.monthlyRate / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-500">Monthly Rate (UGX)</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900">
            {(location.impressions / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-gray-500">Monthly Impressions</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Details
          </button>
          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
            Edit
          </button>
          {location.status === 'available' && (
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              Book
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
          <p className="text-gray-600">Manage advertising campaigns and locations</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
          style={{ background: BRAND_BLUE }}
        >
          + New {activeView === 'campaigns' ? 'Campaign' : 'Location'}
        </motion.button>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveView('campaigns')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeView === 'campaigns'
              ? 'text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          style={{
            background: activeView === 'campaigns' ? BRAND_BLUE : 'transparent'
          }}
        >
          🎯 Campaigns ({campaigns.length})
        </button>
        <button
          onClick={() => setActiveView('locations')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeView === 'locations'
              ? 'text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          style={{
            background: activeView === 'locations' ? BRAND_BLUE : 'transparent'
          }}
        >
          📍 Locations ({locations.length})
        </button>
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
              placeholder={`Search ${activeView}...`}
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
          {activeView === 'campaigns' ? (
            <>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </>
          ) : (
            <>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </>
          )}
        </select>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {activeView === 'campaigns' ? (
            campaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))
          ) : (
            locations.map(location => (
              <LocationCard key={location.id} location={location} />
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default CampaignManager