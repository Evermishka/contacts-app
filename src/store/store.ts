import { combineReducers, createStore } from 'redux';
import { contactsReducer, favoritesReducer, groupsReducer } from './reducers';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  favorites: favoritesReducer,
  groups: groupsReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
