import { ChakraProvider } from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";

import '../styles/globals.css'
const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function MyApp({ Component, pageProps }) {
  return <Elements stripe={promise}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </Elements>
}

export default MyApp
