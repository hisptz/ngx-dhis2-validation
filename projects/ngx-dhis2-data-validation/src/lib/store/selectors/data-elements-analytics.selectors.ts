import { MemoizedSelector, createFeatureSelector } from '@ngrx/store';
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
