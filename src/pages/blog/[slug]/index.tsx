'use client'
import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import 'moment/locale/es'
import moment from 'moment'

import Layout from '@/components/layout/layout'
import { useNoteQuery } from '@/data/blog-notes'
import Loader from '@/components/ui/loader/loader'
import ErrorMessage from '@/components/ui/error-message'
import logo from '@/assets/placeholders/logo.png'
import { IosArrowLeft } from '@/components/icons/ios-arrow-left'

function Note() {
    const router = useRouter()
    const {
        query: { slug },
    } = router

    const { data: note, isLoading, error } = useNoteQuery({ slug: slug as string })

    const Note = () => {
        if (isLoading) {
            return <Loader text="Cargando nota/artículo..." />
        }
        if (error) {
            return <ErrorMessage message={error.message} />
        }

        const NoteContent = () => {
            return (
                <div className="lg:flex">
                    <div className="lg:w-1/2 lg:pl-8 mx-10">
                        <div className="lg:block">
                            <Link href={'/'}>
                                <small className="text-muted flex gap-2 items-center mb-2">
                                    <IosArrowLeft className="h-3" />
                                    Volver al blog
                                </small>
                            </Link>
                            <Image src={note?.image ?? logo} alt={note.title} className="rounded lg:object-contain mb-2 w-full" width={1024} height={1024} />
                            <div className="flex justify-between ">
                                <small className="text-gray-500 mx-3">{note?.category?.name ?? 'No Category'}</small>
                                <small className="text-muted">
                                    Publicado {moment(note.createdAt).startOf('minute').fromNow()} | Por {note.user.firstName} {note.user.lastName}
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="border lg:hidden my-10"></div>
                    <div className="lg:w-1/2">
                        <h1 className="text-3xl mt-2 font-bold">{note.title}</h1>
                        <p className="mt-2 text-gray-200 text-justify">{note.content}</p>
                    </div>
                </div>
            )
        }
        return (
            <>
                <Head>
                    <title>{note.title}</title>
                    <meta name="description" content={'Centro Cultural El Hormiguero'} />
                    <meta property="og:image" content={note?.image ?? logo} />

                    <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
                    <meta name="twitter:description" content={'Centro Cultural El Hormgiuero'} />
                    <meta name="twitter:image" content={note?.image ?? logo} />
                    <meta name="twitter:card" content={note?.image ?? logo} />
                </Head>
                <div className=" bg-[#014154] dark:bg-black dark:bg-opacity-20 lg:h-auto  lg:min-h-screen py-5 lg:flex lg:flex-col">
                    <div className="container">
                        <NoteContent />
                    </div>
                    {/* <div className="lg:fixed">
                        <Link href={'/'}>
                            <small className="text-muted flex gap-2 items-center mb-2">
                                <IosArrowLeft className="h-3" />
                                Volver al blog
                            </small>
                        </Link>
                        <Image
                            src={note?.image ?? logo}
                            alt={note.title}
                            className="rounded lg:object-contain mb-2 w-full "
                            width={1024}
                            height={1024}
                        />
                        <div className="flex justify-between">
                            <small className="text-gray-500">
                                {note?.category?.name ?? 'No Category'}
                            </small>
                            <small className="text-muted">
                                Publicado{' '}
                                {moment(note.createdAt)
                                    .startOf('minute')
                                    .fromNow()}{' '}
                                | Por {note.user.firstName} {note.user.lastName}
                            </small>
                        </div>
                    </div>

                    <div className="lg:flex lg:justify-end">
                        <div className="lg:w-1/2">
                            <h1 className=" text-3xl mt-2">{note.title}</h1>
                            <p className="mt-2 text-gray-500 text-justify">
                                {note.content}
                            </p>
                        </div>
                    </div> */}
                </div>
            </>
        )
    }

    return (
        <Layout>
            <Note />
        </Layout>
    )
}

export default Note
