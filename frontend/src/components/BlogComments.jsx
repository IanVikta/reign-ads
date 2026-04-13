import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BB = '#0220aa'

const BlogComments = ({ postId }) => {
  // Use static sample comments when loading from frontend
  const sampleComments = [
    {
      id: 1,
      author_name: 'John Doe',
      content: 'Great article! Very informative and well-written.',
      created_at: '2026-03-01T10:30:00Z',
      is_anonymous: false
    },
    {
      id: 2,
      author_name: 'Anonymous',
      content: 'Thanks for sharing this insight. Really helpful for our business.',
      created_at: '2026-03-02T14:15:00Z',
      is_anonymous: true
    }
  ]

  const [comments, setComments] = useState(sampleComments)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [commentsPerPage] = useState(5)
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: '',
    is_anonymous: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate comment submission
    setTimeout(() => {
      const newComment = {
        id: comments.length + 1,
        author_name: formData.is_anonymous ? 'Anonymous' : formData.author_name,
        content: formData.content,
        created_at: new Date().toISOString(),
        is_anonymous: formData.is_anonymous
      }
      
      setComments([newComment, ...comments])
      setFormData({
        author_name: '',
        author_email: '',
        content: '',
        is_anonymous: false
      })
      setShowForm(false)
      setSubmitting(false)
    }, 1000)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Pagination logic
  const indexOfLastComment = currentPage * commentsPerPage
  const indexOfFirstComment = indexOfLastComment - commentsPerPage
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment)
  const totalPages = Math.ceil(comments.length / commentsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Comments Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-900">
          Comments ({comments.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Comment'}
        </button>
      </div>

      {/* Comment Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anonymous Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="is_anonymous"
                  checked={formData.is_anonymous}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700">
                  Comment anonymously
                </label>
              </div>

              {/* Name and Email - only show if not anonymous */}
              {!formData.is_anonymous && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm text-gray-900 bg-white placeholder-gray-500"
                    placeholder="Your name (optional)"
                  />
                  <input
                    type="email"
                    name="author_email"
                    value={formData.author_email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm text-gray-900 bg-white placeholder-gray-500"
                    placeholder="your@email.com (optional)"
                  />
                </div>
              )}

              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={4}
                maxLength={1000}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm resize-none text-gray-900 bg-white placeholder-gray-500"
                placeholder="Share your thoughts..."
              />
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {formData.content.length}/1000 characters
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4 text-gray-300">💬</div>
            <h4 className="text-lg font-medium text-gray-700 mb-2">No Comments Yet</h4>
            <p className="text-gray-500 text-sm mb-6">Be the first to share your thoughts on this article.</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
            >
              Add First Comment
            </button>
          </div>
        ) : (
          <>
            {currentComments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-gray-200 rounded-lg bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {comment.is_anonymous ? (
                      <span className="text-gray-500 text-lg">👤</span>
                    ) : (
                      <span className="text-blue-600 text-sm font-bold">
                        {(comment.author_name || 'A').charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-medium text-gray-900">
                        {comment.is_anonymous ? 'Anonymous' : (comment.author_name || 'Anonymous')}
                      </h5>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 text-sm border rounded transition-colors ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default BlogComments