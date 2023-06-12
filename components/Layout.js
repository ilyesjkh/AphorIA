import Head from 'next/head';
import React from 'react';

const Layout = ({
  children,
  title = 'Apideck - Next Starter Kit',
  description = 'A Next.js starter kit with TypeScript, Tailwind, Jest, Prettier, and Eslint',
  favicon = '/img/logo.png'
}) => (
  <div className="font-basier-circle">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href={favicon} />
    </Head>
    <div className="min-h-screen bg-gray-50">{children}</div>
  </div>
);

export default Layout;
