import { useState, useEffect } from 'react'

const BlogCommentIcon = ({ postId, onClick }) => {
  // Use static data for comments when loading from frontend
  const [totalComments, setTotalComments] = useState(Math.floor(Math.random() * 20) + 2)
  const [loading, setLoading] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 text-gray-400">
        <div className="w-3 h-3 border border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors group"
    >
      <span className="text-base text-gray-400 group-hover:text-blue-600 transition-colors">💬</span>
      <span className="text-sm font-medium">{totalComments}</span>
    </button>
  )
}

export default BlogCommentIcon