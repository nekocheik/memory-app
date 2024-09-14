import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    primary: {
      100: '#E3F2FD',
      200: '#BBDEFB',
      300: '#90CAF9',
    },
  },
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
});

export default customTheme;

export {
  customTheme
}
