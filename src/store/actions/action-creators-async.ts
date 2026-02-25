import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';
import { RootState } from '../store';
import {
  startLoading,
  clearError,
  setError,
  endLoading,
  loadContacts,
  loadGroups,
  loadFavorites,
} from './action-creators';
import { ThunkAction } from 'redux-thunk';
import { ProjectActions } from './types';

export const loadContactsAsync = (): ThunkAction<void, RootState, void, ProjectActions> => {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError('contacts'));

    // Имитация загрузки с сервера
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1 + Math.random() * 0.1; // 10-20% вероятность ошибки

      if (shouldFail) {
        dispatch(setError('contacts', 'Не удалось загрузить контакты. Попробуйте еще раз.'));
        dispatch(endLoading());
      } else {
        dispatch(loadContacts(DATA_CONTACT));
        dispatch(endLoading());
      }
    }, 1000); // 1 секунда задержки
  };
};

export const loadFavoritesAsync = (): ThunkAction<void, RootState, void, ProjectActions> => {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError('favorites'));

    // Имитация загрузки с сервера
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1 + Math.random() * 0.1; // 10-20% вероятность ошибки

      if (shouldFail) {
        dispatch(setError('favorites', 'Не удалось загрузить избранное. Попробуйте еще раз.'));
        dispatch(endLoading());
      } else {
        dispatch(
          loadFavorites([
            DATA_CONTACT[0].id,
            DATA_CONTACT[1].id,
            DATA_CONTACT[2].id,
            DATA_CONTACT[3].id,
          ])
        );
        dispatch(endLoading());
      }
    }, 800); // 0.8 секунды задержки
  };
};

export const loadGroupsAsync = (): ThunkAction<void, RootState, void, ProjectActions> => {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(clearError('groups'));

    // Имитация загрузки с сервера
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1 + Math.random() * 0.1; // 10-20% вероятность ошибки

      if (shouldFail) {
        dispatch(setError('groups', 'Не удалось загрузить группы. Попробуйте еще раз.'));
        dispatch(endLoading());
      } else {
        dispatch(loadGroups(DATA_GROUP_CONTACT));
        dispatch(endLoading());
      }
    }, 1500); // 1.5 секунды задержки
  };
};

export const reloadContactsAsync = (): ThunkAction<void, RootState, void, ProjectActions> => {
  return (dispatch) => {
    dispatch(loadContactsAsync());
  };
};

export const reloadFavoritesAsync = (): ThunkAction<void, RootState, void, ProjectActions> => {
  return (dispatch) => {
    dispatch(loadFavoritesAsync());
  };
};

export const reloadGroupsAsync = (): ThunkAction<void, RootState, void, ProjectActions> => {
  return (dispatch) => {
    dispatch(loadGroupsAsync());
  };
};
