import React from 'react';
import { getBookById } from '../../stores/book/booksActions';
import { useSelector } from 'react-redux';
import { NextPageWithRedux} from '../../stores/with-redux-store'
import { BookState } from '../../stores/book/bookReducer';
import Layout from '../../pcomponents/Layout';
import ListDetail from '../../pcomponents/ListDetail';
import {StoreNamespace} from '../../stores/const'

// 类型声明
type BookDetailPageProps = {
  id?: Number;
};

// 实际代码
const BookDetailPage: NextPageWithRedux<BookDetailPageProps> = (props) => {
  const namespaceKey = StoreNamespace.book
  const book = useSelector<{[namespaceKey]: BookState}, BookState>(state => state[namespaceKey]);

  return (
    <Layout title={book.payload ? book.payload.name : ''}>
      <p className="color-red">This page is {props.id}</p>
      {book.isLoading ? (
        <div>Loading...</div>
      ) : book.payload ? (
        <ListDetail item={book.payload} />
      ) : (
        book.error && (
          <div>
            {book.error.map((item, key) => {
              <p key={key}>{item}</p>;
            })}
          </div>
        )
      )}
    </Layout>
  );
};

BookDetailPage.getInitialProps = async ({ query, isServer, store}) => {
  const { id } = query;

  if (isServer) {
    // wait action to finish if server
    await (store.dispatch as any)(getBookById(Number(id)));
  } else {
    // no need to wait when client side
    await (store.dispatch as any)(getBookById(Number(id)));
  }

  return { id: Number(id) };
};

export default BookDetailPage;
