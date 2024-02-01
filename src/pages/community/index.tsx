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
                <section id="about-us" className="flex flex-col lg:flex-row items-center">
                    <div className="mb-16 lg:mb-0 lg:mr-10 ">
                        <div className="rounded-lg lg:text-6xl text-4xl text-center dark:text-white  text-[#5bf1fa] font-bold">
                            Mundo Hormiga
                            <div className=" mx-auto text-center mt-3 border-b-[.2em] border-[#5bf1fa] w-40 dark:border-white"></div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10 mt-5">
                            <Card className="bg-[#75aebb] dark:bg-gray-500">
                                <div className="p-5">
                                    <span className="font-semibold  text-xl mt-6 sm:mt-11 text-[#2f2d2b] dark:text-[#302e2e]">¿Quiénes somos?</span>
                                    <p className="block break-words mt-3 text-orange-50 dark:text-neutral-200 text-justify">{settings?.whoWeAre ?? 'En lo profundo de la noche, cuando las estrellas titilan en el firmamento, la ciudad se sumerge en un silencio mágico. Las calles, antes bulliciosas y llenas de vida, se convierten en un escenario tranquilo donde las sombras danzan en las paredes. Es en este momento, cuando el reloj avanza con paso lento, que la ciudad revela sus secretos más íntimos. Los faroles de la calle proyectan una luz tenue, iluminando el pavimento gastado y las fachadas de los edificios antiguos. En las esquinas, las sombras se entrelazan, creando figuras caprichosas que parecen contar historias olvidadas. Las hojas de los árboles susurran sus secretos al viento, como testigos silenciosos de los eventos que han ocurrido a lo largo del tiempo.'}</p>
                                </div>
                            </Card>

                            <Card className="bg-orange-50 dark:bg-[#b9b9b9]">
                                <div className="p-5">
                                    <span className="font-semibold text-xl mt-6 sm:mt-11 text-[#2f2d2b]">¿Qué es hormiguero?</span>
                                    <span className="block break-words mt-3 text-neutral-500 dark:text-neutral-600 text-justify">{settings?.whatWeAre ?? 'En lo profundo de la noche, cuando las estrellas titilan en el firmamento, la ciudad se sumerge en un silencio mágico. Las calles, antes bulliciosas y llenas de vida, se convierten en un escenario tranquilo donde las sombras danzan en las paredes. Es en este momento, cuando el reloj avanza con paso lento, que la ciudad revela sus secretos más íntimos. Los faroles de la calle proyectan una luz tenue, iluminando el pavimento gastado y las fachadas de los edificios antiguos. En las esquinas, las sombras se entrelazan, creando figuras caprichosas que parecen contar historias olvidadas. Las hojas de los árboles susurran sus secretos al viento, como testigos silenciosos de los eventos que han ocurrido a lo largo del tiempo.'}</span>
                                </div>
                            </Card>
                            <Card className="bg-orange-50 dark:bg-[#b9b9b9]">
                                <div className="p-5">
                                    <div>
                                        <span className="font-semibold  text-xl mt-6 sm:mt-11 text-[#2f2d2b]">¿Por qué la comunidad?</span>
                                        <span className="block break-words mt-6 text-neutral-500 dark:text-neutral-600 text-justify">{settings?.whyCommunity ?? 'En lo profundo de la noche, cuando las estrellas titilan en el firmamento, la ciudad se sumerge en un silencio mágico. Las calles, antes bulliciosas y llenas de vida, se convierten en un escenario tranquilo donde las sombras danzan en las paredes. Es en este momento, cuando el reloj avanza con paso lento, que la ciudad revela sus secretos más íntimos. Los faroles de la calle proyectan una luz tenue, iluminando el pavimento gastado y las fachadas de los edificios antiguos. En las esquinas, las sombras se entrelazan, creando figuras caprichosas que parecen contar historias olvidadas. Las hojas de los árboles susurran sus secretos al viento, como testigos silenciosos de los eventos que han ocurrido a lo largo del tiempo.'}</span>
                                    </div>
                                </div>
                            </Card>

                            <div>
                                <Card className="my-4 p-5 bg-[#75aebb]  dark:bg-gray-500">
                                    <p className="text-orange-50 dark:text-neutral-200">
                                        <span className='text-white'>
                                            Contando historias desde
                                            <b> {moment(settings.createdAt).format('MMMM YYYY')}</b>.
                                        </span>
                                    </p>
                                </Card>
                                <Card className="my-4 p-5 bg-[#75aebb]  dark:bg-gray-500">
                                    <p className="text-orange-50 dark:text-neutral-200">
                                        Más de <b>{settings.artists}</b> artistas han tenido espacio de presentación.
                                    </p>
                                </Card>
                                <Card className="my-4 p-5 bg-[#75aebb]  dark:bg-gray-500">
                                    <p className="text-orange-50 dark:text-neutral-200">
                                        <b>{settings.people}</b> personas han vivido una experiencia cultural en nuestro espacio.
                                    </p>
                                </Card>
                                <Card className="my-4 p-5 bg-[#75aebb]  dark:bg-gray-500">
                                    <p className="text-orange-50 dark:text-neutral-200">
                                        <b>{settings.communities}</b> comunidades vulnerables atendidas y contando.
                                    </p>
                                </Card>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex-grow">
                        <Image alt="img" src={rightImg} />
                    </div> */}
                </section>
                {/* <section id="social-impact" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch text-neutral-500 mt-5">
                    <Card className="my-4 p-5">
                        <p>
                            Contando historias desde
                            <b> {moment(settings.createdAt).format('MMMM YYYY')}</b>.
                        </p>
                    </Card>
                    <Card className="my-4 p-5">
                        <p>
                            Más de <b>{settings.artists}</b> artistas han tenido espacio de presentación.
                        </p>
                    </Card>
                    <Card className="my-4 p-5">
                        <p>
                            <b>{settings.people}</b> personas han vivido una experiencia cultural en nuestro espacio.
                        </p>
                    </Card>
                    <Card className="my-4 p-5">
                        <p>
                            <b>{settings.communities}</b> comunidades vulnerables atendidas y contando.
                        </p>
                    </Card>
                </section> */}
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>Comunidad Hormiga | CCH</title>
                <meta name="description" content={'Centro Cultural El Hormiguero'} />
                <meta property="og:image" content={logo.toString()} />

                <meta name="twitter:title" content="Centro Cultural El Hormiguero" />
                <meta name="twitter:description" content={'Centro Cultural El Hormgiuero'} />
                <meta name="twitter:image" content={logo.toString()} />
                <meta name="twitter:card" content={logo.toString()} />
            </Head>
            <div className="bg-[#014154]  dark:bg-black dark:bg-opacity-20 h-auto min-h-screen">
                <Section />
            </div>
        </>
    )
}

export default Community
