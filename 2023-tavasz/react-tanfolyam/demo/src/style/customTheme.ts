import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('white', 'black')(props),
      },
    }),
  },
});

export default customTheme;
