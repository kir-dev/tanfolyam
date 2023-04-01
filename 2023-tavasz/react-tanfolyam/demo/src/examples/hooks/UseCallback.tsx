import { Button, ButtonProps } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

export function UseCallback() {
  const [state, setState] = useState(false);
  const handleClick = useCallback(() => {
    setState(!state);
  }, [state]);
  return <MyButton onClick={handleClick}>Toggle to {!state ? 'True' : 'False'}</MyButton>;
}

function MyButton(props: ButtonProps) {
  console.log('Render');
  return <Button {...props} />;
}
