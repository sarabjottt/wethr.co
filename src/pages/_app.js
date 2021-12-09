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
        <title>Weather Forecast - 🌦 wethr.co</title>
        <meta
          name="description"
          content="wethr.co | minimal weather forecast app."
        />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicons/clear-day.png" />
        <link rel="apple-touch-icon" href="favicon-192.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
