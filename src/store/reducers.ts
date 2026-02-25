import { ContactDto } from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import {
  CLEAR_ERROR,
  CONTACTS_LOAD,
  FAVORITES_LOAD,
  GROUPS_LOAD,
  LOADING_END,
  LOADING_START,
  ProjectActions,
  SET_ERROR,
} from './actions';
import { UIState } from 'src/types/common';

const initialContactsState: ContactDto[] = [];
const initialFavoritesState: FavoriteContactsDto = [];
const initialGroupsState: GroupContactsDto[] = [];

const initialUIState: UIState = {
  contacts: {
    loading: false,
    error: false,
  },
  favorites: {
    loading: false,
    error: false,
  },
  groups: {
    loading: false,
    error: false,
  },
};

export const contactsReducer = (
  state = initialContactsState,
  action: ProjectActions
): ContactDto[] => {
  switch (action.type) {
    case CONTACTS_LOAD:
      return action.payload;
    default:
      return state;
  }
};

export const favoritesReducer = (
  state = initialFavoritesState,
  action: ProjectActions
): FavoriteContactsDto => {
  switch (action.type) {
    case FAVORITES_LOAD:
      return action.payload;
    default:
      return state;
  }
};

export const groupsReducer = (
  state = initialGroupsState,
  action: ProjectActions
): GroupContactsDto[] => {
  switch (action.type) {
    case GROUPS_LOAD:
      return action.payload;
    default:
      return state;
  }
};

export const uiReducer = (state = initialUIState, action: ProjectActions): UIState => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        contacts: { ...state.contacts, loading: true },
        favorites: { ...state.favorites, loading: true },
        groups: { ...state.groups, loading: true },
      };
    case LOADING_END:
      return {
        ...state,
        contacts: { ...state.contacts, loading: false },
        favorites: { ...state.favorites, loading: false },
        groups: { ...state.groups, loading: false },
      };
    case SET_ERROR:
      return {
        ...state,
        [action.payload.entity]: {
          ...state[action.payload.entity],
          error: true,
          errorMessage: action.payload.message,
        },
      };
    case CLEAR_ERROR:
      return {
        ...state,
        [action.payload.entity]: {
          ...state[action.payload.entity],
          error: false,
          errorMessage: undefined,
        },
      };
    default:
      return state;
  }
};
