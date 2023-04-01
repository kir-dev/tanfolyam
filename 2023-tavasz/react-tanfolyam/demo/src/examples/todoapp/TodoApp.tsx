import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { TodoListItem } from './TodoListItem';
import { TodoItem } from './types';

type FormFields = {
  title: string;
};

const schema = object({
  title: string().required('Nevet adj neki!'),
});

export function TodoApp() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({ resolver: yupResolver(schema) });

  const onSubmit = ({ title }: FormFields) => {
    reset();
    const newTodo: TodoItem = { title, done: false, createdAt: new Date().getTime() };
    // Rossz megoldás (nem módosul a referencia, így render nem lesz)
    // todos.push(newTodo)
    // setTodos(todos)
    setTodos([...todos, newTodo]);
  };

  // Function factory!!!! Returns a function for the given number that has no parameters
  const toggleTodo = (createdAt: number) => () => {
    setTodos(
      todos.map((t) => {
        if (t.createdAt === createdAt) t.done = !t.done;
        return t;
      })
    );
  };

  return (
    <VStack spacing={5} align='flex-start'>
      <Heading>Todos</Heading>
      <VStack spacing={1}>
        {todos.map((todo) => (
          //Calling the function factory, and we pass into the returned function with the createdAt number memorized.
          <TodoListItem key={todo.createdAt} todo={todo} onClick={toggleTodo(todo.createdAt)} />
        ))}
      </VStack>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align='flex-start'>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Címke</FormLabel>
            <Input {...register('title')} />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <Button type='submit'>Hozzáad!</Button>
        </VStack>
      </form>
    </VStack>
  );
}
