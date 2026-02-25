import { ContactDto } from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import {
  CONTACTS_LOAD,
  FAVORITES_LOAD,
  GROUPS_LOAD,
  LOADING_START,
  LOADING_END,
  SET_ERROR,
  CLEAR_ERROR,
} from './actions';
import {
  contactsLoadAction,
  favoritesLoadAction,
  groupsLoadAction,
  loadingStartAction,
  loadingEndAction,
  setErrorAction,
  clearErrorAction,
} from './types';
import { EntityType } from 'src/types/common';

export const loadContacts = (contacts: ContactDto[]): contactsLoadAction => ({
  type: CONTACTS_LOAD,
  payload: contacts,
});

export const loadFavorites = (favorites: FavoriteContactsDto): favoritesLoadAction => ({
  type: FAVORITES_LOAD,
  payload: favorites,
});

export const loadGroups = (groups: GroupContactsDto[]): groupsLoadAction => ({
  type: GROUPS_LOAD,
  payload: groups,
});

export const startLoading = (): loadingStartAction => ({
  type: LOADING_START,
});

export const endLoading = (): loadingEndAction => ({
  type: LOADING_END,
});

export const setError = (entity: EntityType, message: string): setErrorAction => ({
  type: SET_ERROR,
  payload: {
    entity,
    message,
  },
});

export const clearError = (entity: EntityType): clearErrorAction => ({
  type: CLEAR_ERROR,
  payload: {
    entity,
  },
});
