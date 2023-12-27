import React, { FC, useState } from 'react'
import HIW1img from '@/images/HIW2-3.png'
import HIW2img from '@/images/HIW2-2.png'
import HIW3img from '@/images/HIW2-1.png'
import VectorImg from '@/images/VectorHIW.svg'
import Image, { StaticImageData } from 'next/image'
import Heading from '@/shared/Heading'
import { Calendar, Divider, Select, Row, Button, Tooltip } from 'antd'
import type { CalendarProps } from 'antd'
import { useSpacesQuery } from '@/data/spaces'
import { ClockCircleOutlined } from '@ant-design/icons'
import RentModal from './spaces/ModalRentSpace';

import type { Dayjs } from 'dayjs'
export interface SectionHowItWorkProps {
    className?: string
    data?: {
        id: number
        title: string
        desc: string
        img: StaticImageData
        imgDark?: StaticImageData
    }[]
    
}
const { Option } = Select
const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode)
}

const DEMO_DATA: SectionHowItWorkProps['data'] = [
    {
        id: 1,
        img: HIW1img,
        title: 'Contactanos',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.',
    },
    {
        id: 2,
        img: HIW2img,
        title: 'Conoce el espacio',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.',
    },
    {
        id: 3,
        img: HIW3img,
        title: 'Reserva',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.',
    },
]

const showSpaces = () => {
    console.log('hola')
}

const SectionHowItWork: FC<SectionHowItWorkProps> = ({ className = '', data = DEMO_DATA }) => {
    const { spaces, loading: loadingSpaces } = useSpacesQuery({
        limit: 10,
        page: 1,
        search: '',
    })

    const [showModalRentSpace, setShowModalRentSpace] = useState(false);
    const [boolButton, setBoolButton] = useState(true);
    const [spaceSelected, setSpaceSelected] = useState();

    const onShowRent = () => {
        setShowModalRentSpace(!showModalRentSpace);
    };

    const viewAvailable = (value:any, record:any)=>{
        console.log(value);
        if (value) {setBoolButton(false); setSpaceSelected(record); } else setBoolButton(true);
        
    }


    return (
        <div className={`nc-SectionHowItWork  ${className}`} data-nc-id="SectionHowItWork">
            <Heading isCenter desc="¿Cómo funciona?" className="text-neutral-900 dark:text-neutral-100">
                Renta Espacios Hormiga
            </Heading>
            <div className="mt-20 relative grid md:grid-cols-3 gap-20">
                <Image className="hidden md:block absolute inset-x-0 top-10" src={VectorImg} alt="" />
                {data.map((item) => (
                    <div key={item.id} className="relative flex flex-col items-center max-w-xs mx-auto">
                        {item.imgDark ? (
                            <>
                                <Image className="dark:hidden block mb-8 max-w-[180px] mx-auto" src={item.img} alt="" />
                                <Image alt="" className="hidden dark:block mb-8 max-w-[180px] mx-auto" src={item.imgDark} />
                            </>
                        ) : (
                            <Image alt="" className="mb-8 max-w-[180px] mx-auto" src={item.img} />
                        )}
                        <button onClick={showSpaces}>
                            <div className="text-center mt-auto">
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <span className="block mt-5 text-neutral-500 dark:text-neutral-400">{item.desc}</span>
                            </div>
                        </button>
                    </div>
                ))}
            </div>

            <Divider />
            <div className="flex-col flex" style={{paddingBottom:'1em'}}>
                <span style={{textAlign:'center', fontWeight:'bold'}} className="my-4 text-2xl lg:text-3xl">Disponibilidad de Salones</span>
                
                <Row justify='space-between'>
                    <Select placeholder="Selecciona un espacio" className="w-full md:w-32 lg:w-40 xl:w-1/2" onChange={viewAvailable}>
                        {spaces?.map((option) => (
                            
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                    
                    <Tooltip color='#56aec4' placement="left" title={!boolButton ? '' : 'Por favor selecciona un espacio'}>
                        <Button disabled={boolButton} className="btnPrimaryLeft" onClick={onShowRent}> Reservar espacio </Button>
                    </Tooltip>
                </Row>
            </div>

            <Calendar style={{borderRadius:'.5em'}} onPanelChange={onPanelChange}></Calendar>

            <RentModal showRent={onShowRent} showModalRentSpace={showModalRentSpace} spaceSelected={spaceSelected}/>
        </div>
    )
}

export default SectionHowItWork
