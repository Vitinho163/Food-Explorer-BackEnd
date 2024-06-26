const AppError = require("../utils/AppError");
const mercadopago = require('mercadopago');
require('dotenv').config();

const { MercadoPagoConfig, Payment } = mercadopago;
const client = new MercadoPagoConfig({ accessToken: process.env.MP_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });

const payment = new Payment(client);

class PaymentsController {
  async create(request, response) {
    console.log(request.body)

    const body = { 
      transaction_amount: request.body.transaction_amount,
      description: request.body.description,
      payment_method_id: request.body.paymentMethodId,
      payer: {
        email: request.body.email,
        identification: {
          type: request.body.identificationType,
          number: request.body.number
        }
      }
    }

    const requestOptions = { idempotencyKey: '<SOME_UNIQUE_VALUE>' }
    payment.create({ body, requestOptions }).then(console.log).catch(console.log);
  }
}

module.exports = PaymentsController