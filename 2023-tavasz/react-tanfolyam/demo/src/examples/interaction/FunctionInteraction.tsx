import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

export function FunctionInteraction() {
  const [text, setText] = useState<string>('Nem történt nyomás');
  const func = (newText: string) => {
    setText(newText);
  };
  return (
    <>
      <InnerComponent func={func} />
      <h1>{text}</h1>
    </>
  );
}

type MyProps = {
  func: (text: string) => void;
};

const InnerComponent: React.FC<MyProps> = ({ func }) => {
  return (
    <Button
      onClick={() => {
        func('hello');
      }}
    >
      Kattt
    </Button>
  );
};
