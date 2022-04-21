import React, { useEffect, useState } from 'react'
import { Box, Button, HStack, Input, Spinner, Text } from '@chakra-ui/react'
import axios from 'axios'

export const CustomHook: React.FC = () => {
    const [num, setNum] = useState<number>(0)
    const { isEven, ad, loading, error } = useCustomHook(num)
    return (
        <Box>
            {error && <Text>{error}</Text>}
            {loading && <Spinner />}
            <Text my={10}>{isEven ? 'Páros' : 'Páratlan'}</Text>
            <Text my={10}>{ad}</Text>
            <HStack>
                <Input id="num" defaultValue={num} />
                <Button
                    onClick={() => {
                        setNum(parseInt((document.getElementById('num') as HTMLInputElement).value))
                    }}
                >
                    Csináld!
                </Button>
            </HStack>
        </Box>
    )
}

function useCustomHook(num: number) {
    const [isEven, setIsEven] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [ad, setAd] = useState<string>()
    useEffect(() => {
        setLoading(true)
        axios
            .get<{ iseven: boolean; ad: string }>('https://api.isevenapi.xyz/api/iseven/' + num)
            .then((res) => {
                setIsEven(res.data.iseven)
                setAd(res.data.ad)
            })
            .catch(() => {
                setError('Hiba történt')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [num])
    return { isEven, ad, loading, error }
}
