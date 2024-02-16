import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const enviroment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(enviroment);

export default async function POST(req, res) {
    const request = new paypal.orders.OrdersCreateRequest();
    const body = JSON.parse(req.body);

    console.log(body);

    // Mapear los productos en una sola unidad de compra con reference_id único
    const purchaseUnits = [{
        reference_id: 'default', // Asignar un reference_id único para la única unidad de compra
        amount: {
            currency_code: 'MXN',
            value: body.details.reduce((total, detail) => total + detail.price * detail.quantity, 0),
            breakdown: {
                item_total: {
                    currency_code: 'MXN',
                    value: body.details.reduce((total, detail) => total + detail.price * detail.quantity, 0),
                },
            },
        },
        items: body.details.map(detail => ({
            name:  detail.name,
            description: 'Total de productos: ' + body.details.lenght,
            quantity: detail.quantity,
            unit_amount: {
                currency_code: 'MXN',
                value: detail.price,
            },
        })),
    }];

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: purchaseUnits,
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
    });

    const response = await client.execute(request);
    res.status(200).json({ id: response.result.id });
}
