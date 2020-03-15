import * as React from 'react';

import { Book } from '../stores/book/interfaces';

type ListDetailProps = {
  item: Book;
};

const ListDetail: React.FunctionComponent<ListDetailProps> = ({ item }) => (
  <div>
    <h1 className="example">{item.name}</h1>
    <h2>Author: {item.author} </h2>
    <p>ID: {item.id}</p>
  </div>
);

export default ListDetail;
