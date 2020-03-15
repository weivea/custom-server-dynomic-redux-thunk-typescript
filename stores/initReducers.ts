import { bookReducer } from './book/bookReducer';
import {StoreNamespace} from './const'
export const initReducer = {
  [StoreNamespace.book]: bookReducer,
};
