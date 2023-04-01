import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPageContext } from "next"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({ Component, ctx }: { Component: any, ctx: NextPageContext }) => {
  const { res } = ctx;
  if (res) {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
  }
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default MyApp;