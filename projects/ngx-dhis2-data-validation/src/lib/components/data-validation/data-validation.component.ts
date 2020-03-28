import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';

import { createValidationDimensions } from '../../helpers';
import { ValidationDataState } from '../../store/states/data-validation.states';
import { loadValidationData, loadValidationRules } from '../../store/actions';
import { Observable } from 'rxjs';
import { getLoadedValidationRules } from '../../store/selectors/data-validation.selectors';

@Component({
  selector: 'ngx-data-validation',
  templateUrl: './data-validation.component.html',
  styleUrls: ['./data-validation.component.css']
})
export class DataValidationComponent implements OnInit {
  @Input() validationRules: any;
  @Input() dataElements: any;
  @Input() organisationUnits: any;
  @Input() indicator: any;
  @Input() indicatorDataElements: any;
  @Input() childrenOus: any;
  @Input() parentOu: any;
  @Input() validationPeriods: any;
  @Input() currentValidationPeriod: any;
  @Input() period: any;
  @Input() dataElementsDataDimensions: Array<any> = [];
  @Input() dateDictionary: any;
  @Input() marginTopViolation: string;
  @Input() violationBgrColor: string;
  @Input() discrepancyBgrColor: string;
  @Input() successBgrColor: string;
  validationDimensions: Array<any> = [];
  validationRules$: Observable<any>;
  constructor(private store: Store<ValidationDataState>) {}

  ngOnInit() {
    if (this.validationPeriods && this.childrenOus) {
      // Create dimensions for loading data for the current period
      this.validationDimensions = createValidationDimensions(
        this.childrenOus,
        this.currentValidationPeriod,
        this.validationRules
      );
      this.store.dispatch(
        loadValidationRules({ validationRulesIds: this.validationRules })
      );
      this.validationRules$ = this.store.select(getLoadedValidationRules);
    }
  }
}
