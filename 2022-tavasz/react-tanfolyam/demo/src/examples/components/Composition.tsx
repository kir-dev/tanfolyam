import React from 'react'
import { Button } from '@chakra-ui/react'

export const Composition: React.FC = (props) => {
    return <Button colorScheme="orange">{props.children}</Button>
}
