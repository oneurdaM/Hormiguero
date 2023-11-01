'use client'

import React from 'react'
import BlogList from '@/components/blog/BlogList'
import { Row, Col } from 'antd'
import SiteHeader from '@/(client-components)/(Header)/SiteHeader'
import FooterNav from '@/components/FooterNav'
import Footer from '@/components/Footer'
const Blog: React.FC = () => {
    return (
        <Row id="blog" justify="space-around">
            <Col span={24}>
                <SiteHeader />
                <br />
                <BlogList />
                <FooterNav />
                <Footer />
            </Col>
        </Row>
    )
}

export default Blog
