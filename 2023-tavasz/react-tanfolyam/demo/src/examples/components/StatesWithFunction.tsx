import { Button } from '@chakra-ui/react';
import { useState } from 'react';

export function StatesWithFunction() {
  const [count, setCount] = useState<number>(0);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <Button colorScheme='orange' onClick={increment}>
      Kattintva ennyiszer: {count}
    </Button>
  );
}
