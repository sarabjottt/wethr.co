import Head from 'next/head';
import '../styles/main.scss';
import { getLS } from '../components/Helper';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="favicon-192.png" />
        <title>Weather Forecast - 🌦 Whter.co</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
