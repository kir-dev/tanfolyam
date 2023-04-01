import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

export function RouteParams() {
  const params = useParams();
  return (
    <>
      <Heading>{params.text || 'Nincs szöveg'}</Heading>
      <Text>
        Szerkeszd a címsávban a paramétert! Pl.: http://localhost:3000/url-params/<strong>Hello</strong>
      </Text>
    </>
  );
}
