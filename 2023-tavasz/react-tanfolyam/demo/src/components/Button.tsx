import { Button, ButtonProps } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';

type LinkButtonProps = { to: string; external?: boolean } & ButtonProps & PropsWithChildren;

export function LinkButton({ to, external, children, ...props }: LinkButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        external ? window.open(to) : navigate(to);
      }}
      {...props}
      colorScheme='orange'
      variant='ghost'
    >
      {children}
    </Button>
  );
}
