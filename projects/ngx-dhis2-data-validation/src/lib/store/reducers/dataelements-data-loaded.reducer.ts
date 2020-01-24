import { createReducer, on } from '@ngrx/store';
import {
  initialDataElementsDataLoadedState,
  dataElementsDataLoadedAdapter
} from '../states/dataelements-data-loaded.states';
import { addLoadedDataIdentifier, checkIfAnalyticsIsDone } from '../actions';

export const reducer = createReducer(
  initialDataElementsDataLoadedState,
  on(addLoadedDataIdentifier, (state, { loadedDataIdentifier }) =>
    dataElementsDataLoadedAdapter.addOne(loadedDataIdentifier, { ...state })
  ),
  on(checkIfAnalyticsIsDone, state => ({
    ...state
  }))
);

export function checkDataElementsDataLoadedReducer(state, action) {
  return reducer(state, action);
}
