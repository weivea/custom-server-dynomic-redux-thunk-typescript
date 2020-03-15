import React from 'react';
// import {GetServerSideProps} from 'next';
import { fetchAllData } from '../../stores/book/fetch-sampledata';
import { Book } from '../../stores/book/interfaces';
import List from '../../pcomponents/List';
import Layout from '../../pcomponents/Layout';

type BookHomeProps = {
  books: Array<Book>;
};

const Index = (props: BookHomeProps) => {
  return (
    <Layout title="Books">
      <div>
        <List items={props.books} />
      </div>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const books = await fetchAllData();

  return { books: books };
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const books = await fetchAllData();
//   console.log('----------------------',books);
//   return {
//     props: { books: books }
//   };
// }


export default Index;
