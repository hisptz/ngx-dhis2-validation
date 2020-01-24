import { createAction, props } from '@ngrx/store';

export const getDataElementsAnalytics = createAction(
  '[data elements] load data elements data',
  props<{ dataDimensions: Array<any> }>()
);

export const addLoadedDataElementsAnalytics = createAction(
  '[data elements] add analytics data',
  props<{ data: any }>()
);

export const loadingDataElementsDataFail = createAction(
  '[data elements] loading data elements failed',
  props<{ error: any }>()
);
