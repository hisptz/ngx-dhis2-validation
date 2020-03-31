import { Injectable } from '@angular/core';
import { DataAnalyticsService } from '../../services/data-analytics.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import {
  switchMap,
  mergeMap,
  map,
  catchError,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { from, of, interval } from 'rxjs';
import {
  loadValidationData,
  addLoadedDataForValidation,
  loadValidationRules,
  addLoadedValidationRules,
  loadingValidationRulesFail,
  addDimensionsForLoadedData,
  addPercentLoadedData
} from '../actions';
import { ValidationDataService } from '../../services/validation-data.service';
import { Store } from '@ngrx/store';
import { ValidationDataState } from '../states/data-validation.states';
import { createValidationObject } from '../../helpers';
import { getDimensionsForLoadedData } from '../selectors/data-validation.selectors';

@Injectable()
export class ValidationDataEffects {
  validationRules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadValidationRules),
      switchMap(({ validationRulesIds }) =>
        this.validationDataService.loadValidationRules(validationRulesIds).pipe(
          map(validationRules =>
            addLoadedValidationRules({
              validationRules: validationRules['validationRules']
            })
          ),
          catchError(error => of(loadingValidationRulesFail({ error })))
        )
      )
    )
  );

  loadedDataElementsAnalytics$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadValidationData),
        withLatestFrom(this.store.select(getDimensionsForLoadedData)),
        tap(([action, loadedDimensions]: [any, any]) => {
          if (
            loadedDimensions.indexOf(action.keyForCheckingLoadedDimensions) ==
            -1
          ) {
            let loadedDataCount = 0;
            const expectedDataToLoad = action.dataDimensions.length;
            const countOfIntervals = interval(2000);
            this.store.dispatch(
              addDimensionsForLoadedData({
                dimensionsForLoadedData: action.keyForCheckingLoadedDimensions
              })
            );
            countOfIntervals.subscribe((count: number) => {
              if (count < action.dataDimensions.length / 4) {
                this.validationDataService
                  .getValidationData(
                    action.dataDimensions.slice(4 * count, 4 * (count + 1))
                  )
                  .subscribe(data => {
                    let percentObject = {};
                    loadedDataCount += 1;
                    const percentOfLoadedData =
                      (loadedDataCount / expectedDataToLoad) * 100;
                    const key = data.id.split('-')[1];
                    percentObject[key] = percentOfLoadedData;
                    const formattedViolationData = createValidationObject(
                      action.validationRules,
                      data
                    );
                    this.store.dispatch(
                      addLoadedDataForValidation({
                        data: formattedViolationData
                      })
                    );
                    this.store.dispatch(
                      addPercentLoadedData({
                        percentOfLoadedData: percentObject
                      })
                    );
                  });
              }
            });
          }
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private validationDataService: ValidationDataService,
    private store: Store<ValidationDataState>
  ) {}
}
