import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_PRIVATE)

var prods = []

var funcs = {
    update: () => {
        return new Promise((res,rej) => {
            stripe.products.list().then((arr) => {
                console.log(arr)
                prods = arr.data
                res()
            }).catch(e => rej(e))
        })
    },
    /**
     * @returns {Array<Stripe.Product>}
     */
    getProducts: () => {
        return prods
    }
}

funcs.update()

export default funcs