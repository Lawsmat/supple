import Stripe from "stripe"
import productList from "../../lib/productList"
const stripe = new Stripe(process.env.STRIPE_PRIVATE)

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function(req,res) {
    var publicFacing = [];
    productList.getProducts().forEach(e => {
        publicFacing.push({
            name: e.name,
            id: e.id,
            description: e.description
        })
    })
    res.json()
}