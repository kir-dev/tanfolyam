import React from 'react'
import { Heading } from '@chakra-ui/react'
import { Composition } from './Composition'

export const CompositionWrapper: React.FC = () => {
    return (
        <Composition>
            <Heading>Komponálva vagyok</Heading>
            <h2>Hello</h2>
        </Composition>
    )
}
