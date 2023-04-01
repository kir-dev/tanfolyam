import { useEffect, useState } from 'react';

export function Lifecycle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('MOUNT');

    const id = setInterval(() => {
      console.log('Tick');
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      console.log('UNMOUNT');
      clearInterval(id);
    };
  }, []);

  return <p>{count}</p>;
}
