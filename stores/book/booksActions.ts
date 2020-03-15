import { Book } from './interfaces';
import { Action, Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {ActionTypes} from 'stores/const'
import { fetchSampleData } from './fetch-sampledata';

// export const RESET_BOOKS = 'RESET_BOOKS';
// export const FETCH_BOOKS = 'FETCH_BOOKS';
// export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
// export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

export interface ResetBooksAction extends Action<typeof ActionTypes.RESET_BOOKS> {
  type: typeof ActionTypes.RESET_BOOKS;
}

export interface FetchBookAction extends Action<typeof ActionTypes.FETCH_BOOKS> {
  type: typeof ActionTypes.FETCH_BOOKS;
}

export interface FetchBookSuccessAction
  extends Action<typeof ActionTypes.FETCH_BOOKS_SUCCESS> {
  type: typeof ActionTypes.FETCH_BOOKS_SUCCESS;
  payload: Book;
}

export interface FetchBookFailureAction
  extends Action<typeof ActionTypes.FETCH_BOOKS_FAILURE> {
  type: typeof ActionTypes.FETCH_BOOKS_FAILURE;
  payload: any;
}

export type GetBookByIdActions =
  | FetchBookAction
  | FetchBookSuccessAction
  | FetchBookFailureAction
  | ResetBooksAction;

export type BookThunkAction = ThunkAction<
  Promise<GetBookByIdActions>, // The type of the last action to be dispatched - will always be promise<T> for async actions
  Book, // The type for the data within the last action
  null, // The type of the parameter for the nested function
  GetBookByIdActions // The type of the last action to be dispatched
>;

export const getBookById: ActionCreator<BookThunkAction> = (id: Number) => {
  return async (dispatch: Dispatch) => {
    let action: GetBookByIdActions;
    action = { type: ActionTypes.FETCH_BOOKS };
    dispatch(action);
    try {
      const data: Book = await fetchSampleData(id);
      action = { type: ActionTypes.FETCH_BOOKS_SUCCESS, payload: data };
      return dispatch(action);
    } catch (e) {
      if (e instanceof Error) {
        action = { type: ActionTypes.FETCH_BOOKS_FAILURE, payload: [e.message] };
      }
    }
    return dispatch(action);
  };
};
