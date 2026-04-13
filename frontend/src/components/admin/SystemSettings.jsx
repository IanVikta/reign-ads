import { useState } from 'react'
import { motion } from 'framer-motion'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const SystemSettings = () => {
  const [activeSection, setActiveSection] = useState('general')
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Reign Ads',
    siteDescription: 'East Africa\'s Premier Outdoor Advertising Agency',
    contactEmail: 'info@reignads.com',
    contactPhone: '+256 700 123 456',
    address: 'Kampala, Uganda',
    timezone: 'Africa/Kampala',
    language: 'en',
    
    // SEO Settings
    metaTitle: 'Reign Ads - Outdoor Advertising in Uganda',
    metaDescription: 'Strategic billboard placements, LED screens, and large-format printing across Uganda. Elevate your brand with East Africa\'s premier advertising agency.',
    metaKeywords: 'billboard advertising, LED screens, outdoor advertising, Uganda, Kampala',
    googleAnalyticsId: 'GA-XXXXXXXXX',
    facebookPixelId: '',
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@reignads.com',
    smtpPassword: '••••••••',
    fromEmail: 'noreply@reignads.com',
    fromName: 'Reign Ads',
    
    // Social Media
    facebookUrl: 'https://facebook.com/reignads',
    twitterUrl: 'https://twitter.com/reignads',
    instagramUrl: 'https://instagram.com/reignads',
    linkedinUrl: 'https://linkedin.com/company/reignads',
    whatsappNumber: '+256700123456',
    
    // Business Settings
    currency: 'UGX',
    taxRate: '18',
    businessHours: '8:00 AM - 6:00 PM',
    workingDays: 'Monday - Friday',
    
    // Security Settings
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordMinLength: '8',
    requireTwoFactor: false,
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: '30',
    
    // Notification Settings
    emailNotifications: true,
    newQuoteNotification: true,
    campaignAlerts: true,
    systemAlerts: true
  })

  const sections = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'seo', label: 'SEO & Analytics', icon: '📈' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'social', label: 'Social Media', icon: '🌐' },
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'backup', label: 'Backup', icon: '💾' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' }
  ]

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log('Saving settings:', settings)
    // Handle save logic here
  }

  const FormField = ({ label, name, type = 'text', placeholder, description, options = [] }) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {type === 'select' ? (
        <select
          value={settings[name]}
          onChange={(e) => handleSettingChange(name, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={settings[name]}
          onChange={(e) => handleSettingChange(name, e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ) : type === 'checkbox' ? (
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings[name]}
            onChange={(e) => handleSettingChange(name, e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">{description}</span>
        </label>
      ) : (
        <input
          type={type}
          value={settings[name]}
          onChange={(e) => handleSettingChange(name, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}
      {description && type !== 'checkbox' && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
            <FormField
              label="Site Name"
              name="siteName"
              placeholder="Enter site name"
              description="The name of your website"
            />
            <FormField
              label="Site Description"
              name="siteDescription"
              type="textarea"
              placeholder="Enter site description"
              description="Brief description of your business"
            />
            <FormField
              label="Contact Email"
              name="contactEmail"
              type="email"
              placeholder="info@reignads.com"
              description="Main contact email address"
            />
            <FormField
              label="Contact Phone"
              name="contactPhone"
              placeholder="+256 700 123 456"
              description="Main contact phone number"
            />
            <FormField
              label="Address"
              name="address"
              placeholder="Enter business address"
              description="Business address for contact information"
            />
            <FormField
              label="Timezone"
              name="timezone"
              type="select"
              options={[
                { value: 'Africa/Kampala', label: 'Africa/Kampala (UTC+3)' },
                { value: 'Africa/Nairobi', label: 'Africa/Nairobi (UTC+3)' },
                { value: 'UTC', label: 'UTC (UTC+0)' }
              ]}
              description="Default timezone for the system"
            />
            <FormField
              label="Language"
              name="language"
              type="select"
              options={[
                { value: 'en', label: 'English' },
                { value: 'sw', label: 'Swahili' }
              ]}
              description="Default language for the system"
            />
          </div>
        )

      case 'seo':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">SEO & Analytics</h3>
            <FormField
              label="Meta Title"
              name="metaTitle"
              placeholder="Enter meta title"
              description="Title that appears in search results"
            />
            <FormField
              label="Meta Description"
              name="metaDescription"
              type="textarea"
              placeholder="Enter meta description"
              description="Description that appears in search results"
            />
            <FormField
              label="Meta Keywords"
              name="metaKeywords"
              placeholder="keyword1, keyword2, keyword3"
              description="Comma-separated keywords for SEO"
            />
            <FormField
              label="Google Analytics ID"
              name="googleAnalyticsId"
              placeholder="GA-XXXXXXXXX"
              description="Google Analytics tracking ID"
            />
            <FormField
              label="Facebook Pixel ID"
              name="facebookPixelId"
              placeholder="Enter Facebook Pixel ID"
              description="Facebook Pixel for tracking conversions"
            />
          </div>
        )

      case 'email':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Settings</h3>
            <FormField
              label="SMTP Host"
              name="smtpHost"
              placeholder="smtp.gmail.com"
              description="SMTP server hostname"
            />
            <FormField
              label="SMTP Port"
              name="smtpPort"
              placeholder="587"
              description="SMTP server port (usually 587 or 465)"
            />
            <FormField
              label="SMTP Username"
              name="smtpUsername"
              placeholder="Enter SMTP username"
              description="Username for SMTP authentication"
            />
            <FormField
              label="SMTP Password"
              name="smtpPassword"
              type="password"
              placeholder="Enter SMTP password"
              description="Password for SMTP authentication"
            />
            <FormField
              label="From Email"
              name="fromEmail"
              type="email"
              placeholder="noreply@reignads.com"
              description="Email address for outgoing emails"
            />
            <FormField
              label="From Name"
              name="fromName"
              placeholder="Reign Ads"
              description="Name for outgoing emails"
            />
          </div>
        )

      case 'social':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media</h3>
            <FormField
              label="Facebook URL"
              name="facebookUrl"
              placeholder="https://facebook.com/reignads"
              description="Facebook page URL"
            />
            <FormField
              label="Twitter URL"
              name="twitterUrl"
              placeholder="https://twitter.com/reignads"
              description="Twitter profile URL"
            />
            <FormField
              label="Instagram URL"
              name="instagramUrl"
              placeholder="https://instagram.com/reignads"
              description="Instagram profile URL"
            />
            <FormField
              label="LinkedIn URL"
              name="linkedinUrl"
              placeholder="https://linkedin.com/company/reignads"
              description="LinkedIn company page URL"
            />
            <FormField
              label="WhatsApp Number"
              name="whatsappNumber"
              placeholder="+256700123456"
              description="WhatsApp number for customer support"
            />
          </div>
        )

      case 'business':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Settings</h3>
            <FormField
              label="Currency"
              name="currency"
              type="select"
              options={[
                { value: 'UGX', label: 'Ugandan Shilling (UGX)' },
                { value: 'USD', label: 'US Dollar (USD)' },
                { value: 'EUR', label: 'Euro (EUR)' }
              ]}
              description="Default currency for pricing"
            />
            <FormField
              label="Tax Rate (%)"
              name="taxRate"
              type="number"
              placeholder="18"
              description="Default tax rate percentage"
            />
            <FormField
              label="Business Hours"
              name="businessHours"
              placeholder="8:00 AM - 6:00 PM"
              description="Operating hours for customer reference"
            />
            <FormField
              label="Working Days"
              name="workingDays"
              placeholder="Monday - Friday"
              description="Working days for customer reference"
            />
          </div>
        )

      case 'security':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
            <FormField
              label="Session Timeout (minutes)"
              name="sessionTimeout"
              type="number"
              placeholder="30"
              description="Auto-logout after inactivity"
            />
            <FormField
              label="Max Login Attempts"
              name="maxLoginAttempts"
              type="number"
              placeholder="5"
              description="Maximum failed login attempts before lockout"
            />
            <FormField
              label="Minimum Password Length"
              name="passwordMinLength"
              type="number"
              placeholder="8"
              description="Minimum required password length"
            />
            <FormField
              label="Require Two-Factor Authentication"
              name="requireTwoFactor"
              type="checkbox"
              description="Require 2FA for all admin accounts"
            />
          </div>
        )

      case 'backup':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Backup Settings</h3>
            <FormField
              label="Automatic Backup"
              name="autoBackup"
              type="checkbox"
              description="Enable automatic system backups"
            />
            <FormField
              label="Backup Frequency"
              name="backupFrequency"
              type="select"
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' }
              ]}
              description="How often to create backups"
            />
            <FormField
              label="Backup Retention (days)"
              name="backupRetention"
              type="number"
              placeholder="30"
              description="How long to keep backup files"
            />
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-blue-800 mb-2">Manual Backup</h4>
              <p className="text-sm text-blue-700 mb-3">
                Create a backup of your system data and files right now.
              </p>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Backup Now
              </button>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
            <FormField
              label="Email Notifications"
              name="emailNotifications"
              type="checkbox"
              description="Enable email notifications for system events"
            />
            <FormField
              label="New Quote Notifications"
              name="newQuoteNotification"
              type="checkbox"
              description="Notify when new quote requests are received"
            />
            <FormField
              label="Campaign Alerts"
              name="campaignAlerts"
              type="checkbox"
              description="Notify about campaign status changes"
            />
            <FormField
              label="System Alerts"
              name="systemAlerts"
              type="checkbox"
              description="Notify about system maintenance and updates"
            />
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
          <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
          <p className="text-gray-600">Configure your system preferences and settings</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="px-6 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
          style={{ background: BRAND_BLUE }}
        >
          Save Changes
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Settings</h3>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={{
                    background: activeSection === section.id ? BRAND_BLUE : 'transparent'
                  }}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Version</div>
            <div className="font-medium text-gray-900">v2.1.0</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Last Updated</div>
            <div className="font-medium text-gray-900">March 10, 2026</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Environment</div>
            <div className="font-medium text-gray-900">Production</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Database</div>
            <div className="font-medium text-gray-900">MySQL 8.0</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemSettings