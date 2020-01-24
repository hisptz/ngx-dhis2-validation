import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import {
  DataElementsAnalyticsState,
  dataElementsAnalyticsAdapter
} from '../states/data-elements-analytics.states';

export const getDataElementsAnalyticsState: MemoizedSelector<
  object,
  DataElementsAnalyticsState
> = createFeatureSelector<DataElementsAnalyticsState>('dataElementsAnalytics');

export const {
  selectEntities: getDataElementsAnalyticsEntities,
  selectAll: getAllDataElementsAnalytics
} = dataElementsAnalyticsAdapter.getSelectors(getDataElementsAnalyticsState);

export const getNumberOfAnalyticsDone = createSelector(
  getDataElementsAnalyticsState,
  (state: DataElementsAnalyticsState) => state.loadedAnalytics
);

export const getExpectedAnalyticsCount = createSelector(
  getDataElementsAnalyticsState,
  (state: DataElementsAnalyticsState) => state.expectedAnalyticsCount
);
