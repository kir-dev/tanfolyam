import React from 'react'
import { useParams } from 'react-router-dom'
import { Heading } from '@chakra-ui/react'

export const RouteParams: React.FC = () => {
    const params = useParams()
    return <Heading>{params.text || 'Nincs szöveg'}</Heading>
}
