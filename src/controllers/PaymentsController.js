const AppError = require("../utils/AppError");
const mercadopago = require('mercadopago');
require('dotenv').config();

const { MercadoPagoConfig, Payment } = mercadopago;
const client = new MercadoPagoConfig({ accessToken: process.env.MP_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });

const payment = new Payment(client);

class PaymentsController {
  async create(request, response) {
    const body = { 
      transaction_amount: request.body.transaction_amount,
      description: request.body.description,
      payment_method_id: request.body.paymentMethodId,
      payer: {
        email: request.body.email,
      }
    }

    const requestOptions = { idempotencyKey: '<SOME_UNIQUE_VALUE>' }
    payment.create({ body })
    .then((result) => {
      response.send(result)
    })
    .catch((error) => {
      response.status(500).json({ error: error.message})
    });
  }

  async checkPaymentStatus(request, response) {
    const { id } = request.params;

    try {
      const paymentResult = await payment.get({ id })
      response.json(paymentResult);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = PaymentsController