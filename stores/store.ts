import {
  Store,
  createStore,
  applyMiddleware,
  combineReducers,
  Reducer,
  CombinedState,
  AnyAction
} from 'redux';
import { DefaultRootState } from 'react-redux';
import { initReducer } from './initReducers';
import { BookState } from './book/bookReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/*--- 类型声明 */
type InitState = DefaultRootState & { book: BookState };
interface Reducers {
  [key: string]: Reducer;
}

type CombinedReducer = Reducer<CombinedState<{ [x: string]: any }>, AnyAction>;

interface ReducerManager {
  getReducerMap: () => Reducers;
  reduce: CombinedReducer;
  add: (key: string, reducer: Reducer) => void;
  remove: (key: string) => void;
}

/*--- 逻辑代码*/
export const reducerManager = createReducerManager(initReducer);

export function initStore(initialState: InitState): Store {
  const store: Store = createStore(
    reducerManager.reduce,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}

function createReducerManager(initialReducers: Reducers) {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers };

  // Create the initial combinedReducer
  let combinedReducer: CombinedReducer = combineReducers(reducers);

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: string[] = [];

  const re: ReducerManager = {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state, action) => {
      // If any reducers have been removed, clean up their state first
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action);
    },

    // Adds a new reducer with the specified key
    add: (key: string, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      // Add the reducer to the reducer mapping
      reducers[key] = reducer;
      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    },

    // Removes a reducer with the specified key
    remove: key => {
      if (!key || !reducers[key]) {
        return;
      }

      // Remove it from the reducer mapping
      delete reducers[key];

      // Add the key to the list of keys to clean up
      keysToRemove.push(key);

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers);
    }
  };
  return re;
}
