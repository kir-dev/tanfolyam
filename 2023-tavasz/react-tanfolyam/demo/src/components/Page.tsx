import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

export function Page({ children }: PropsWithChildren) {
  return (
    <Box width='100vw' minH='100vh' backgroundColor={useColorModeValue('gray.100', 'black')} p={5}>
      <Container
        width='100%'
        maxWidth='50rem'
        p={5}
        backgroundColor={useColorModeValue('white', 'gray.800')}
        borderRadius='md'
      >
        {children}
      </Container>
    </Box>
  );
}
