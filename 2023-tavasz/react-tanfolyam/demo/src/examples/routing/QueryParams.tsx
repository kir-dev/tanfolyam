import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export function QueryParams() {
  const [params] = useSearchParams();
  return (
    <>
      <Heading>{params.get('text') || 'Nincs szöveg'}</Heading>
      <Text>
        Szerkeszd a címsávban a paramétert! Pl.: http://localhost:3000/url-params/?text=<strong>Hello</strong>
      </Text>
    </>
  );
}
