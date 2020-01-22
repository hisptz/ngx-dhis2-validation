import { Injectable } from '@angular/core';
import { DataAnalyticsService } from '../../services/data-analytics.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  getDataElementsAnalytics,
  addLoadedDataElementsAnalytics
} from '../actions';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { from } from 'rxjs';

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
                console.log('dataaaaaaaaaaa', {
                  id:
                    dimension.indicatorId +
                    '-' +
                    dimension.parentOuId +
                    '-' +
                    dimension.period,
                  data: data
                });
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
              })
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
