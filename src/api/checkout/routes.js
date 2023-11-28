import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'

const clientId = ''
const clientSecret = ''

const enviroment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
const client = new paypal.core.PayPalHttpClient(enviroment)

export function POST() {
    return NextResponse.json({ message: 'Procesando pago' })
}
