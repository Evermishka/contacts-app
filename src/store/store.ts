import { combineReducers, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { contactsReducer, favoritesReducer, groupsReducer, uiReducer } from './reducers';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  favorites: favoritesReducer,
  groups: groupsReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// @ts-expect-error - Redux typing issue with newer versions
export const store = createStore(rootReducer, applyMiddleware(thunk));
