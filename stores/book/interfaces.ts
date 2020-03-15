export type Book = {
  id: number;
  name: string;
  author: string;
};

export type ErrorMessage = {
  status: string;
  message: string;
};

export type BookData = Book | ErrorMessage;
