export interface EntityState {
  loading: boolean;
  error: boolean;
  errorMessage?: string;
}

export interface UIState {
  contacts: EntityState;
  favorites: EntityState;
  groups: EntityState;
}

export type EntityType = 'contacts' | 'favorites' | 'groups';
