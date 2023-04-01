import { Button } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export function Composition(props: PropsWithChildren) {
  return <Button colorScheme='orange'>{props.children}</Button>;
}
