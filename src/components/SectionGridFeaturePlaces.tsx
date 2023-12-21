import React, { FC, ReactNode } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import HeaderFilter from './HeaderFilter'
import EventCard from './EventCard'
import { EventInterface } from '@/interfaces'

export interface SectionGridFeaturePlacesProps {
    eventsListings?: EventInterface[]
    gridClass?: string
    heading?: ReactNode
    subHeading?: ReactNode
    headingIsCenter?: boolean
    tabs?: string[]
    cardType?: 'card1' | 'card2'
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
    eventsListings,
    gridClass = '',
    heading = 'Nuestra cartelera',
    subHeading = 'Estos son los eventos que tenemos para ti',
    tabs = ['Convocatorias', 'Talleres', 'Eventos', 'Social'],
}) => {
    return (
        <div className="nc-SectionGridFeaturePlaces relative">
            <HeaderFilter
                tabActive={'Convocatorias'}
                subHeading={subHeading}
                tabs={tabs}
                heading={heading}
            />
            <div
                className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
            >
                {eventsListings?.map((event) => (
                    <EventCard key={event.id} data={event} />
                ))}
            </div>
            <div className="flex mt-16 justify-center items-center">
                <ButtonPrimary loading>Ver más</ButtonPrimary>
            </div>
        </div>
    )
}

export default SectionGridFeaturePlaces
