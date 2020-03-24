import { Injectable } from '@angular/core';
import { DataAnalyticsService } from '../../services/data-analytics.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { switchMap, mergeMap, map, catchError, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  loadValidationData,
  addLoadedDataForValidation,
  loadingValidationDataFail
} from '../actions';
import { ValidationDataService } from '../../services/validation-data.service';

@Injectable()
export class ValidationDataEffects {
  loadedDataElementsAnalytics$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadValidationData),
        tap(({ dataDimensions }) =>
          this.validationDataService
            .getValidationData(dataDimensions)
            .subscribe((data: any) => console.log('data', data))
        )
      ),
    { dispatch: false }
  );
  constructor(
    private analyticsService: DataAnalyticsService,
    private actions$: Actions,
    private validationDataService: ValidationDataService
  ) {}
}
