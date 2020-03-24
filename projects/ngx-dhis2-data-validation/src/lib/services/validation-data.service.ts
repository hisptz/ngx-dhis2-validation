import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { from, Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class ValidationDataService {
  // getValidationDatall(dimensions: any[]): Observable<any> {
  //   return from(dimensions).pipe(
  //     mergeMap((dimension: any, index: number) => {
  //       return (
  //         <Observable<any>>(
  //           this.httpClient
  //             .get(
  //               'dataAnalysis/validationRulesExpression?validationRuleId=' +
  //                 dimension.validationRuleId +
  //                 '&periodId=' +
  //                 dimension.periodId +
  //                 '&organisationUnitId=' +
  //                 dimension.organisationUnitId
  //             )
  //             .pipe(map((validationData: any) => validationData))
  //         ),
  //         10
  //       );
  //     })
  //   );
  // }

  getValidationData(dimensions): Observable<any> {
    return from(dimensions).pipe(
      mergeMap((dimension: any, index) => {
        const url =
          'dataAnalysis/validationRulesExpression?validationRuleId=' +
          dimension.validationRuleId +
          '&periodId=' +
          dimension.periodId +
          '&organisationUnitId=' +
          dimension.organisationUnitId;
        return <Observable<any>>this.httpClient.get(url);
      }, 3)
    );
  }

  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
