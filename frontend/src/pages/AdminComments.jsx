import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api'
import Swal from 'sweetalert2'

const BB = '#0220aa'
const BG = '#ffd22a'

const AdminComments = () => {
  const [pendingComments, setPendingComments] = useState([])
  const [allComments, setAllComments] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [activeTab])

  const fetchComments = async () => {
    setLoading(true)
    try {
      const endpoint = activeTab === 'pending' ? '/admin/comments/pending' : '/admin/comments/all'
      const response = await api.get(endpoint)
      
      if (activeTab === 'pending') {
        setPendingComments(response.data.comments || [])
      } else {
        setAllComments(response.data.comments || [])
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch comments. Please check if you are logged in.',
        icon: 'error',
        confirmButtonColor: BB
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (commentId) => {
    try {
      await api.post(`/admin/comments/${commentId}/approve`)
      
      Swal.fire({
        title: 'Approved!',
        text: 'Comment has been approved successfully.',
        icon: 'success',
        confirmButtonColor: BB,
        timer: 2000,
        showConfirmButton: false
      })
      
      fetchComments()
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to approve comment.',
        icon: 'error',
        confirmButtonColor: BB
      })
    }
  }

  const handleReject = async (commentId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This comment will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: BB,
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/admin/comments/${commentId}/reject`)
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Comment has been deleted.',
          icon: 'success',
          confirmButtonColor: BB,
          timer: 2000,
          showConfirmButton: false
        })
        
        fetchComments()
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete comment.',
          icon: 'error',
          confirmButtonColor: BB
        })
      }
    }
  }

  const comments = activeTab === 'pending' ? pendingComments : allComments

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="relative bg-white overflow-hidden" style={{ paddingTop: 'clamp(100px, 14vh, 150px)', paddingBottom: '2rem' }}>
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: BG }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: BB }}>Admin Panel</p>
              <span className="h-px w-8 inline-block" style={{ background: BG }} />
            </div>
            <h1 className="font-black text-gray-900 leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Comment <span style={{ color: BB }}>Management</span>
            </h1>
            <p className="text-gray-500 text-base max-w-xl leading-relaxed">
              Manage blog comments, approve pending submissions, and moderate user interactions.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: BB }} />
      </section>

      {/* Tabs */}
      <section className="py-6 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                activeTab === 'pending'
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 text-gray-600 hover:border-blue-400'
              }`}
            >
              Pending ({pendingComments.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-wider border-2 transition-all ${
                activeTab === 'all'
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 text-gray-600 hover:border-blue-400'
              }`}
            >
              All Comments
            </button>
          </div>
        </div>
      </section>

      {/* Comments List */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4" style={{ color: 'rgba(2,32,170,0.1)' }}>💬</div>
              <h3 className="text-lg font-black text-gray-700 mb-2">
                No {activeTab === 'pending' ? 'Pending' : ''} Comments
              </h3>
              <p className="text-gray-400 text-sm">
                {activeTab === 'pending' 
                  ? 'All comments have been reviewed.' 
                  : 'No comments have been submitted yet.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 border-2 bg-white ${
                    comment.is_approved 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-yellow-200 bg-yellow-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-black text-gray-900">
                          {comment.is_anonymous ? 'Anonymous' : (comment.author_name || 'Anonymous')}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider ${
                          comment.is_approved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {comment.is_approved ? 'Approved' : 'Pending'}
                        </span>
                        {comment.is_anonymous && (
                          <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                            Anonymous
                          </span>
                        )}
                      </div>
                      {!comment.is_anonymous && comment.author_email && (
                        <p className="text-sm text-gray-600 mb-1">{comment.author_email}</p>
                      )}
                      <p className="text-xs text-gray-400">
                        Blog: {comment.blog_post_id} • {new Date(comment.created_at).toLocaleString()}
                        {comment.is_anonymous && ' • Anonymous Comment'}
                      </p>
                    </div>
                    
                    {!comment.is_approved && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(comment.id)}
                          className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(comment.id)}
                          className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white p-4 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default AdminComments