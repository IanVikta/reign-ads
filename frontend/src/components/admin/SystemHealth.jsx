import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const SystemHealth = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Mock system health data
  const systemStatus = {
    overall: 'healthy', // healthy, warning, critical
    uptime: '99.9%',
    responseTime: '245ms',
    lastIncident: '2026-02-15T10:30:00Z'
  }

  const services = [
    {
      name: 'Web Server',
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '120ms',
      lastCheck: '2026-03-10T14:30:00Z',
      description: 'Main web application server'
    },
    {
      name: 'Database',
      status: 'healthy',
      uptime: '99.8%',
      responseTime: '45ms',
      lastCheck: '2026-03-10T14:30:00Z',
      description: 'MySQL database server'
    },
    {
      name: 'File Storage',
      status: 'warning',
      uptime: '98.5%',
      responseTime: '890ms',
      lastCheck: '2026-03-10T14:29:00Z',
      description: 'Media file storage system'
    },
    {
      name: 'Email Service',
      status: 'healthy',
      uptime: '99.7%',
      responseTime: '340ms',
      lastCheck: '2026-03-10T14:30:00Z',
      description: 'SMTP email delivery service'
    },
    {
      name: 'Backup System',
      status: 'healthy',
      uptime: '100%',
      responseTime: 'N/A',
      lastCheck: '2026-03-10T06:00:00Z',
      description: 'Automated backup service'
    },
    {
      name: 'CDN',
      status: 'healthy',
      uptime: '99.9%',
      responseTime: '85ms',
      lastCheck: '2026-03-10T14:30:00Z',
      description: 'Content delivery network'
    }
  ]

  const metrics = [
    {
      name: 'CPU Usage',
      value: 45,
      unit: '%',
      status: 'healthy',
      threshold: 80
    },
    {
      name: 'Memory Usage',
      value: 62,
      unit: '%',
      status: 'healthy',
      threshold: 85
    },
    {
      name: 'Disk Usage',
      value: 78,
      unit: '%',
      status: 'warning',
      threshold: 75
    },
    {
      name: 'Network I/O',
      value: 23,
      unit: 'MB/s',
      status: 'healthy',
      threshold: 100
    }
  ]

  const recentEvents = [
    {
      id: 1,
      type: 'info',
      message: 'System backup completed successfully',
      timestamp: '2026-03-10T06:00:00Z',
      service: 'Backup System'
    },
    {
      id: 2,
      type: 'warning',
      message: 'File storage response time increased',
      timestamp: '2026-03-10T14:15:00Z',
      service: 'File Storage'
    },
    {
      id: 3,
      type: 'success',
      message: 'Database optimization completed',
      timestamp: '2026-03-10T12:00:00Z',
      service: 'Database'
    },
    {
      id: 4,
      type: 'info',
      message: 'Security scan completed - no issues found',
      timestamp: '2026-03-10T08:30:00Z',
      service: 'Security'
    }
  ]

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setRefreshing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      case 'critical':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      default:
        return null
    }
  }

  const MetricCard = ({ metric }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">{metric.name}</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
          {getStatusIcon(metric.status)}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">
          {metric.value}{metric.unit}
        </div>
        <div className="text-sm text-gray-500">
          Threshold: {metric.threshold}{metric.unit}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all ${
            metric.status === 'healthy' ? 'bg-green-500' :
            metric.status === 'warning' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` }}
        />
      </div>
    </div>
  )

  const ServiceCard = ({ service }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{service.name}</h3>
          <p className="text-sm text-gray-600">{service.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(service.status)}`}>
          {getStatusIcon(service.status)}
          {service.status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-gray-500 mb-1">Uptime</div>
          <div className="font-medium text-gray-900">{service.uptime}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Response</div>
          <div className="font-medium text-gray-900">{service.responseTime}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Last Check</div>
          <div className="font-medium text-gray-900">
            {new Date(service.lastCheck).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Health</h2>
          <p className="text-gray-600">Monitor system performance and service status</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-6 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
            style={{ background: BRAND_BLUE }}
          >
            {refreshing ? (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refreshing...
              </div>
            ) : (
              'Refresh Status'
            )}
          </motion.button>
        </div>
      </div>

      {/* Overall Status */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Overall System Status</h3>
          <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(systemStatus.overall)}`}>
            {getStatusIcon(systemStatus.overall)}
            All Systems Operational
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{systemStatus.uptime}</div>
            <div className="text-sm text-gray-500">Uptime (30 days)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{systemStatus.responseTime}</div>
            <div className="text-sm text-gray-500">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {Math.floor((new Date() - new Date(systemStatus.lastIncident)) / (24 * 60 * 60 * 1000))} days
            </div>
            <div className="text-sm text-gray-500">Since Last Incident</div>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map(metric => (
            <MetricCard key={metric.name} metric={metric} />
          ))}
        </div>
      </div>

      {/* Services Status */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Status</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map(service => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Events</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  event.type === 'success' ? 'bg-green-100 text-green-600' :
                  event.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  event.type === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {event.type === 'success' ? '✓' :
                   event.type === 'warning' ? '⚠' :
                   event.type === 'error' ? '✗' : 'ℹ'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.message}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span>{event.service}</span>
                    <span>{new Date(event.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Run Diagnostics', icon: '🔍', color: 'blue' },
            { label: 'Clear Cache', icon: '🗑️', color: 'gray' },
            { label: 'Restart Services', icon: '🔄', color: 'orange' },
            { label: 'View Logs', icon: '📋', color: 'green' }
          ].map((action) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 border-2 border-dashed rounded-lg transition-colors text-left ${
                action.color === 'blue' ? 'border-blue-300 hover:border-blue-400 hover:bg-blue-50' :
                action.color === 'gray' ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50' :
                action.color === 'orange' ? 'border-orange-300 hover:border-orange-400 hover:bg-orange-50' :
                'border-green-300 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="font-medium text-gray-900">{action.label}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SystemHealth