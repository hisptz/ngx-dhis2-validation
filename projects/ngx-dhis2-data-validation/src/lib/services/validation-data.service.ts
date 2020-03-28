import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { from, Observable, forkJoin } from 'rxjs';
import {
  mergeMap,
  map,
  timestamp,
  concatMap,
  last,
  toArray
} from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { interval } from 'rxjs';

declare var require: any;
var async = require('async');

@Injectable({
  providedIn: 'root'
})
export class ValidationDataService {
  loadValidationRules(ids): Observable<any> {
    return this.httpClient.get(
      'validationRules.json?fields=id,name,operator,leftSide,rightSide&filter=id:in:[' +
        ids.join(',') +
        ']'
    );
  }

  getData(dataDimensions) {
    const countOfIntervals = interval(2000);
    countOfIntervals.subscribe((count: number) => {
      if (count < dataDimensions.length / 4) {
        return from(dataDimensions.slice(4 * count, 4 * (count + 1))).pipe(
          mergeMap(
            (dimension: any) => {
              return this.httpClient
                .get(
                  'dataAnalysis/validationRulesExpression?validationRuleId=' +
                    dimension.validationRuleId +
                    '&periodId=' +
                    dimension.periodId +
                    '&organisationUnitId=' +
                    dimension.organisationUnitId
                )
                .pipe(
                  map((data: any) => {
                    return {
                      id:
                        dimension.validationRuleId +
                        '-' +
                        dimension.periodId +
                        '-' +
                        dimension.organisationUnitId,
                      data: data
                    };
                  })
                );
            },
            null,
            4
          )
        );
      }
    });
    // async.mapLimit([1, 2, 3, 4, 5, 6], 2, async (datas: any) => {
    //   console.log('323423', datas);
    // });
    // async.mapLimit(
    //   dataDimensions,
    //   30,
    //   async partOfDimension => {
    //     console.log(partOfDimension);
    //     const response = await this.fetchData(
    //       'dataAnalysis/validationRulesExpression?validationRuleId=' +
    //         partOfDimension.validationRuleId +
    //         '&periodId=' +
    //         partOfDimension.periodId +
    //         '&organisationUnitId=' +
    //         partOfDimension.organisationUnitId
    //     );
    //     return response['body'];
    //   },
    //   (err, results) => {
    //     if (err) throw err;
    //     // results is now an array of the response bodies
    //     console.log('results', results);
    //   }
    // );
  }

  getValidationData(dimensions): Observable<any> {
    return from(dimensions).pipe(
      mergeMap(
        (dimension: any) => {
          return this.httpClient
            .get(
              'dataAnalysis/validationRulesExpression?validationRuleId=' +
                dimension.validationRuleId +
                '&periodId=' +
                dimension.periodId +
                '&organisationUnitId=' +
                dimension.organisationUnitId
            )
            .pipe(
              map((data: any) => {
                return {
                  id:
                    dimension.validationRuleId +
                    '-' +
                    dimension.periodId +
                    '-' +
                    dimension.organisationUnitId,
                  data: data
                };
              })
            );
        },
        null,
        4
      )
    );
  }

  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
