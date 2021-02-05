import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router"
import { useStripe } from "@stripe/react-stripe-js";
import useSWR from "swr";

export default function ProductPage() {
    const router = useRouter()
    const { data, error } = useSWR("/api/purchase/" + router.query.product, fetcher)
    const stripe = useStripe()
    const [loading, setLoading] = useState(false)
    return <Flex h="100vh" w="100vw" justify="center" align="center" bg="gray.100">
        <Box maxW="80vw" minW="20vw" bg="white" padding="45px">
            <Heading mt="0">{router.query.product}</Heading>
            <Text mb="45px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus posuere velit sit amet neque condimentum pretium. Praesent dapibus nunc a sodales aliquet. Phasellus tempor eleifend risus, in scelerisque dolor fermentum quis.</Text>
            <Button w="100%" isLoading={loading || !data || error} onClick={async () => {
                console.log(data)
                setLoading(true)
                const result = await stripe.redirectToCheckout({sessionId: data.id})
                if(result.error) {
                    console.log("sadge")
                }else{
                    console.log("pog")
                }
            }}>Purchase</Button>
        </Box>
    </Flex>
}

const fetcher = (url => fetch(url,{
    method: "POST",
    body: JSON.stringify({username: "moonpog"}),
}).then(res => res.json()))