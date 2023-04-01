import { Button } from '@chakra-ui/react';
import { useState } from 'react';

export function States() {
  const [count, setCount] = useState<number>(0);
  console.log('hello');
  return (
    <Button
      colorScheme='orange'
      onClick={() => {
        setCount(count + 1);
      }}
    >
      Kattintva ennyiszer: {count}
    </Button>
  );
}
