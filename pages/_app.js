import { ChakraProvider } from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import { Flipper } from 'react-flip-toolkit';

const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function MyApp({ Component, pageProps, router }) {
  return <Elements stripe={promise}>
    <ChakraProvider>
      <Flipper flipKey={router.asPath}>
        <Component {...pageProps} />
      </Flipper>
    </ChakraProvider>
  </Elements>
}

export default MyApp
