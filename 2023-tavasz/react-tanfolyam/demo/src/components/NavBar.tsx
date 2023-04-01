import { Box, HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { LinkButton } from './Button';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export function NavBar() {
  return (
    <Box w='100%' p={3} bgColor={useColorModeValue('gray.100', 'gray.800')}>
      <HStack justify='space-between'>
        <LinkButton to='/'>React Tanfolyam</LinkButton>
        <ColorModeSwitcher />
      </HStack>
    </Box>
  );
}
