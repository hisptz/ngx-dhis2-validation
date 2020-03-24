import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ValidationDataState extends EntityState<any> {
  loading: Boolean;
  loaded: Boolean;
  hasError: Boolean;
  countOfLoadedDataAnalysis: number;
  expectedCount: number;
  error: any;
}

export const validationDataAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialDataElementsAnalyticsState = validationDataAdapter.getInitialState(
  {
    loading: false,
    loaded: false,
    hasError: false,
    countOfLoadedDataAnalysis: 0,
    expectedCount: 0,
    error: null
  }
);
