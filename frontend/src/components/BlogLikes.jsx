import { useState } from 'react'

const BB = '#0220aa'

const BlogLikes = ({ postId }) => {
  // Use static data for likes when loading from frontend
  const [liked, setLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(Math.floor(Math.random() * 50) + 5)
  const [loading, setLoading] = useState(false)

  const handleLikeToggle = () => {
    setLoading(true)
    setTimeout(() => {
      setLiked(!liked)
      setTotalLikes(prev => liked ? prev - 1 : prev + 1)
      setLoading(false)
    }, 300)
  }

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 text-gray-400">
        <div className="w-3 h-3 border border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <button
      onClick={handleLikeToggle}
      className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors group"
    >
      <span className={`text-base transition-transform group-hover:scale-110 ${liked ? 'text-red-500' : 'text-gray-400'}`}>
        ❤️
      </span>
      <span className="text-sm font-medium">{totalLikes}</span>
    </button>
  )
}

export default BlogLikes