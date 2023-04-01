import { Box, Button, HStack, Input, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export function CustomHook() {
  const [num, setNum] = useState('0');
  const [fieldValue, setFieldValue] = useState('0');
  const { isEven, ad, loading, error } = useCustomHook(num);
  return (
    <Box>
      {error && <Text>{error}</Text>}
      {loading && <Spinner />}
      <Text my={10}>{isEven ? 'Páros' : 'Páratlan'}</Text>
      <Text my={10}>{ad}</Text>
      <HStack>
        <Input id='num' defaultValue={num} onChange={(e) => setFieldValue(e.target.value)} />
        <Button
          onClick={() => {
            setNum(fieldValue);
          }}
        >
          Csináld!
        </Button>
      </HStack>
    </Box>
  );
}

function useCustomHook(num: string) {
  const [isEven, setIsEven] = useState<boolean>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [ad, setAd] = useState<string>();
  useEffect(() => {
    setLoading(true);
    axios
      .get<{ iseven: boolean; ad: string }>('https://api.isevenapi.xyz/api/iseven/' + num)
      .then((res) => {
        setIsEven(res.data.iseven);
        setError(undefined);
        setAd(res.data.ad);
      })
      .catch(() => {
        setError('Hiba történt');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [num]);
  return { isEven, ad, loading, error };
}
