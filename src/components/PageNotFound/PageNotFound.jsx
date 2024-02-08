import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='w-svw h-svh flex flex-col justify-center items-center'>

        <div className='text-9xl font-bold font-mono'>4<span className='text-blue-900'>0</span>4</div>
        <div className='text-sm font-thin'>Oops! Page Not Found</div>
        <Link to="/" className='bg-blue-900 text-white rounded px-3 py-1 mt-4' >Return to Home</Link>

    
    </div>
  )
}

export default PageNotFound