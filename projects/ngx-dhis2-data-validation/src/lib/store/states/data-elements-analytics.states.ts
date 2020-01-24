import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface DataElementsAnalyticsState extends EntityState<any> {
  loading: Boolean;
  loaded: Boolean;
  hasError: Boolean;
  expectedAnalyticsCount: number;
  loadedAnalytics: number;
  error: any;
}

export const dataElementsAnalyticsAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialDataElementsAnalyticsState = dataElementsAnalyticsAdapter.getInitialState(
  {
    loading: false,
    loaded: false,
    hasError: false,
    expectedAnalyticsCount: 0,
    loadedAnalytics: 0,
    error: null
  }
);
