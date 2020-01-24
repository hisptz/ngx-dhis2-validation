import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface DataElementsDataLoadedState extends EntityState<any> {}

export const dataElementsDataLoadedAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialDataElementsDataLoadedState = dataElementsDataLoadedAdapter.getInitialState(
  {}
);
