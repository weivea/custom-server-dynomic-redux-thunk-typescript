import * as React from 'react';
import Link from 'next/link';
import Layout from '../pcomponents/Layout';
import { NextPage } from 'next';



const IndexPage: NextPage = () => {
  return (
    <Layout title="Home">
      <h1>Hello</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <button>
        lalal
      </button>
    </Layout>
  );
};

export default IndexPage;
