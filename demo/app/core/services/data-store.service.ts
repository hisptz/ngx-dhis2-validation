import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getDashboards(): Observable<any> {
    return this.httpClient.get('dataStore/data-quality-dashboards/NACP');
  }
}
