import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Heading } from '@chakra-ui/react'

export const UrlParams: React.FC = () => {
    const [params] = useSearchParams()
    return <Heading>{params.get('text') || 'Nincs szöveg'}</Heading>
}
