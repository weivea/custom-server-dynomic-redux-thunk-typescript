import * as React from 'react';
import Link from 'next/link';

import { Book } from '../stores/book/interfaces';

type Props = {
  data: Book;
};

const ListItem: React.FunctionComponent<Props> = ({ data }) => (
  <Link href="/books/[id]" as={`/books/${data.id}`}>
    <a>
      {data.id}: {data.name} : {data.author}
    </a>
  </Link>
);

export default ListItem;
