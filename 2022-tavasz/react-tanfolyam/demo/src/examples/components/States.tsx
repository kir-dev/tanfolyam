import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'

export const States: React.FC = () => {
    let [count, setCount] = useState<number>(0)
    console.log('hello')
    return (
        <Button
            colorScheme="orange"
            onClick={() => {
                setCount(count + 1)
            }}
        >
            Kattintva ennyiszer: {count}
        </Button>
    )
}
