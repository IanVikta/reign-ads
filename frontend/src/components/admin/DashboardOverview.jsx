import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const DashboardOverview = () => {
  const [timeRange, setTimeRange] = useState('7d')
  
  // Mock data - replace with real API calls
  const stats = {
    totalViews: { value: 45672, change: 12.5, trend: 'up' },
    activeQuotes: { value: 23, change: -2.1, trend: 'down' },
    activeCampaigns: { value: 8, change: 25.0, trend: 'up' },
    revenue: { value: 125400, change: 8.3, trend: 'up' }
  }

  const recentActivity = [
    { id: 1, type: 'quote', message: 'New quote request from MTN Uganda', time: '2 min ago', status: 'pending' },
    { id: 2, type: 'campaign', message: 'Billboard campaign "Summer Sale" went live', time: '1 hour ago', status: 'active' },
    { id: 3, type: 'client', message: 'Client "Coca Cola" updated their profile', time: '3 hours ago', status: 'completed' },
    { id: 4, type: 'system', message: 'Weekly backup completed successfully', time: '1 day ago', status: 'completed' }
  ]

  const topLocations = [
    { name: 'Kampala Road Junction', impressions: 125000, revenue: 45000 },
    { name: 'Entebbe Airport Highway', impressions: 98000, revenue: 38000 },
    { name: 'Nakawa Industrial Area', impressions: 87000, revenue: 32000 },
    { name: 'Ntinda Shopping Complex', impressions: 76000, revenue: 28000 }
  ]

  const StatCard = ({ title, value, change, trend, prefix = '', suffix = '' }) => (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          trend === 'up' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
        }`}>
          <svg className={`w-3 h-3 ${trend === 'up' ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {Math.abs(change)}%
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {prefix}{value.toLocaleString()}{suffix}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {trend === 'up' ? 'Increased' : 'Decreased'} from last {timeRange === '7d' ? 'week' : 'month'}
      </p>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      
      {/* Header with Time Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600">Monitor your advertising business performance</p>
        </div>
        
        <div className="flex items-center gap-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                timeRange === range
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{
                background: timeRange === range ? BRAND_BLUE : 'transparent'
              }}
            >
              {range === '7d' ? 'Last 7 days' : range === '30d' ? 'Last 30 days' : 'Last 90 days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Page Views"
          value={stats.totalViews.value}
          change={stats.totalViews.change}
          trend={stats.totalViews.trend}
        />
        <StatCard
          title="Active Quotes"
          value={stats.activeQuotes.value}
          change={stats.activeQuotes.change}
          trend={stats.activeQuotes.trend}
        />
        <StatCard
          title="Running Campaigns"
          value={stats.activeCampaigns.value}
          change={stats.activeCampaigns.change}
          trend={stats.activeCampaigns.trend}
        />
        <StatCard
          title="Revenue (UGX)"
          value={stats.revenue.value}
          change={stats.revenue.change}
          trend={stats.revenue.trend}
          suffix="K"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      activity.type === 'quote' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'campaign' ? 'bg-green-100 text-green-600' :
                      activity.type === 'client' ? 'bg-purple-100 text-purple-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.type === 'quote' ? '💼' :
                       activity.type === 'campaign' ? '🎯' :
                       activity.type === 'client' ? '👤' : '🔧'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      activity.status === 'active' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {activity.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Locations */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Locations</h3>
              <p className="text-sm text-gray-600 mt-1">Best performing billboard locations</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topLocations.map((location, index) => (
                  <motion.div
                    key={location.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: BRAND_BLUE }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{location.name}</p>
                        <p className="text-xs text-gray-500">{location.impressions.toLocaleString()} views</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {location.revenue.toLocaleString()}K
                      </p>
                      <p className="text-xs text-gray-500">UGX</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'New Campaign', icon: '🎯', color: 'blue' },
            { label: 'Add Location', icon: '📍', color: 'green' },
            { label: 'Upload Media', icon: '📸', color: 'purple' },
            { label: 'Generate Report', icon: '📊', color: 'orange' }
          ].map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border-2 border-dashed transition-colors ${
                action.color === 'blue' ? 'border-blue-300 hover:border-blue-400 hover:bg-blue-50' :
                action.color === 'green' ? 'border-green-300 hover:border-green-400 hover:bg-green-50' :
                action.color === 'purple' ? 'border-purple-300 hover:border-purple-400 hover:bg-purple-50' :
                'border-orange-300 hover:border-orange-400 hover:bg-orange-50'
              }`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="text-sm font-medium text-gray-700">{action.label}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview