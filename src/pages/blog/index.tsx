'use client'
import React, { useEffect, useState } from 'react'

import BlogList from '@/components/blog/BlogList'
import Layout from '@/components/layout/layout'

const Blog: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <></>
  return (
    <Layout>
      <BlogList />
    </Layout>
  )
}

export default Blog
