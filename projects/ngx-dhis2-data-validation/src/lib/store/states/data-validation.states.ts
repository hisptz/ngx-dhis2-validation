import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ValidationDataState extends EntityState<any> {
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  countOfLoadedDataAnalysis: number;
  expectedCount: number;
  error: any;
  validationRules: Array<any>;
  loadingValidationRules: boolean;
  loadedValidationRules: boolean;
  validationRuleLoadingError: any;
  keysForCheckingLoadedDimensions: Array<string>;
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
    error: null,
    validationRules: [],
    loadingValidationRules: false,
    loadedValidationRules: false,
    validationRuleLoadingError: null,
    keysForCheckingLoadedDimensions: []
  }
);
