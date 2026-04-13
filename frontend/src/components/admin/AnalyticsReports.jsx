import { useState } from 'react'
import { motion } from 'framer-motion'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const AnalyticsReports = () => {
  const [timeRange, setTimeRange] = useState('30d')
  const [reportType, setReportType] = useState('overview')

  // Mock analytics data
  const analytics = {
    overview: {
      totalRevenue: 125400000,
      totalImpressions: 45672000,
      activeCampaigns: 8,
      totalClients: 23,
      conversionRate: 3.2,
      avgCampaignDuration: 45
    },
    traffic: [
      { date: '2026-03-01', views: 12500, clicks: 340 },
      { date: '2026-03-02', views: 13200, clicks: 380 },
      { date: '2026-03-03', views: 11800, clicks: 320 },
      { date: '2026-03-04', views: 14100, clicks: 420 },
      { date: '2026-03-05', views: 13600, clicks: 390 }
    ],
    topPerformers: [
      { name: 'Kampala Road Junction', impressions: 2500000, revenue: 12500000, type: 'Billboard' },
      { name: 'Entebbe Highway LED', impressions: 1800000, revenue: 9800000, type: 'LED Screen' },
      { name: 'Ntinda Shopping Complex', impressions: 1200000, revenue: 7200000, type: 'Wall Branding' },
      { name: 'Jinja Road Billboard', impressions: 980000, revenue: 5400000, type: 'Billboard' }
    ],
    clientMetrics: [
      { client: 'MTN Uganda', campaigns: 3, spent: 45000000, impressions: 8500000 },
      { client: 'Coca Cola Uganda', campaigns: 2, spent: 32000000, impressions: 6200000 },
      { client: 'Bank of Uganda', campaigns: 1, spent: 18000000, impressions: 3400000 }
    ]
  }

  const MetricCard = ({ title, value, change, trend, prefix = '', suffix = '' }) => (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trend === 'up' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
          }`}>
            <svg className={`w-3 h-3 ${trend === 'up' ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      {change && (
        <p className="text-xs text-gray-500 mt-1">
          {trend === 'up' ? 'Increased' : 'Decreased'} from last period
        </p>
      )}
    </motion.div>
  )

  const ChartPlaceholder = ({ title, height = 300 }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div 
        className="bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
        style={{ height: `${height}px` }}
      >
        <div className="text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-500 text-sm">Chart visualization will be implemented</p>
          <p className="text-gray-400 text-xs mt-1">with Chart.js or similar library</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600">Track performance and generate insights</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 text-white font-medium rounded-lg"
            style={{ background: BRAND_BLUE }}
          >
            Export Report
          </motion.button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'campaigns', label: 'Campaigns', icon: '🎯' },
            { id: 'locations', label: 'Locations', icon: '📍' },
            { id: 'clients', label: 'Clients', icon: '👥' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                reportType === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricCard
          title="Total Revenue"
          value={analytics.overview.totalRevenue / 1000000}
          suffix="M UGX"
          change={12.5}
          trend="up"
        />
        <MetricCard
          title="Total Impressions"
          value={analytics.overview.totalImpressions / 1000000}
          suffix="M"
          change={8.3}
          trend="up"
        />
        <MetricCard
          title="Active Campaigns"
          value={analytics.overview.activeCampaigns}
          change={25.0}
          trend="up"
        />
        <MetricCard
          title="Total Clients"
          value={analytics.overview.totalClients}
          change={-2.1}
          trend="down"
        />
        <MetricCard
          title="Conversion Rate"
          value={analytics.overview.conversionRate}
          suffix="%"
          change={5.2}
          trend="up"
        />
        <MetricCard
          title="Avg Campaign Duration"
          value={analytics.overview.avgCampaignDuration}
          suffix=" days"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Traffic Overview" />
        <ChartPlaceholder title="Revenue Trends" />
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Performing Locations */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Locations</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.topPerformers.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ background: BRAND_BLUE }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{location.name}</p>
                      <p className="text-xs text-gray-500">{location.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {(location.revenue / 1000000).toFixed(1)}M UGX
                    </p>
                    <p className="text-xs text-gray-500">
                      {(location.impressions / 1000000).toFixed(1)}M views
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Performance */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Client Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics.clientMetrics.map((client, index) => (
                <motion.div
                  key={client.client}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">{client.client}</p>
                    <p className="text-xs text-gray-500">{client.campaigns} campaigns</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {(client.spent / 1000000).toFixed(1)}M UGX
                    </p>
                    <p className="text-xs text-gray-500">
                      {(client.impressions / 1000000).toFixed(1)}M views
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Monthly Revenue Report', icon: '💰', description: 'Detailed revenue breakdown' },
            { title: 'Campaign Performance', icon: '📈', description: 'Campaign ROI analysis' },
            { title: 'Client Activity Report', icon: '👥', description: 'Client engagement metrics' },
            { title: 'Location Analytics', icon: '📍', description: 'Location performance data' }
          ].map((report) => (
            <motion.button
              key={report.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="text-2xl mb-2">{report.icon}</div>
              <div className="font-medium text-gray-900 mb-1">{report.title}</div>
              <div className="text-sm text-gray-500">{report.description}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsReports