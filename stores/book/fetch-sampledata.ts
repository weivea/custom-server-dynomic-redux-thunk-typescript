import fetch from 'isomorphic-fetch';
import { BookData, ErrorMessage, Book } from './interfaces';

export const fetchSampleData = async (id: Number) => {
  const response: Response = await fetch(
    `http://localhost:3000/api/books/${id}`
  );
  const data: BookData = await response.json();
  if (!response.ok) {
    throw Error((data as ErrorMessage).message);
  }

  return data as Book;
};

export const fetchAllData = async () => {
  const response: Response = await fetch('http://localhost:3000/api/books');

  const data: Array<Book> = await response.json();

  return data;
};
