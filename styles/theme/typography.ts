import {
  TypographyOptions,
  TypographyStyleOptions,
} from '@mui/material/styles/createTypography';

// Module Augmentation for MUI Typography
type CustomTypoVariant = 'heading1' | 'heading2' | 'title' | 'body' | 'link';
type CustomTypographyOptions = Partial<
  Record<CustomTypoVariant, TypographyStyleOptions>
>;

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
  interface TypographyVariants extends CustomTypographyOptions {}
}

declare module '@mui/material/Typography' {
  // eslint-disable-next-line no-unused-vars
  interface TypographyPropsVariantOverrides {
    heading1: true;
    heading2: true;
    title: true;
    body: true;
    link: true;
  }
}

declare module '@mui/material/styles/createTypography' {
  // eslint-disable-next-line no-unused-vars
  interface TypographyOptions extends CustomTypographyOptions {}
}

export const typography: TypographyOptions = {
  fontFamily: '"Quicksand", sans-serif',
  htmlFontSize: 16,
  fontSize: 14,
  heading1: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '40px',
    lineHeight: '56px',
    textTransform: 'uppercase',
  },
  heading2: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '24px',
    lineHeight: '34px',
    textTransform: 'uppercase',
  },
  body: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '22px',
  },
  title: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'uppercase',
  },
  link: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '30px',
  },
};
