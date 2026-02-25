import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';
import { ProjectActions } from './actions';

export const useAppDispatch = useDispatch<ThunkDispatch<RootState, void, ProjectActions>>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppStore = useStore<RootState>;
