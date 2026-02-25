import { ContactDto } from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { ProjectActions } from './actions';
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';

const initialContactsState: ContactDto[] = DATA_CONTACT;
const initialFavoritesState: FavoriteContactsDto = [
  DATA_CONTACT[0].id,
  DATA_CONTACT[1].id,
  DATA_CONTACT[2].id,
  DATA_CONTACT[3].id,
];
const initialGroupsState: GroupContactsDto[] = DATA_GROUP_CONTACT;

export const contactsReducer = (
  state = initialContactsState,
  action: ProjectActions
): ContactDto[] => {
  switch (action.type) {
    default:
      return state;
  }
};

export const favoritesReducer = (
  state = initialFavoritesState,
  action: ProjectActions
): FavoriteContactsDto => {
  switch (action.type) {
    default:
      return state;
  }
};

export const groupsReducer = (
  state = initialGroupsState,
  action: ProjectActions
): GroupContactsDto[] => {
  switch (action.type) {
    default:
      return state;
  }
};
