import { PaletteOptions } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  // eslint-disable-next-line no-unused-vars
  interface CommonColors {
    dark: string;
    ['grey-1']: string;
    ['grey-2']: string;
    white: string;
    brown: string;
    ['neutral-1']: string;
    ['neutral-2']: string;
    ['neutral-dark']: string;
    ['neutral-smoke']: string;
  }
}

export const palette: PaletteOptions = {
  primary: {
    main: '#CE5628',
  },
  success: {
    main: '#47C751',
  },
  warning: {
    main: '#E9912A',
  },
  error: {
    main: '#EF4949',
  },
  info: {
    main: '#248FED',
  },
  common: {
    dark: '#000000',
    ['grey-1']: '#737373',
    ['grey-2']: '#C0C0C0',
    white: '#FFFFFF',
    brown: '#B9977C',
    ['neutral-1']: '#DADADA',
    ['neutral-2']: '#F3F3F3',
    ['neutral-dark']: '#B9977C',
    ['neutral-smoke']: '#F8F9FA',
  },
  text: {
    primary: '#000000',
  },
  action: {
    hoverOpacity: 0,
    focusOpacity: 0,
  },
};
