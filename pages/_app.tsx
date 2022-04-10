import { MainLayout } from '@/layouts/index';
import { queryClient } from '@/queries/index';
import { createEmotionCache, theme } from '@/styles/index';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

type CustomNextPage = NextPage & {
  Layout?: React.FC;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: CustomNextPage;
}

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const Layout = Component.Layout || MainLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default MyApp;
