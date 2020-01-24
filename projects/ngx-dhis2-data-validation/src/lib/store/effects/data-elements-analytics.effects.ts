import { Injectable } from '@angular/core';
import { DataAnalyticsService } from '../../services/data-analytics.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  getDataElementsAnalytics,
  addLoadedDataElementsAnalytics,
  loadingDataElementsDataFail
} from '../actions';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

@Injectable()
export class DataElementsAnalyticsEffects {
  loadedDataElementsAnalytics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDataElementsAnalytics),
      switchMap(({ dataDimensions }) =>
        from(dataDimensions).pipe(
          mergeMap(dimension =>
            this.analyticsService.getDataElementsData(dimension).pipe(
              map((data: any) => {
                return addLoadedDataElementsAnalytics({
                  data: {
                    id:
                      dimension.indicatorId +
                      '-' +
                      dimension.parentOuId +
                      '-' +
                      dimension.period,
                    data: data
                  }
                });
              }),
              catchError(error => of(loadingDataElementsDataFail({ error })))
            )
          )
        )
      )
    )
  );
  constructor(
    private analyticsService: DataAnalyticsService,
    private actions$: Actions
  ) {}
}
