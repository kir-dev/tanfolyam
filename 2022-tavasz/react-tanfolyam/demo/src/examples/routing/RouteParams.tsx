import React from 'react'
import { useParams } from 'react-router-dom'
import {Heading, Text} from '@chakra-ui/react'

export const RouteParams: React.FC = () => {
    const params = useParams()
    return <>
        <Heading>{params.text || 'Nincs szöveg'}</Heading>
        <Text>Szerkeszd a címsávban a paramétert! Pl.: http://localhost:3000/url-params/<strong>Hello</strong></Text>
    </>
}
