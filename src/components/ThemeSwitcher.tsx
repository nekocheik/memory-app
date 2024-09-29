import { Box, Select } from "@chakra-ui/react";
import { useState } from "react";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

const themes = {
  light: extendTheme({
    config: {
      initialColorMode: "light",
    },
  }),
  dark: extendTheme({
    config: {
      initialColorMode: "dark",
    },
  }),
};

type ThemeName = "light" | "dark";

export const ThemeSwitcher = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>("dark");
  const theme = themes[themeName];

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Select
          value={themeName}
          onChange={(e) => setThemeName(e.target.value as ThemeName)}
        >
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
        </Select>
      </Box>
      {children}
    </ChakraProvider>
  );
};

export default ThemeSwitcher;
