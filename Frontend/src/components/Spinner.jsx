import React from 'react'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="border-4 border-t-4 border-gray-500 border-t-white  h-6 w-6 rounded-full animate-spin"></div>
    </div>
  )
}

export default Spinner