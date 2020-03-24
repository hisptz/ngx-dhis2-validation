import { createReducer, on } from '@ngrx/store';
import {
  initialDataElementsAnalyticsState,
  validationDataAdapter
} from '../states/data-validation.states';
import {
  loadValidationData,
  addLoadedDataForValidation,
  loadingValidationDataFail
} from '../actions';

export const reducer = createReducer(
  initialDataElementsAnalyticsState,
  on(loadValidationData, (state, { dataDimensions }) => ({
    ...state,
    loading: true,
    loaded: false,
    hasError: false,
    expectedCount: dataDimensions.length,
    countOfLoadedDataAnalysis: 0
  })),
  on(addLoadedDataForValidation, (state, { data }) =>
    validationDataAdapter.addOne(data, {
      ...state,
      loading: false,
      loaded: true,
      hasError: false,
      countOfLoadedDataAnalysis: state.countOfLoadedDataAnalysis + 1
    })
  ),
  on(loadingValidationDataFail, (state, { error }) => ({
    ...state,
    error: error,
    loaded: true,
    loading: false,
    hasError: true,
    loadedAnalytics: state.countOfLoadedDataAnalysis + 1
  }))
);

export function validationDataReducer(state, action) {
  return reducer(state, action);
}
