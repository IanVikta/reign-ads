import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BRAND_BLUE = '#0220aa'
const BRAND_GOLD = '#ffd22a'

const MediaLibrary = () => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const fileInputRef = useRef(null)

  // Mock data - replace with real API calls
  const mediaFiles = [
    {
      id: 1,
      name: 'billboard-kampala-road.jpg',
      type: 'image',
      category: 'billboards',
      size: '2.4 MB',
      dimensions: '1920x1080',
      uploadDate: '2026-03-01',
      url: '/images/portfolio/billboards/Gentex-Billboard along airport road.JPG',
      tags: ['billboard', 'kampala', 'outdoor']
    },
    {
      id: 2,
      name: 'led-screen-ntinda.jpg',
      type: 'image',
      category: 'led-screens',
      size: '3.1 MB',
      dimensions: '1920x1080',
      uploadDate: '2026-02-28',
      url: '/images/portfolio/led-screens/led-1.jpg',
      tags: ['led', 'digital', 'ntinda']
    },
    {
      id: 3,
      name: 'wall-branding-mtn.jpg',
      type: 'image',
      category: 'wall-branding',
      size: '1.8 MB',
      dimensions: '1920x1080',
      uploadDate: '2026-02-25',
      url: '/images/portfolio/wall-branding/mtn_wall_lugogo.jpg',
      tags: ['wall', 'branding', 'mtn']
    },
    {
      id: 4,
      name: 'campaign-video.mp4',
      type: 'video',
      category: 'videos',
      size: '15.2 MB',
      dimensions: '1920x1080',
      uploadDate: '2026-02-20',
      url: '/videos/hero-background.mp4',
      tags: ['video', 'campaign', 'promotional']
    },
    {
      id: 5,
      name: 'logo-blue.png',
      type: 'image',
      category: 'logos',
      size: '245 KB',
      dimensions: '512x512',
      uploadDate: '2026-02-15',
      url: '/images/logo-blue.png',
      tags: ['logo', 'brand', 'blue']
    }
  ]

  const categories = [
    { id: 'all', label: 'All Files', count: mediaFiles.length },
    { id: 'billboards', label: 'Billboards', count: mediaFiles.filter(f => f.category === 'billboards').length },
    { id: 'led-screens', label: 'LED Screens', count: mediaFiles.filter(f => f.category === 'led-screens').length },
    { id: 'wall-branding', label: 'Wall Branding', count: mediaFiles.filter(f => f.category === 'wall-branding').length },
    { id: 'videos', label: 'Videos', count: mediaFiles.filter(f => f.category === 'videos').length },
    { id: 'logos', label: 'Logos', count: mediaFiles.filter(f => f.category === 'logos').length }
  ]

  const filteredFiles = mediaFiles.filter(file => {
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    console.log('Files selected:', files)
    // Handle file upload logic here
    setShowUploadModal(false)
  }

  const MediaCard = ({ file }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
      className={`bg-white border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
        selectedFiles.includes(file.id) 
          ? 'border-blue-500 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={() => handleFileSelect(file.id)}
    >
      {/* Preview */}
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        {file.type === 'image' ? (
          <img 
            src={file.url} 
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : file.type === 'video' ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )}
        
        {/* Selection indicator */}
        {selectedFiles.includes(file.id) && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* File info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 truncate mb-1">{file.name}</h3>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{file.size}</span>
          <span>{file.dimensions}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {file.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              {tag}
            </span>
          ))}
          {file.tags.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              +{file.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )

  const MediaListItem = ({ file }) => (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`bg-white border rounded-lg p-4 cursor-pointer transition-all ${
        selectedFiles.includes(file.id) 
          ? 'border-blue-500 shadow-md' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => handleFileSelect(file.id)}
    >
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {file.type === 'image' ? (
            <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* File details */}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{file.name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
            <span>{file.size}</span>
            <span>{file.dimensions}</span>
            <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {file.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
          <p className="text-gray-600">Manage your images, videos, and other media files</p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            className="px-6 py-3 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
            style={{ background: BRAND_BLUE }}
          >
            + Upload Files
          </motion.button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* Categories */}
        <div className="lg:w-64">
          <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
          <div className="space-y-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{category.label}</span>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          
          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Selected Files Actions */}
          {selectedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-blue-700 font-medium">
                  {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Download
                  </button>
                  <button className="px-3 py-1 text-red-600 hover:text-red-700 text-sm font-medium">
                    Delete
                  </button>
                  <button 
                    onClick={() => setSelectedFiles([])}
                    className="px-3 py-1 text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Media Grid/List */}
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredFiles.map(file => (
                  <MediaCard key={file.id} file={file} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredFiles.map(file => (
                  <MediaListItem key={file.id} file={file} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {filteredFiles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : 'Upload your first media files to get started'}
              </p>
              <button
                onClick={handleUpload}
                className="px-6 py-3 text-white font-medium rounded-lg"
                style={{ background: BRAND_BLUE }}
              >
                Upload Files
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MediaLibrary