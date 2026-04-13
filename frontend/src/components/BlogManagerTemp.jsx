import React from 'react'

const BlogManagerTemp = () => {
  return (
    <div className="p-8 text-center">
      <div className="max-w-md mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="text-yellow-800 mb-4">
          <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Admin Features Temporarily Unavailable</h3>
        <p className="text-yellow-700 mb-4">
          Blog management features require backend connectivity. Currently using static frontend data.
        </p>
        <p className="text-sm text-yellow-600">
          To enable admin features, ensure the backend server is running and connected.
        </p>
      </div>
    </div>
  )
}

export default BlogManagerTemp