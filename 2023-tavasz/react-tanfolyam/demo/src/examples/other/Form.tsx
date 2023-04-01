import { Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { number, object, string } from 'yup';

const schema = object({
  first: string().required('Kötelezőőőő'),
  second: number().required('Kötelezőőőő').positive('Mivan negatív').integer('Egész legyen'),
});

type FormFields = {
  first: string;
  second: number;
};

export function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({ resolver: yupResolver(schema) });
  const onSubmit = (values: FormFields) => {
    alert(`${values.first} ${values.second}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.first}>
        <FormLabel>Első mező</FormLabel>
        <Input {...register('first')} />
        <FormErrorMessage>{errors.first?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.second}>
        <FormLabel>Második mező</FormLabel>
        <Input {...register('second')} />
        <FormErrorMessage>{errors.second?.message}</FormErrorMessage>
      </FormControl>
      <ButtonGroup mt={5}>
        <Button type='submit' colorScheme='orange'>
          Küldés
        </Button>
        <Button
          onClick={() => {
            reset({ first: 'Hello', second: 0 });
          }}
          variant='unstyled'
          color='orange'
        >
          Reszet
        </Button>
      </ButtonGroup>
    </form>
  );
}
