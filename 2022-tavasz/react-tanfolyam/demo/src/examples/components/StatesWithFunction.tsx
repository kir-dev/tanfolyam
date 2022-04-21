import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'

export const StatesWithFunction: React.FC = () => {
    const [count, setCount] = useState<number>(0)
    const increment = () => {
        setCount(count + 1)
    }
    return (
        <Button colorScheme="orange" onClick={increment}>
            Kattintva ennyiszer: {count}
        </Button>
    )
}
