import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Import admin modules
import DashboardOverview from '../components/admin/DashboardOverview'
import ContentManager from '../components/admin/ContentManager'
import MediaLibrary from '../components/admin/MediaLibrary'
import ClientManager from '../components/admin/ClientManager'
import CampaignManager from '../components/admin/CampaignManager'
import AnalyticsReports from '../components/admin/AnalyticsReports'
import QuoteManager from '../components/admin/QuoteManager'
import UserManager from '../components/admin/UserManager'
import SystemSettings from '../components/admin/SystemSettings'
import SystemHealth from '../components/admin/SystemHealth'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const AdminDashboardNew = () => {
  const [activeModule, setActiveModule] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'New quote request received', time: '2 min ago' },
    { id: 2, type: 'success', message: 'Campaign "Downtown Billboard" approved', time: '1 hour ago' },
    { id: 3, type: 'warning', message: 'Server backup scheduled for tonight', time: '3 hours ago' }
  ])

  const modules = [
    { 
      id: 'overview', 
      label: 'Dashboard', 
      icon: '📊', 
      component: DashboardOverview,
      description: 'Analytics & Overview'
    },
    { 
      id: 'content', 
      label: 'Content', 
      icon: '📝', 
      component: ContentManager,
      description: 'Blog & Portfolio'
    },
    { 
      id: 'media', 
      label: 'Media', 
      icon: '🖼️', 
      component: MediaLibrary,
      description: 'Images & Videos'
    },
    { 
      id: 'clients', 
      label: 'Clients', 
      icon: '👥', 
      component: ClientManager,
      description: 'Client Management'
    },
    { 
      id: 'campaigns', 
      label: 'Campaigns', 
      icon: '🎯', 
      component: CampaignManager,
      description: 'Ad Campaigns'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: '📈', 
      component: AnalyticsReports,
      description: 'Reports & Insights'
    },
    { 
      id: 'quotes', 
      label: 'Quotes', 
      icon: '💼', 
      component: QuoteManager,
      description: 'Quote Requests'
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: '🔐', 
      component: UserManager,
      description: 'User Management'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: '⚙️', 
      component: SystemSettings,
      description: 'Configuration'
    },
    { 
      id: 'health', 
      label: 'System', 
      icon: '🔧', 
      component: SystemHealth,
      description: 'System Status'
    }
  ]

  const activeModuleData = modules.find(m => m.id === activeModule)
  const ActiveComponent = activeModuleData?.component

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          width: sidebarCollapsed ? '80px' : '280px',
          x: mobileMenuOpen || !sidebarCollapsed ? 0 : (window.innerWidth < 1024 ? -280 : 0)
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`bg-white border-r border-gray-200 flex flex-col fixed lg:relative z-50 h-full ${
          mobileMenuOpen ? 'shadow-2xl' : ''
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: BRAND_BLUE }}
                >
                  RA
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Reign Ads</h2>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:block hidden"
            >
              <svg 
                className={`w-4 h-4 text-gray-600 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {modules.map((module) => (
            <motion.button
              key={module.id}
              onClick={() => {
                setActiveModule(module.id)
                setMobileMenuOpen(false)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all group ${
                activeModule === module.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={{
                background: activeModule === module.id ? BRAND_BLUE : 'transparent'
              }}
            >
              <span className="text-lg flex-shrink-0">{module.icon}</span>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-medium">{module.label}</div>
                  <div className={`text-xs ${
                    activeModule === module.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {module.description}
                  </div>
                </div>
              )}
              {activeModule === module.id && !sidebarCollapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-2 h-2 rounded-full"
                  style={{ background: BRAND_GOLD }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">AD</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-900">Admin User</div>
                <div className="text-xs text-gray-500">admin@reignads.com</div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Left: Mobile menu + Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {activeModuleData?.label}
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  {activeModuleData?.description}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12M7 7l3 3M3 3l18 18" />
                  </svg>
                  {notifications.length > 0 && (
                    <div 
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold text-white flex items-center justify-center"
                      style={{ background: BRAND_BLUE }}
                    >
                      {notifications.length}
                    </div>
                  )}
                </button>
              </div>

              {/* Back to Website */}
              <a
                href="/"
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Website
              </a>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {ActiveComponent && <ActiveComponent />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboardNew