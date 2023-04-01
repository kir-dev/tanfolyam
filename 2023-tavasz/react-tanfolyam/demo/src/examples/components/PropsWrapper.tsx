import React from 'react';

import { Props } from './Props';

export function PropsWrapper() {
  return (
    <Props
      data={[
        { name: 'Valami', value: 10 },
        { name: 'Valami2', value: 20 },
      ]}
    />
  );
}
