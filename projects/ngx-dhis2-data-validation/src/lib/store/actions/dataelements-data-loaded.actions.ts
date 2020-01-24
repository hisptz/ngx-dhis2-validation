import { createAction, props } from '@ngrx/store';

export const checkIfAnalyticsIsDone = createAction(
  '[data elements data check] check if data elements are loaded',
  props<{ dimensions: any }>()
);

export const addLoadedDataIdentifier = createAction(
  '[data elements data check] add loadedDataIdentifier',
  props<{ loadedDataIdentifier: any }>()
);
