import React from 'react'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'

type PageProps = {}

export const Page: React.FC<PageProps> = ({ children }) => {
    return (
        <Box width="100vw" minH="100vh" backgroundColor={useColorModeValue('gray.100', 'black')} p={5}>
            <Container width="100%" maxWidth="50rem" p={5} backgroundColor={useColorModeValue('white', 'gray.800')} borderRadius="md">
                {children}
            </Container>
        </Box>
    )
}
