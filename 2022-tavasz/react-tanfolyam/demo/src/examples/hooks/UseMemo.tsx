import React, { useMemo, useState } from 'react'
import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react'

export const UseMemo: React.FC = () => {
    const [num, setNum] = useState<number>(0)
    const iterativeSum = useMemo<number>(() => {
        const limit = 1000000000
        let sum = 0
        for (let i = 0; i < limit; i++) {
            sum += num
        }
        return sum
    }, [num])
    const [anotherValue, setAnotherValue] = useState<boolean>(false)
    return (
        <Box>
            <Text my={10}>{iterativeSum}</Text>
            <Text my={10}>{anotherValue ? 'Igaz' : 'Hamis'}</Text>
            <ButtonGroup>
                <Button
                    onClick={() => {
                        setNum(num + 1)
                    }}
                >
                    Nőőőő
                </Button>
                <Button
                    onClick={() => {
                        setNum(num - 1)
                    }}
                >
                    Csökk
                </Button>
                <Button
                    onClick={() => {
                        setAnotherValue(!anotherValue)
                    }}
                >
                    Set another value
                </Button>
            </ButtonGroup>
        </Box>
    )
}
