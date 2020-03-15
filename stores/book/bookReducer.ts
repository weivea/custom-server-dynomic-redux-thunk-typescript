import {
  GetBookByIdActions,
} from './booksActions';
// @ts-ignore
import { ActionTypes } from 'stores/const'

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
    case ActionTypes.FETCH_BOOKS:
      return { ...state, isLoading: true };
    case ActionTypes.FETCH_BOOKS_SUCCESS:
      return { ...state, isLoading: false, payload: action.payload };
    case ActionTypes.FETCH_BOOKS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case ActionTypes.RESET_BOOKS:
      return initialState;
    default:
      return state;
  }
};
