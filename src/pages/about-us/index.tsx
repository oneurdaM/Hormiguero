import React from 'react'

import Layout from '@/components/layout/layout'
import BackgroundSection from '@/components/BackgroundSection'
import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor'

function AboutUs() {
  return (
    <Layout>
      <div className="h-auto min-h-screen container py-5">
        <h1 className="text-3xl font-bold">About Us</h1>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Our Story</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Sed ut perspiciatis unde omnis iste natus
            error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
            voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi
            nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit, sed quia non numquam eius modi
            tempora incidunt ut labore et dolore magnam aliquam quaerat
            voluptatem.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Who Are We?</h2>
          <p>
            We are a team of passionate people who are dedicated to building
            innovative and user-friendly products. We believe that technology
            can be a force for good in the world, and we are committed to using
            our skills to make a positive impact.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Anniversary</h2>
          <p>
            Our company was founded on [date]. We have come a long way since
            then, and we are grateful for the support of our customers,
            partners, and team members.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Communities</h2>
          <p>
            We are proud to be a part of the Next.js, TypeScript, and Tailwind
            CSS communities. We are grateful for the contributions of the
            developers who maintain these projects, and we are committed to
            giving back to the community.
          </p>
        </section>
      </div>
    </Layout>
  )
}

export default AboutUs
