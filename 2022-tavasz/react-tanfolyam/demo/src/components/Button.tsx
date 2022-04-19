import React from 'react'
import { useNavigate } from 'react-router'
import { Button, ButtonProps } from '@chakra-ui/react'
type LinkButtonProps = { to: string; external?: boolean } & ButtonProps
export const LinkButton: React.FC<LinkButtonProps> = ({ to, external, children, ...props }) => {
    const navigate = useNavigate()
    return (
        <Button
            onClick={() => {
                external ? window.open(to) : navigate(to)
            }}
            {...props}
            colorScheme="orange"
            variant="ghost"
        >
            {children}
        </Button>
    )
}
