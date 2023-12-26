import React, { useState } from 'react'
import Image from 'next/image'
import { Modal, Row, Col, DatePicker } from 'antd'
import { ClockCircleOutlined, TagsOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import type { RangePickerProps } from 'antd/es/date-picker';

import moment from 'moment'
import 'moment/locale/es'
import Loader from '../ui/loader/loader'
import { createStyles, useTheme } from 'antd-style';


function ModalRentSpaces(props:any) {    
    const [current, setCurrent] = useState(0);
    const [fetchingEventsSpaces, setFetchingEventsSpaces] = useState(false);


    const useStyle = createStyles(({ token }) => ({
        'my-modal-body': {
        background: token.cyan1,
        padding: token.paddingSM,
        },
        'my-modal-mask': {
        boxShadow: `inset 0 0 15px #fff`,
        },
        'my-modal-header': {
        borderBottom: `1px dotted ${token.colorPrimary}`,
        },
        'my-modal-footer': {
        color: token.colorPrimary,
        },
        'my-modal-content': {
        border: '1px solid #333',
        },
    }));

    const { styles } = useStyle();
    const token = useTheme();

    const classNames = {
        body: styles['my-modal-body'],
        mask: styles['my-modal-mask'],
        header: styles['my-modal-header'],
        footer: styles['my-modal-footer'],
        content: styles['my-modal-content'],
    };

    const modalStyles = {
        header: {
            borderLeft: `5px solid #56aec4`,
            borderRadius: 0,
            paddingInlineStart: 5,
        },
        body: {
            // boxShadow: 'inset 0 0 5px #999',
            borderRadius: 5,
        },
        mask: {
            backdropFilter: 'blur(10px)',
        },
        footer: {
            borderTop: '0px solid #333',
        },
        content: {
            boxShadow: '0 0 30px #999',
        },
    };
    

    const steps = [
        {
            title: 'Elige tus asientos',
        },
        {
            title: 'Pagar',
        },
    ]
    const next = () => {
        setCurrent(current + 1)
    }

    const range = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < moment();
    };


    return (
        <>
            <Modal 
                width={'60%'}
                title={<p className="text-xl text-primary-6000 dark:text-white">{'Renta de Espacio'}</p>} 
                onCancel={() => props.showRent()} 
                open={props.showModalRentSpace} 
                footer={false}
                className={classNames} 
                styles={modalStyles} 
                classNames={{ body: 'dark:backgroundDrawerNigth backgroundDrawer', header: 'dark:backgroundDrawerNigthHeader' }}
            >
                <DatePicker
                    format="DD-MM-YYYY HH:mm"
                    disabledDate={disabledDate}
                    // disabledTime={disabledDateTime}
                    showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
                />

            </Modal>
        </>
    )
}

export default ModalRentSpaces
