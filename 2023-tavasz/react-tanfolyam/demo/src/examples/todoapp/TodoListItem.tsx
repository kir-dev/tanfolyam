import { Card, HStack, Text } from '@chakra-ui/react';
import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';

import { TodoItem } from './types';

interface TodoListItemProps {
  todo: TodoItem;
  onClick: () => void;
}

export function TodoListItem({ todo: { done, title }, onClick }: TodoListItemProps) {
  return (
    <Card onClick={onClick} p={2} cursor='pointer'>
      <HStack>
        {done ? <BsCheckCircleFill /> : <BsCircle />}
        <Text as={done ? 's' : 'p'}>{title}</Text>
      </HStack>
    </Card>
  );
}
