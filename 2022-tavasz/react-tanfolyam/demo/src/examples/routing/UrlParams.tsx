import React from 'react'
import { useSearchParams } from 'react-router-dom'
import {Heading, Text} from '@chakra-ui/react'

export const UrlParams: React.FC = () => {
    const [params] = useSearchParams()
    return <>
        <Heading>{params.get('text') || 'Nincs szöveg'}</Heading>
        <Text>Szerkeszd a címsávban a paramétert! Pl.: http://localhost:3000/url-params/?text=<strong>Hello</strong></Text>
    </>

}
