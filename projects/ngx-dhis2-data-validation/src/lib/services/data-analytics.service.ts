import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataAnalyticsService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private http: HttpClient
  ) {}

  getValidationData(dimension): Observable<any> {
    return this.httpClient.get(
      'dataAnalysis/validationRulesExpression?validationRuleId=' +
        dimension.validationRuleId +
        '&periodId=' +
        dimension.periodId +
        '&organisationUnitId=' +
        dimension.organisationUnitId
    );
  }
}
