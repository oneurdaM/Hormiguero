'use client'

import Logo from '@/shared/Logo'
import SocialsList1 from '@/shared/SocialsList1'
import React, { useEffect, useState } from 'react'
import { CustomLink } from '@/data/types'
import { getBlogs } from '../../data/services/blogServices'

interface DataVisit {
    data: object
    response: object
}

const BlogList: React.FC = () => {
    const [visit, setVisit] = useState<DataVisit>()
    const fetchData = async () => {
        try {
            const response: any = await getBlogs()
            console.log('response', response)
            setVisit(response)
        } catch (error) {
            console.error('Error al cargar los datos', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log('visit', visit)

    return (
        <>
            <div id="visits" className="flex justify-end">
                <p style={{ paddingRight: '1em', color: 'grey' }}>Holiii x2</p>
            </div>
        </>
    )
}

export default BlogList
