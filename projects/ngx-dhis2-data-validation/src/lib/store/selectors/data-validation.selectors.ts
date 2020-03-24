import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import {
  ValidationDataState,
  validationDataAdapter
} from '../states/data-validation.states';

export const getValidationDataState: MemoizedSelector<
  object,
  ValidationDataState
> = createFeatureSelector<ValidationDataState>('dataElementsAnalytics');

export const {
  selectEntities: getValidationDataEntities,
  selectAll: getValidationData
} = validationDataAdapter.getSelectors(getValidationDataState);

export const getNumberOfAnalyticsDone = createSelector(
  getValidationDataState,
  (state: ValidationDataState) => state.countOfLoadedDataAnalysis
);

export const getExpectedAnalyticsCount = createSelector(
  getValidationDataState,
  (state: ValidationDataState) => state.expectedCount
);
