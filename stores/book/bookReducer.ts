import {
  GetBookByIdActions,
  FETCH_BOOKS,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  RESET_BOOKS,
} from './booksActions';
import { Book } from './interfaces';
import { Reducer } from 'redux';

export interface BookState {
  payload?: Book;
  isLoading: Boolean;
  error?: Array<string>;
}

const initialState: BookState = {
  payload: undefined,
  isLoading: false,
  error: [],
};

export const bookReducer: Reducer<BookState, GetBookByIdActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, isLoading: true };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, isLoading: false, payload: action.payload };
    case FETCH_BOOKS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case RESET_BOOKS:
      return initialState;
    default:
      return state;
  }
};
