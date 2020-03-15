import * as React from 'react';
import ListItem from './ListItem';
import { Book } from '../stores/book/interfaces';

type Props = {
  items: Book[];
};

const List: React.FunctionComponent<Props> = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);

export default List;
