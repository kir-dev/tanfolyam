import { Heading, useTimeout } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router';

export function RouterFunctions() {
  const navigate = useNavigate();
  useTimeout(() => {
    navigate('/');
  }, 5000);
  return <Heading>Hello, nemsokára távozunk</Heading>;
}
