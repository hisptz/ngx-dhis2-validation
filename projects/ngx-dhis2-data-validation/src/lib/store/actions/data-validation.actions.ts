import { createAction, props } from '@ngrx/store';

export const loadValidationData = createAction(
  '[Validation data] load data for validation',
  props<{ dataDimensions: Array<any> }>()
);

export const addLoadedDataForValidation = createAction(
  '[Validation data] add loaded data',
  props<{ data: any }>()
);

export const loadingValidationDataFail = createAction(
  '[Validation data] loading data for validation failed',
  props<{ error: any }>()
);
