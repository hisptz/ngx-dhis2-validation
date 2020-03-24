import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';

import { createValidationDimensions } from '../../helpers';
import { ValidationDataState } from '../../store/states/data-validation.states';
import { loadValidationData } from '../../store/actions';

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
  @Input() analyticsPeriods: any;
  @Input() period: any;
  @Input() dataElementsDataDimensions: Array<any> = [];
  @Input() dateDictionary: any;
  @Input() marginTopViolation: string;
  @Input() violationBgrColor: string;
  @Input() discrepancyBgrColor: string;
  @Input() successBgrColor: string;
  validationDimensions: Array<any> = [];
  constructor(private store: Store<ValidationDataState>) {}

  ngOnInit() {
    if (this.analyticsPeriods && this.childrenOus) {
      console.log(this.validationRules);
      this.validationDimensions = createValidationDimensions(
        this.childrenOus,
        this.analyticsPeriods,
        this.validationRules
      );
      this.store.dispatch(
        loadValidationData({ dataDimensions: this.validationDimensions })
      );
    }
  }
}
