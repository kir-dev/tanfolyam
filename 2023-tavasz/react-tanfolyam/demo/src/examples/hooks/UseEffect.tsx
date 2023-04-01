import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export function UseEffect() {
  const [value, setValue] = useState<string>('Nem indult el');
  const [count, setCount] = useState<number>(0);
  // Tömbökkel és Objektumokkal óvatosan, referencia check lesz lehet.
  useEffect(() => {
    console.log(count);
    setValue(`Itt tart: ${count}`);
  }, [count]);
  console.log(value);
  return (
    <Box>
      <h1>{value}</h1>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Count
      </Button>
      <Button
        onClick={() => {
          setValue('asd');
        }}
      >
        asd
      </Button>
    </Box>
  );
}
