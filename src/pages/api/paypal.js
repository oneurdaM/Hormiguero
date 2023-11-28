import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'

const clientId = process.env.PAYPAL_CLIENT_ID
const clientSecret = process.env.PAYPAL_CLIENT_SECRET

const enviroment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
const client = new paypal.core.PayPalHttpClient(enviroment)

export default async function POST(req, res) {
    const request = new paypal.orders.OrdersCreateRequest()
    const body = JSON.parse(req.body)

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'MXN',
                    value: body.details.subtotal,
                    breakdown: {
                        item_total: {
                            currency_code: 'MXN',
                            value: body.details.subtotal,
                        },
                    },
                },
                items: [
                    {
                        name: 'Evento: ' + body.details.eventSpaces.event.title,
                        description: 'Espacio: ' + body.details.eventSpaces.space.name,
                        quantity: body.details.quantity,
                        unit_amount: {
                            currency_code: 'MXN',
                            value: body.details.eventSpaces.price,
                        },
                    },
                ],
            },
        ],
        payment_source: {
            paypal: {
                experience_context: {
                    payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
                    brand_name: 'SISSA DIGITAL',
                    landing_page: 'LOGIN',
                    shipping_preference: 'NO_SHIPPING',
                    user_action: 'PAY_NOW',
                },
            },
        },
    })

    const response = await client.execute(request)
    res.status(200).json({ id: response.result.id })
}
