import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { breakpoints } from './breakpoints';
import { palette } from './palette';
import { typography } from './typography';

export const theme = responsiveFontSizes(
  createTheme({
    palette,
    typography,
    breakpoints,
    shape: {
      borderRadius: 0,
    },
    spacing: 8,
  }),
);

export const colors = theme.palette;
