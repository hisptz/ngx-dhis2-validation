import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataElementState } from '@iapps/ngx-dhis2-data-filter/lib/store/reducers/data-element.reducer';
import { getDataElementsAnalytics, checkIfAnalyticsIsDone } from '../actions';
import { withLatestFrom, map } from 'rxjs/operators';

@Injectable()
export class CheckDataLoadedEffects {
  checkLoadedData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(checkIfAnalyticsIsDone),
        withLatestFrom(this.store),
        map(([action, state]: [any, any]) => {
          if (
            state &&
            state.loadedDataElementsData &&
            state.loadedDataElementsData.entities[action.dimensions.id]
          ) {
            return state.loadedDataElementsData.entities[action.dimensions.id];
          } else {
            console.log('about to load');
            this.store.dispatch(
              getDataElementsAnalytics({
                dataDimensions: action.dimensions.dataDimensions
              })
            );
          }
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private store: Store<DataElementState>
  ) {}
}
