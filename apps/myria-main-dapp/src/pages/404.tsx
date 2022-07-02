import { useRouter } from 'next/router'
import React from 'react'

function NotFoundPage() {
  const router = useRouter();
  return (
    <div className='bg-dark flex flex-col h-screen justify-center items-center text-white'>
      <span className='text-[62px]'>404</span>
      <span className='text-[14px] mb-10'>The page you are looking for was not found</span>
      <button className='btn-md btn-primary' onClick={() => router.replace('/')}>Back to Home</button>
    </div>
  )
}

export default NotFoundPage
