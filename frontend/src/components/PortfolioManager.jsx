import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'
import Swal from 'sweetalert2'

const BB = '#0220aa'
const BG = '#ffd22a'

const PortfolioManager = () => {
  const [portfolioItems, setPortfolioItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'billboards',
    description: '',
    image: null
  })

  const categories = [
    { value: 'billboards', label: 'Billboards' },
    { value: 'led-screens', label: 'LED Screens' },
    { value: 'wall-branding', label: 'Wall Branding' },
    { value: 'signage', label: 'Signage' },
    { value: 'street-poles', label: 'Street Poles' },
    { value: 'automobile-branding', label: 'Automobile Branding' }
  ]

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    try {
      const response = await api.get('/media/portfolio')
      if (response.data.success) {
        setPortfolioItems(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching portfolio items:', error)
      Swal.fire({
        title: 'Error',
        text: 'Failed to load portfolio items',
        icon: 'error',
        confirmButtonColor: BB
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      image: file
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    const uploadData = new FormData()
    uploadData.append('title', formData.title)
    uploadData.append('category', formData.category)
    uploadData.append('description', formData.description)
    uploadData.append('image', formData.image)

    try {
      const response = await api.post('/media/portfolio/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Portfolio image uploaded successfully',
          icon: 'success',
          confirmButtonColor: BB,
          timer: 2000,
          showConfirmButton: false
        })

        setFormData({
          title: '',
          category: 'billboards',
          description: '',
          image: null
        })
        setShowUploadForm(false)
        fetchPortfolioItems()
      }
    } catch (error) {
      console.error('Upload error:', error)
      Swal.fire({
        title: 'Upload Failed',
        text: error.response?.data?.message || 'Failed to upload image',
        icon: 'error',
        confirmButtonColor: BB
      })
    } finally {
      setUploading(false)
    }
  }

  const toggleStatus = async (id) => {
    try {
      const response = await api.patch(`/media/portfolio/${id}/toggle`)
      
      if (response.data.success) {
        Swal.fire({
          title: 'Status Updated!',
          text: 'Portfolio item status has been updated',
          icon: 'success',
          confirmButtonColor: BB,
          timer: 1500,
          showConfirmButton: false
        })
        fetchPortfolioItems()
      }
    } catch (error) {
      console.error('Toggle error:', error)
      Swal.fire({
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update status',
        icon: 'error',
        confirmButtonColor: BB
      });
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the portfolio item',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: BB,
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        const response = await api.delete(`/media/portfolio/${id}`)
        
        if (response.data.success) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Portfolio item has been deleted',
            icon: 'success',
            confirmButtonColor: BB,
            timer: 2000,
            showConfirmButton: false
          })
          fetchPortfolioItems()
        }
      } catch (error) {
        console.error('Delete error:', error)
        Swal.fire({
          title: 'Delete Failed',
          text: error.response?.data?.message || 'Failed to delete item',
          icon: 'error',
          confirmButtonColor: BB
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Mobile-First Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Portfolio Management</h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Upload and manage portfolio images</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 text-white font-medium rounded-lg transition-colors text-sm sm:text-base"
          style={{ backgroundColor: BB }}
          onMouseEnter={e => { e.target.style.backgroundColor = BG; e.target.style.color = BB }}
          onMouseLeave={e => { e.target.style.backgroundColor = BB; e.target.style.color = '#fff' }}
        >
          {showUploadForm ? '✕ Cancel' : '+ Add New Image'}
        </button>
      </div>

      {/* Upload Form */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload New Portfolio Image</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mobile-optimized form layout */}
              <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 bg-white placeholder-gray-500 text-base"
                    placeholder="Enter image title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 bg-white text-base"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-gray-900 bg-white placeholder-gray-500 text-base"
                  placeholder="Enter image description (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image File *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 bg-white text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Max file size: 5MB. Supported formats: JPG, PNG, GIF</p>
              </div>

              {/* Mobile-optimized buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="w-full sm:w-auto px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full sm:w-auto px-6 py-3 text-white rounded-lg transition-colors disabled:opacity-50 text-base font-medium"
                  style={{ backgroundColor: BB }}
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </span>
                  ) : (
                    'Upload Image'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile-optimized Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Mobile-optimized action buttons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors text-sm ${
                    item.is_active 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                  title={item.is_active ? 'Active - Click to hide' : 'Hidden - Click to show'}
                >
                  {item.is_active ? '👁️' : '🙈'}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-10 h-10 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-lg sm:text-base"
                >
                  ×
                </button>
              </div>
              {!item.is_active && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Hidden</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 text-base">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-2 capitalize">{item.category.replace('-', ' ')}</p>
              {item.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              )}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                <span>ID: {item.id}</span>
                <span>{new Date(item.uploaded_at).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile-optimized empty state */}
      {portfolioItems.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="text-6xl sm:text-4xl mb-4 text-gray-300">🖼️</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Portfolio Items</h3>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">Start by uploading your first portfolio image</p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="w-full sm:w-auto px-6 py-3 text-white rounded-lg font-medium"
            style={{ backgroundColor: BB }}
          >
            Upload First Image
          </button>
        </div>
      )}
    </div>
  )
}

export default PortfolioManager