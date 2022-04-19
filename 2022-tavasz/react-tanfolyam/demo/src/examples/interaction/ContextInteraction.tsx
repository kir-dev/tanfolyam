import React, { createContext, useContext, useState } from 'react'
import { Input } from '@chakra-ui/react'

export const ContextInteraction: React.FC = () => {
    return (
        <MyContextProvider>
            <div>
                <div>
                    <InputComponent />
                </div>
            </div>
            <OutputComponent />
        </MyContextProvider>
    )
}

type MyContextType = {
    value: string
    setValue: (newValue: string) => void
}

const MyContext = createContext<MyContextType>({
    value: '',
    setValue: () => {}
})

const MyContextProvider: React.FC = ({ children }) => {
    const [value, setValue] = useState<string>('Kezdő érték')

    return <MyContext.Provider value={{ value, setValue }}>{children}</MyContext.Provider>
}

const InputComponent: React.FC = () => {
    const { setValue } = useContext<MyContextType>(MyContext)
    return (
        <Input
            onChange={(event) => {
                setValue(event.target.value)
            }}
        />
    )
}

const OutputComponent: React.FC = () => {
    const { value } = useContext<MyContextType>(MyContext)
    return <h1>{value}</h1>
}
