import { PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';

interface ThemeType {
  children: React.ReactNode;
}

export const ProviderTheme = ({ children }: ThemeType) => {
  const [colorScheme, setColorScheme] = useState<PaletteMode>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setColorScheme(event.matches ? 'dark' : 'light');
    };

    handleChange(mediaQuery); // Verificar o valor inicial

    mediaQuery.addEventListener('change', handleChange); // Ouvir as alterações de preferência

    return () => {
      mediaQuery.removeEventListener('change', handleChange); // Remover o ouvinte quando o componente for desmontado
    };

  }, []);

  const theme = createTheme({
    // typography: {
    //   // fontFamily: 'NK57 Monospace',
    // },
    palette: {
      mode: colorScheme,
      // primary: {
      //   light: '#309',
      //   main: 'rgba(255, 255, 255, 0.85)',
      // },
      // secondary: {
      //   light: '#000',
      //   main: '#000',
      // },
      // text: {
      //   primary: 'rgba(255, 255, 255, 0.85)',
      //   secondary: 'rgba(255, 255, 255, 0.85)',
      // },
      // background: {
      //   paper: 'rgba(0,0,0,0.75)',
      // },

    },
  });

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
