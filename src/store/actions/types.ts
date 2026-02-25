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
import { EntityType } from 'src/types/common';

export type contactsLoadAction = {
  type: typeof CONTACTS_LOAD;
  payload: ContactDto[];
};

export type favoritesLoadAction = {
  type: typeof FAVORITES_LOAD;
  payload: FavoriteContactsDto;
};

export type groupsLoadAction = {
  type: typeof GROUPS_LOAD;
  payload: GroupContactsDto[];
};

export type loadingStartAction = {
  type: typeof LOADING_START;
};

export type loadingEndAction = {
  type: typeof LOADING_END;
};

export type setErrorAction = {
  type: typeof SET_ERROR;
  payload: {
    entity: EntityType;
    message: string;
  };
};

export type clearErrorAction = {
  type: typeof CLEAR_ERROR;
  payload: {
    entity: EntityType;
  };
};

export type ProjectActions =
  | contactsLoadAction
  | favoritesLoadAction
  | groupsLoadAction
  | loadingStartAction
  | loadingEndAction
  | setErrorAction
  | clearErrorAction;
