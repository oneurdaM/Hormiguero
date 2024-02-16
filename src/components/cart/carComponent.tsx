// components/Carrito.tsx


//@ts-nocheck
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/context/CarContext'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Row, Col, Button, Tooltip, notification, Tag, Spin, Table, Input, InputNumber, Modal } from 'antd'

const CarComponent = () => {


  const [api, contextHolder] = notification.useNotification()

    const [cart, setCart] = useContext(CartContext)
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        // Obtener el carrito del localStorage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || []

        // Sumar las cantidades de todos los elementos en el carrito
        const totalQuantity = storedCart.reduce((accumulator, currentItem) => {
            return accumulator + (currentItem.quantity || 0)
        }, 0)

        // Actualizar el estado local con la cantidad total
        setQuantity(totalQuantity)
    }, [cart])

    const goToPay = ()=>{
      window.location.href = '/productsForMy';
    }

    return (

        <div className="flex justify-center hover:cursor-pointer hover:text-red-950" onClick={goToPay}>
            <div className="cart-badge bg-red-500 text-white  rounded-full px-2 py-0.5 absolute top-1 right-[5.2em] hover:bg-bluer-500" style={{fontSize: "15px"}}>{quantity}</div>

            <ShoppingCartOutlined className="text-4xl" />
        </div>
    )
}

export default CarComponent
