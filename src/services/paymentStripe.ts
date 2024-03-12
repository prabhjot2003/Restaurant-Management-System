import stripe from 'stripe';

import { STRIPE_SECRET_KEY } from '../config/env'

const stripeInstance = new stripe(STRIPE_SECRET_KEY);


/* Create customer by using strip payment method */

const createCustomer = async (req: any, res: any) => {
  try {
    const { stripeEmail, stripeToken, name, address } = req.body;

    // Create a new customer
    const customer: any = await stripeInstance.customers.create({
      email: stripeEmail,
      source: stripeToken,
      name: name,


      address: {
        line1: address.line1,
        postal_code: address.postal_code,
        city: address.city,
        state: address.state,
        country: address.country,
      }
    });
    res.status(201).json({ message: "Success", customer });
  } catch (err) {
    res.status(500).send(err);
  }
};


/* this function addcharge by using customerId  */

const addCharge = async (req: any, res: any) => {
  try {
    const { stripeEmail, source, amount, description, currency, customerId } = req.body

    const charge = await stripeInstance.charges.create({
      amount: amount,
      source: source,
      description: description,
      currency: currency,
    })

    res.status(201).json({ message: "Success", charge });
  } catch (err) {
    res.status(500).send({ message: "error" });
  }
};



export default {
  createCustomer,
  addCharge
}






