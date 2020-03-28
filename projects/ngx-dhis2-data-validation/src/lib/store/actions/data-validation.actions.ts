import { createAction, props } from '@ngrx/store';

export const loadValidationRules = createAction(
  '[Validation rules] load validation rules',
  props<{ validationRulesIds: Array<any> }>()
);
export const loadValidationData = createAction(
  '[Validation data] load data for validation',
  props<{
    dataDimensions: Array<any>;
    validationRules: any;
    keyForCheckingLoadedDimensions: string;
  }>()
);

export const addLoadedValidationRules = createAction(
  '[Validation rules] add loaded validation rules',
  props<{ validationRules: any }>()
);

export const addLoadedDataForValidation = createAction(
  '[Validation data] add loaded data',
  props<{ data: any }>()
);

export const loadingValidationRulesFail = createAction(
  '[Validation rules] loading validation rules fail',
  props<{ error: any }>()
);

export const addDimensionsForLoadedData = createAction(
  '[Data dimensions] add data dimensions triggered',
  props<{ dimensionsForLoadedData: any }>()
);

export const loadingValidationDataFail = createAction(
  '[Validation data] loading data for validation failed',
  props<{ error: any }>()
);
