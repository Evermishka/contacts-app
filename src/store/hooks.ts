import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from './store';
import { ProjectActions } from './actions';

export const useAppDispatch = useDispatch<Dispatch<ProjectActions>>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppStore = useStore<RootState>;
