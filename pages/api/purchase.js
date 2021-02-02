import Stripe from "stripe"
const os = require("os")
const stripe = new Stripe(process.env.STRIPE_PRIVATE)

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req,res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Tree Rank',
          },
          unit_amount: 6942000,
        },
        quantity: 1,
      },
    ],
    metadata: {
      username: "MoonBarc"
    },
    mode: 'payment',
    success_url: "http://" + os.hostname() + "/complete",
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
}