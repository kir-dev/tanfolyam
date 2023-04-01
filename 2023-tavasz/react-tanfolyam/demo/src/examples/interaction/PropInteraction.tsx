import React from 'react';

export function PropInteraction() {
  const text = 'Valami szöveg';
  return <InnerComponent text={text} />;
}

type MyProps = {
  text: string;
};

const InnerComponent: React.FC<MyProps> = ({ text }) => {
  return <h1>{text}</h1>;
};
