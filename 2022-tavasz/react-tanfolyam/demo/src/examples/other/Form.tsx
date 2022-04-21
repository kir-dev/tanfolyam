import React from 'react'
import { Button, ButtonGroup, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

type FormFields = {
    first: string
    second: string
}

export const Form: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<FormFields>()
    const onSubmit = (values: FormFields) => {
        alert(`${values.first} ${values.second}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
                <FormLabel>Első mező</FormLabel>
                <Input {...register('first')} />
            </FormControl>
            <FormControl>
                <FormLabel>Második mező</FormLabel>
                <Input {...register('second')} />
            </FormControl>
            <ButtonGroup mt={5}>
                <Button type="submit" colorScheme="orange">
                    Küldés
                </Button>
                <Button
                    onClick={() => {
                        reset({ first: 'Hello', second: 'bello' })
                    }}
                    variant="unstyled"
                    color="orange"
                >
                    Reszet
                </Button>
            </ButtonGroup>
        </form>
    )
}
