import { createReducer, on } from '@ngrx/store';
import {
  initialDataElementsAnalyticsState,
  dataElementsAnalyticsAdapter
} from '../states/data-elements-analytics.states';
import {
  getDataElementsAnalytics,
  addLoadedDataElementsAnalytics
} from '../actions';

export const reducer = createReducer(
  initialDataElementsAnalyticsState,
  on(getDataElementsAnalytics, state => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(addLoadedDataElementsAnalytics, (state, { data }) =>
    dataElementsAnalyticsAdapter.addOne(data, {
      ...state,
      loading: false,
      loaded: true
    })
  )
);

export function dataElementsAnalyticsReducer(state, action) {
  return reducer(state, action);
}
