import React from 'react'
import { Box, HStack, useColorModeValue } from '@chakra-ui/react'
import { LinkButton } from './Button'
import { ColorModeSwitcher } from './ColorModeSwitcher'

export const NavBar: React.FC = () => {
    return (
        <Box w="100%" p={3} bgColor={useColorModeValue('gray.100', 'gray.800')}>
            <HStack justify="space-between">
                <LinkButton to="/">React Tanfolyam</LinkButton>
                <ColorModeSwitcher />
            </HStack>
        </Box>
    )
}
