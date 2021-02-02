import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";

import '../styles/globals.css'

const promise = loadStripe("<insert key>");

function MyApp({ Component, pageProps }) {
  return <Elements stripe={promise}>
    <Component {...pageProps} />
  </Elements>
}

export default MyApp
