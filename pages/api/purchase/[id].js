import Stripe from "stripe"
import productList from "../../../lib/productList";
import config from "../../../user/config";
const stripe = new Stripe(process.env.STRIPE_PRIVATE)

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async (req,res) => {
  var product = productList.getProducts().filter((ar) => ar.id == req.query.id)[0]
  if(!product) {
    res.status(404).send("Product does not exist")
    return
  }
  try {
    var prices = await stripe.prices.list({product: product.id,limit:1})
    prices = prices.data
  }catch(e) {
    res.status(500).send("Could not retrieve price for the product (1)")
    return
  }
  if(!prices[0]) {
    res.status(500).send("Could not retrieve price for the product (2)")
    return
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description
          },
          unit_amount: prices[0].unit_amount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      username: "MoonBarc"
    },
    mode: 'payment',
    success_url: `${config.technical.baseUrl}/complete`,
    cancel_url: `${config.technical.baseUrl}/product/${product.id}`,
  });

  res.json({ id: session.id });
}