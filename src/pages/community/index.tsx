import React from 'react'
import Layout from '@/components/layout/layout'
import Image from 'next/image'
import Head from 'next/head'

import 'moment/locale/es'
import moment from 'moment'

import logo from '@/assets/placeholders/logo.png'
import imageUrl from '@/images/logo.png'
import rightImg from '@/images/BecomeAnAuthorImg.png'
import Card from '@/components/common/card'
import ErrorMessage from '@/components/ui/error-message'
import Loader from '@/components/ui/loader/loader'
import { useSettingsQuery } from '@/data/settings'

function Community() {
  const { settings, loading, error } = useSettingsQuery()

  const Section = () => {
    if (loading) {
      return <Loader text="Cargando espacio de impacto social..." />
    }
    if (error) {
      return (
        <div className="nc-PageHome container pt-10  h-auto min-h-screen">
          <ErrorMessage message={error.message} />
        </div>
      )
    }
    return (
      <div className="container py-10">
        <section
          id="about-us"
          className="flex flex-col lg:flex-row items-center"
        >
          <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
            <div className="rounded-lg">
              <Image
                alt="hormiguero logo"
                src={settings.logo ?? imageUrl}
                width={200}
                height={200}
              />
            </div>

            <h2 className="font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11">
              ¿Quiénes somos?
            </h2>
            <p className="block break-words mt-6 text-neutral-500 dark:text-neutral-400">
              {settings?.whoWeAre ??
                'Descripción sobre quiénes somos en el Centro Cultural El Hormiguero como organización.'}
            </p>
          </div>
          <div className="flex-grow">
            <Image alt="img" src={rightImg} />
          </div>
        </section>

        <section
          id="what-why"
          className="flex flex-col lg:flex-row items-center"
        >
          <div className="flex-grow lg:pr-5">
            <h2 className="font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11">
              ¿Qué es hormiguero?
            </h2>
            <span className="block break-words mt-6 text-neutral-500 dark:text-neutral-400">
              {settings?.whatWeAre ?? 'Descripción sobre qué somos.'}
            </span>
          </div>
          <div className="flex-grow lg:pl-5">
            <h2 className="font-semibold text-3xl sm:text-4xl mt-6 sm:mt-11">
              ¿Por qué la comunidad?
            </h2>
            <span className="block break-words mt-6 text-neutral-500 dark:text-neutral-400">
              {settings?.whyCommunity ??
                'Descripción sobre porqué existimos como comunidad y organización.'}
            </span>
          </div>
        </section>
        <section
          id="social-impact"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch text-neutral-500 mt-5"
        >
          <Card className="my-4 p-5">
            <p>
              Contando historias desde
              <b> {moment(settings.createdAt).format('MMMM YYYY')}</b>.
            </p>
          </Card>
          <Card className="my-4 p-5">
            <p>
              Más de <b>{settings.artists}</b> artistas han tenido espacio de
              presentación.
            </p>
          </Card>
          <Card className="my-4 p-5">
            <p>
              <b>{settings.people}</b> personas han vivido una experiencia
              cultural en nuestro espacio.
            </p>
          </Card>
          <Card className="my-4 p-5">
            <p>
              <b>{settings.communities}</b> comunidades vulnerables atendidas y
              contando.
            </p>
          </Card>
        </section>
      </div>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Comunidad Hormiga | CCH</title>
        <meta name="description" content={'Centro Cultural El Hormiguero'} />
        <meta property="og:image" content={logo.toString()} />

        <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
        <meta
          name="twitter:description"
          content={'Centro Cultural El Hormgiuero'}
        />
        <meta name="twitter:image" content={logo.toString()} />
        <meta name="twitter:card" content={logo.toString()} />
      </Head>
      <div className="bg-orange-50 dark:bg-black dark:bg-opacity-20 h-auto min-h-screen">
        <Section />
      </div>
    </Layout>
  )
}

export default Community
