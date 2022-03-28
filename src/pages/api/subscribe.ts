import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { stripe } from '../../services/stripe';

export default async function Subscribe(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    const { email } = session?.user;

    const customers = await stripe.customers.list();
    const customerExists = customers.data.find((customer) =>
      customer.email === email ? customer : false,
    );

    let stripeCustomer;

    if (!customerExists) {
      console.log('customer dont exist');
      stripeCustomer = await stripe.customers.create({
        email: session.user.email,
      });
    } else {
      console.log('customer exist');
      stripeCustomer = customerExists;
    }

    console.log(stripeCustomer);

    // const stripeCheckoutSession = await stripe.checkout.sessions.create({
    //   customer: stripeCustomer,
    //   allow_promotion_codes: true,
    //   cancel_url: process.env.STRIPE_CANCEL_URL,
    //   success_url: process.env.STRIPE_SUCCESS_URL,
    //   billing_address_collection: 'required',
    //   line_items: [{ price: req.body.priceId, quantity: 1 }],
    //   mode: 'subscription',
    //   payment_method_types: ['card'],
    // });

    // return res.status(200).json({ sessionId: stripeCheckoutSession.id });
  }
  res.setHeader('Allow', 'POST');
  res.status(405).end('Method not allowed');
}
