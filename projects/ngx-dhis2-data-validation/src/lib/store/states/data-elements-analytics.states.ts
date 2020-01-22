import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface DataElementsAnalyticsState extends EntityState<any> {
  loading: Boolean;
  loaded: Boolean;
}

export const dataElementsAnalyticsAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialDataElementsAnalyticsState = dataElementsAnalyticsAdapter.getInitialState(
  {
    loading: false,
    loaded: false
  }
);
