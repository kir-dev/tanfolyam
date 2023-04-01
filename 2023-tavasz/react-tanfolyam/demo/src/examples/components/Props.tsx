import React from 'react';

type SomeKindOfObject = {
  name: string;
  value: number | string;
};

type MyProps = {
  data: SomeKindOfObject[];
};

export const Props: React.FC<MyProps> = ({ data }) => {
  return (
    <div>
      {data.map((obj) => (
        <p key={obj.name}>
          {obj.name} : {obj.value}
        </p>
      ))}
    </div>
  );
};
