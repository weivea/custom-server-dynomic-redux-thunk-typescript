export enum StoreNamespace  {
  book= 'book',
  counter= 'counter'
}

export enum ActionTypes  {
  // for counter
  TICK= 'TICK',
  INCREMENT= 'INCREMENT',
  DECREMENT= 'DECREMENT',
  RESET= 'RESET',

  // for book
  RESET_BOOKS = 'RESET_BOOKS',
  FETCH_BOOKS = 'FETCH_BOOKS',
  FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS',
  FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE'
  
}