import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  title?: string;
  style?: React.CSSProperties | undefined
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  style={},
  title = 'This is the default title',
}) => (
  <div style={{...style}}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/books">
          <a>Book List</a>
        </Link>
        {' '}|{' '}
        <Link href="/counter">
          <a>Counter</a>
        </Link>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
