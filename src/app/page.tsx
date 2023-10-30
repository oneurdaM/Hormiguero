'use client'

import BgGlassmorphism from '@/components/ui/bg-glassmorphism'
import SectionSliderNewCategories from '@/components/SectionSliderCategories'
import { TaxonomyType } from '@/data/types'
import SectionHowItWork from '@/components/SectionHowItWork'
import Billboard from '@/components/billboard'
import BackgroundSection from '@/components/BackgroundSection'
import SectionGridAuthorBox from '@/components/SectionGridAuthorBox'
import SectionBecomeAnAuthor from '@/components/SectionBecomeAnAuthor'
import SectionClientSay from '@/components/SectionClientSay'
import SectionVideos from '@/components/SectionVideos'
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces'
import { useEventsQuery } from '@/data/events'

const DEMO_CATS: TaxonomyType[] = [
    {
        id: '1',
        href: '/',
        name: 'Convocatorias',
        taxonomy: 'category',
        count: 188288,
        thumbnail:
            'https://images.pexels.com/photos/64271/queen-of-liberty-statue-of-liberty-new-york-liberty-statue-64271.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    },
    {
        id: '2',
        href: '/',
        name: 'Talleres',
        taxonomy: 'category',
        count: 188288,
        thumbnail:
            'https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id: '3',
        href: '/',
        name: 'Eventos culturales',
        taxonomy: 'category',
        count: 188288,
        thumbnail:
            'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id: '4',
        href: '/',
        name: 'Servicio Social',
        taxonomy: 'category',
        count: 188288,
        thumbnail:
            'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    },
    {
        id: '5',
        href: '/',
        name: 'Eventos',
        taxonomy: 'category',
        count: 188288,
        thumbnail:
            'https://images.pexels.com/photos/4151484/pexels-photo-4151484.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    },
]

function PageHome() {
    const { data } = useEventsQuery({
        id: 1,
    })

    return (
        <main className="nc-PageHome relative overflow-hidden">
            {/* GLASSMOPHIN */}
            <BgGlassmorphism />

            {/* SECTION HERO */}
            <Billboard />
            <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28 mt-20">
                {/* SECTION 1 */}
                <SectionGridFeaturePlaces eventsListings={data} />

                <SectionSliderNewCategories categories={DEMO_CATS} />

                <SectionSliderNewCategories
                    heading="Recientes"
                    subHeading="Estos son los eventos que tenemos para ti"
                    categoryCardType="card5"
                    itemPerRow={5}
                />

                <SectionHowItWork />

                {/* <SectionSubscribe2 /> */}

                <div className="relative py-16">
                    <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
                    <SectionGridAuthorBox />
                </div>

                {/* <SectionGridCategoryBox /> */}

                <div className="relative py-16">
                    <BackgroundSection />
                    <SectionBecomeAnAuthor />
                </div>

                <SectionVideos />

                <div className="relative py-16">
                    <BackgroundSection />
                    <SectionClientSay />
                </div>
            </div>
        </main>
    )
}

export default PageHome
