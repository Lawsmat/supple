import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import config from "../user/config"

export default function ThankYou() {
    return <Flex h="100vh" w="100vw" justify="center" align="center" bg="#95e675">
        <Box maxW="50vw">
            <Heading mt="0">{config.thanks.heading}</Heading>
            <Text>{config.thanks.message}</Text>
        </Box>
    </Flex>
}