import { Input } from '@chakra-ui/react';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

export function ContextInteraction() {
  return (
    <MyContextProvider>
      <div>
        <div>
          <InputComponent />
        </div>
      </div>
      <OutputComponent />
    </MyContextProvider>
  );
}

type MyContextType = {
  value: string;
  setValue: (newValue: string) => void;
};

const MyContext = createContext<MyContextType>({
  value: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setValue: () => {},
});

function MyContextProvider({ children }: PropsWithChildren) {
  const [value, setValue] = useState<string>('Kezdő érték');

  return <MyContext.Provider value={{ value, setValue }}>{children}</MyContext.Provider>;
}

function InputComponent() {
  const { setValue } = useContext<MyContextType>(MyContext);
  return (
    <Input
      onChange={(event) => {
        setValue(event.target.value);
      }}
    />
  );
}

function OutputComponent() {
  const { value } = useContext<MyContextType>(MyContext);
  return <h1>{value}</h1>;
}
