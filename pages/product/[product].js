import { Box, Button, Flex, Heading, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router"
import { useStripe } from "@stripe/react-stripe-js";
import useSWR from "swr";

export default function ProductPage() {
    const router = useRouter()
    const { data, error } = useSWR("/api/purchase/" + router.query.product, fetcher)
    const stripe = useStripe()
    const { product, isError, shouldUseSkeleton } = useProduct()
    const [loading, setLoading] = useState(false)
    return <Flex h="100vh" w="100vw" justify="center" align="center" bg="gray.100">
        <Box maxW="80vw" minW="20vw" bg="white" padding="45px">
            <Skeleton isLoaded={!shouldUseSkeleton}>
                <Heading mt="0">{shouldUseSkeleton ? "Loading..." : product.name}</Heading>
            </Skeleton>
            <SkeletonText mt="25px" mb="25px" isLoaded={!shouldUseSkeleton} >
                <Text mb="45px">{shouldUseSkeleton ? "Loading..." : product.description}</Text>
            </SkeletonText>
            <Button w="100%" isLoading={loading || !data || error} colorScheme="twitter" onClick={async () => {
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

function useProduct() {
    const router = useRouter()
    const productFetcher = (id => fetch("/api/info/" + id,{
        method: "GET"
    }).then(res => res.json()))
    const {data, error} = useSWR(router.query.product, productFetcher) 
    return {
        product: data,
        isError: error,
        isLoading: !data && !error,
        shouldUseSkeleton: !data || error
    }
}