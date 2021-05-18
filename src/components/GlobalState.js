import { createContext } from 'react';

export const themes = {
  light: {
    font: '#2f2f2f',
  },
  dark: {
    font: '#ffffff',
  },
};
export const GlobalState = createContext(themes.light);
