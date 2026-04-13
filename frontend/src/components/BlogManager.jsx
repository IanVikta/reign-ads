import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api'
import Swal from 'sweetalert2'

const BB = '#0220aa'
const BG = '#ffd22a'

const BlogManager = () => {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: null
  })

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const response = await api.get('/media/blog')
      if (response.data.success) {
        setBlogPosts(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      Swal.fire({
        title: 'Error',
        text: 'Failed to load blog posts',
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

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData(prev => ({
        ...prev,
        slug: slug
      }))
    }
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
    uploadData.append('slug', formData.slug)
    uploadData.append('excerpt', formData.excerpt)
    uploadData.append('content', formData.content)
    uploadData.append('image', formData.image)

    try {
      const response = await api.post('/media/blog/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Blog post uploaded successfully',
          icon: 'success',
          confirmButtonColor: BB,
          timer: 2000,
          showConfirmButton: false
        })

        setFormData({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          image: null
        })
        setShowUploadForm(false)
        fetchBlogPosts()
      }
    } catch (error) {
      console.error('Upload error:', error)
      Swal.fire({
        title: 'Upload Failed',
        text: error.response?.data?.message || 'Failed to upload blog post',
        icon: 'error',
        confirmButtonColor: BB
      })
    } finally {
      setUploading(false)
    }
  }

  const toggleBlogStatus = async (id) => {
    try {
      const response = await api.patch(`/media/blog/${id}/toggle`)
      
      if (response.data.success) {
        Swal.fire({
          title: 'Status Updated!',
          text: 'Blog post status has been updated',
          icon: 'success',
          confirmButtonColor: BB,
          timer: 1500,
          showConfirmButton: false
        })
        fetchBlogPosts()
      }
    } catch (error) {
      console.error('Toggle error:', error)
      Swal.fire({
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update status',
        icon: 'error',
        confirmButtonColor: BB
      })
    }
  }

  const handleDeleteBlog = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the blog post',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: BB,
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        const response = await api.delete(`/media/blog/${id}`)
        
        if (response.data.success) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Blog post has been deleted',
            icon: 'success',
            confirmButtonColor: BB,
            timer: 2000,
            showConfirmButton: false
          })
          fetchBlogPosts()
        }
      } catch (error) {
        console.error('Delete error:', error)
        Swal.fire({
          title: 'Delete Failed',
          text: error.response?.data?.message || 'Failed to delete post',
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Create and manage blog posts</p>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="w-full sm:w-auto px-4 sm:px-6 py-3 text-white font-medium rounded-lg transition-colors text-sm sm:text-base"
          style={{ backgroundColor: BB }}
          onMouseEnter={e => { e.target.style.backgroundColor = BG; e.target.style.color = BB }}
          onMouseLeave={e => { e.target.style.backgroundColor = BB; e.target.style.color = '#fff' }}
        >
          {showUploadForm ? '✕ Cancel' : '+ Create New Post'}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Blog Post</h3>
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
                    placeholder="Enter blog post title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 bg-white placeholder-gray-500 text-base"
                    placeholder="url-friendly-slug"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-gray-900 bg-white placeholder-gray-500 text-base"
                  placeholder="Brief description of the blog post (max 500 characters)"
                />
                <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/500 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-gray-900 bg-white placeholder-gray-500 text-base"
                  placeholder="Full blog post content (optional - can be added later)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image *
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
                      Creating...
                    </span>
                  ) : (
                    'Create Post'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile-optimized Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={post.imageSrc}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded">
                {post.date}
              </div>
              {/* Mobile-optimized action buttons */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => toggleBlogStatus(post.id)}
                  className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors text-sm ${
                    post.is_published 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                  title={post.is_published ? 'Published - Click to unpublish' : 'Draft - Click to publish'}
                >
                  {post.is_published ? '📝' : '📋'}
                </button>
                <button
                  onClick={() => handleDeleteBlog(post.id)}
                  className="w-10 h-10 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-lg sm:text-base"
                >
                  ×
                </button>
              </div>
              {!post.is_published && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Draft</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-base">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>{post.readTime}</span>
                <span className="truncate max-w-24">/{post.slug}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>ID: {post.id}</span>
                <span>{new Date(post.uploaded_at).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile-optimized empty state */}
      {blogPosts.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="text-6xl sm:text-4xl mb-4 text-gray-300">📝</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Blog Posts</h3>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">Start by creating your first blog post</p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="w-full sm:w-auto px-6 py-3 text-white rounded-lg font-medium"
            style={{ backgroundColor: BB }}
          >
            Create First Post
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogManager