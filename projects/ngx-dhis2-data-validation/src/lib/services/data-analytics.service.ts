import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataAnalyticsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getDataElementsData(dimension): Observable<any> {
    return this.httpClient.get(
      'analytics?dimension=pe:' +
        dimension.period +
        '&dimension=dx:' +
        dimension.dataElements.join(';') +
        '&dimension=ou:' +
        dimension.organisationUnits.join(';') +
        '&displayProperty=NAME&skipMeta=false&includeNumDen=false'
    );
  }
}
