import React from 'react'
import { Heading, useTimeout } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export const RouterFunctions: React.FC = () => {
    const navigate = useNavigate()
    useTimeout(() => {
        navigate('/')
    }, 5000)
    return <Heading>Hello, nemsokára távozunk</Heading>
}
