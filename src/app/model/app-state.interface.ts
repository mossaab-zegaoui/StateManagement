export enum ProductState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

export interface AppState<T> {
  state?: ProductState;
  data?: T;
  errorMessage?: string;
}

export enum ProductActionsType {
  GET_ALL_PRODUCTS,
  GET_SELECTED_PRODUCTS,
  SELECT_PRODUCT,
  ADD_NEW_PRODUCT,
  SAVE_NEW_PRODUCT,
  EDIT_PRODUCT,
  SEARCH_PRODUCTS,
  DELETE_PRODUCT,
}
export interface ProductAction {
  type: ProductActionsType;
  payload?: any;
}
