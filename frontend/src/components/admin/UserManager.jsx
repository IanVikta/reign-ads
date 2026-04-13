import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const UserManager = () => {
  const [activeTab, setActiveTab] = useState('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  // Mock user data
  const users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@reignads.com',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2026-03-10T14:30:00Z',
      createdAt: '2025-01-15T09:00:00Z',
      avatar: null,
      permissions: ['all']
    },
    {
      id: 2,
      name: 'Sarah Nakato',
      email: 'sarah@reignads.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2026-03-09T16:45:00Z',
      createdAt: '2025-03-20T10:30:00Z',
      avatar: null,
      permissions: ['content', 'clients', 'campaigns']
    },
    {
      id: 3,
      name: 'John Mukasa',
      email: 'john@reignads.com',
      role: 'editor',
      status: 'active',
      lastLogin: '2026-03-08T11:20:00Z',
      createdAt: '2025-06-10T14:15:00Z',
      avatar: null,
      permissions: ['content', 'media']
    },
    {
      id: 4,
      name: 'Grace Namuli',
      email: 'grace@reignads.com',
      role: 'viewer',
      status: 'inactive',
      lastLogin: '2026-02-28T09:10:00Z',
      createdAt: '2025-08-05T16:00:00Z',
      avatar: null,
      permissions: ['analytics']
    }
  ]

  const roles = [
    {
      id: 'super_admin',
      name: 'Super Admin',
      description: 'Full system access and user management',
      permissions: ['all'],
      color: 'red'
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Manage content, clients, and campaigns',
      permissions: ['content', 'clients', 'campaigns', 'analytics'],
      color: 'blue'
    },
    {
      id: 'editor',
      name: 'Editor',
      description: 'Create and edit content and media',
      permissions: ['content', 'media'],
      color: 'green'
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'View-only access to analytics and reports',
      permissions: ['analytics'],
      color: 'gray'
    }
  ]

  const permissions = [
    { id: 'all', name: 'All Permissions', description: 'Complete system access' },
    { id: 'content', name: 'Content Management', description: 'Manage blog posts and portfolio' },
    { id: 'media', name: 'Media Library', description: 'Upload and manage media files' },
    { id: 'clients', name: 'Client Management', description: 'Manage clients and testimonials' },
    { id: 'campaigns', name: 'Campaign Management', description: 'Manage advertising campaigns' },
    { id: 'analytics', name: 'Analytics & Reports', description: 'View analytics and generate reports' },
    { id: 'quotes', name: 'Quote Management', description: 'Manage quote requests' },
    { id: 'users', name: 'User Management', description: 'Manage system users' },
    { id: 'settings', name: 'System Settings', description: 'Configure system settings' }
  ]

  const tabs = [
    { id: 'users', label: 'Users', icon: '👥', count: users.length },
    { id: 'roles', label: 'Roles', icon: '🔐', count: roles.length }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const getRoleColor = (roleId) => {
    const role = roles.find(r => r.id === roleId)
    switch (role?.color) {
      case 'red': return 'bg-red-100 text-red-700'
      case 'blue': return 'bg-blue-100 text-blue-700'
      case 'green': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const UserCard = ({ user }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <span className="text-lg font-bold text-gray-600">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                {roles.find(r => r.id === user.role)?.name}
              </span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          user.status === 'active' ? 'bg-green-100 text-green-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {user.status}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Last Login</div>
          <div className="text-sm font-medium text-gray-900">
            {new Date(user.lastLogin).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Member Since</div>
          <div className="text-sm font-medium text-gray-900">
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Permissions</div>
        <div className="flex flex-wrap gap-1">
          {user.permissions.includes('all') ? (
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
              All Permissions
            </span>
          ) : (
            user.permissions.map(permission => (
              <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {permissions.find(p => p.id === permission)?.name}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Edit
          </button>
          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
            {user.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            Reset Password
          </button>
        </div>
        {user.role !== 'super_admin' && (
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            Delete
          </button>
        )}
      </div>
    </motion.div>
  )

  const RoleCard = ({ role }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{role.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{role.description}</p>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(role.id)}`}>
              {users.filter(u => u.role === role.id).length} users
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-2">Permissions</div>
        <div className="flex flex-wrap gap-1">
          {role.permissions.includes('all') ? (
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
              All Permissions
            </span>
          ) : (
            role.permissions.map(permission => (
              <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {permissions.find(p => p.id === permission)?.name}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Edit Permissions
          </button>
          <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
            View Users
          </button>
        </div>
        {role.id !== 'super_admin' && (
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            Delete Role
          </button>
        )}
      </div>
    </motion.div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="space-y-4">
            {filteredUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )
      case 'roles':
        return (
          <div className="space-y-4">
            {roles.map(role => (
              <RoleCard key={role.id} role={role} />
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
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage system users, roles, and permissions</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
          style={{ background: BRAND_BLUE }}
        >
          + Add New {activeTab === 'users' ? 'User' : 'Role'}
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
      {activeTab === 'users' && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
      )}

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
      {activeTab === 'users' && filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Add your first user to get started'}
          </p>
          <button
            className="px-6 py-3 text-white font-medium rounded-lg"
            style={{ background: BRAND_BLUE }}
          >
            Add New User
          </button>
        </motion.div>
      )}

      {/* Security Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">Security Reminder</h4>
            <p className="text-sm text-yellow-700">
              Always use strong passwords and enable two-factor authentication for admin accounts. 
              Regularly review user permissions and remove access for inactive users.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManager