'use client'

import React, { useEffect, useState } from 'react'
import BlogList from '@/components/blog/BlogList'

const Footer: React.FC = () => {
    return (
        <div id="blog" className="flex justify-end">
            <BlogList />
        </div>
    )
}

export default Footer
