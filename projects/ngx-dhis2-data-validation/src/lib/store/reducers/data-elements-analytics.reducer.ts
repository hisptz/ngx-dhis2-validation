import { createReducer, on } from '@ngrx/store';
import {
  initialDataElementsAnalyticsState,
  dataElementsAnalyticsAdapter
} from '../states/data-elements-analytics.states';
import {
  getDataElementsAnalytics,
  addLoadedDataElementsAnalytics,
  loadingDataElementsDataFail
} from '../actions';

export const reducer = createReducer(
  initialDataElementsAnalyticsState,
  on(getDataElementsAnalytics, (state, { dataDimensions }) => ({
    ...state,
    loading: true,
    loaded: false,
    hasError: false,
    expectedAnalyticsCount: dataDimensions.length,
    loadedAnalytics: 0
  })),
  on(addLoadedDataElementsAnalytics, (state, { data }) =>
    dataElementsAnalyticsAdapter.addOne(data, {
      ...state,
      loading: false,
      loaded: true,
      hasError: false,
      loadedAnalytics: state.loadedAnalytics + 1
    })
  ),
  on(loadingDataElementsDataFail, (state, { error }) => ({
    ...state,
    error: error,
    loaded: true,
    loading: false,
    hasError: true,
    loadedAnalytics: state.loadedAnalytics + 1
  }))
);

export function dataElementsAnalyticsReducer(state, action) {
  return reducer(state, action);
}
