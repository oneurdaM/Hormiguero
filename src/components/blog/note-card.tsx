import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import 'moment/locale/es'
import moment from 'moment'

import Card from '../common/card'

function NoteCard({
  title,
  href,
  image,
  content,
  createdAt,
  author,
  category,
}: {
  title: string
  href: string
  image: string
  content: string
  createdAt: string | Date
  author: string | number
  category: string | number
}) {
  return (
    <Card className="my-4 hover:shadow-xl hover:shadow-border-400 bg-[#04242b]" >
      <Link href={href}>
      <div className="relative overflow-hidden group">

        <Image
          src={image}
          alt={title}
          className="rounded-tl rounded-tr aspect-[500/400] object-cover transition-transform transform-gpu group-hover:scale-75"
          width={500}
          height={300}
        />
        </div>
        {/* <div className="p-5">
          <div>
            <small className="text-dark">{category}</small>
          </div>
          <h5 className="text-dark line-clamp-1">{title}</h5>
          <p className="text-body line-clamp-2">{content}</p>
          <div className="card-footer">
            <small className="text-muted">
              Publicado {moment(createdAt).startOf('minute').fromNow()} | Por{' '}
              {author}
            </small>
          </div>
        </div> */}
      </Link>
    </Card>
  )
}

export default NoteCard
