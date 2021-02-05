import { Box, Center, Flex, Spacer } from '@chakra-ui/react'
import Head from 'next/head'
import ButtonBox from '../components/buttonBox'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex w="75vw" h="100vh" align="center" mt="50vh" justify="center">
        <ButtonBox/><Spacer/><ButtonBox/><Spacer/><ButtonBox/>
      </Flex>
    </Flex>
  )
}
