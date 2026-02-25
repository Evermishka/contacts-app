import { combineReducers, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { contactsReducer, favoritesReducer, groupsReducer, uiReducer } from './reducers';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  favorites: favoritesReducer,
  groups: groupsReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);

// Export the root state type
export type RootStateType = RootState;
