import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { dateDictionary } from '../../../constants';
import { Store } from '@ngrx/store';
import { ValidationDataState } from '../../../store/states/data-validation.states';
import { loadValidationData } from '../../../store/actions';
import { Observable } from 'rxjs';
import { getValidationDataEntities } from '../../../store/selectors/data-validation.selectors';
import {
  createValidationHeaders,
  getValidationRulesIds,
  createValidationDimensions
} from '../../../helpers';

@Component({
  selector: 'app-data-quality-table',
  templateUrl: './data-quality-table.component.html',
  styleUrls: ['./data-quality-table.component.css']
})
export class DataQualityTableComponent implements OnInit, AfterViewInit {
  @Input() periods: any;
  @Input() validationRules: Array<any>;
  @Input() isTableObjectsListCreated;
  @Input() selectedTableObject;
  @Input() dateDictionary: any;
  @Input() validationDimensions: any;
  @Input() marginTopViolation: string;
  @Input() violationBgrColor: string;
  @Input() organisationUnits: Array<any>;
  @Input() currentValidationPeriod: any;
  validationDetails: any;
  possibleViolatedRules: Array<any>;
  isSelectionForViolationsSet: Boolean = false;
  showValidationRuleViolations: Boolean = false;
  activeTableItem: any;
  validationEntities$: Observable<any>;
  headers: any;
  formattedPeriod: any;
  constructor(private store: Store<ValidationDataState>) {}

  ngOnInit() {
    if (this.validationDimensions) {
      this.activeTableItem = this.currentValidationPeriod;
      this.headers = createValidationHeaders(
        this.periods,
        this.validationRules
      );
      this.store.dispatch(
        loadValidationData({
          dataDimensions: this.validationDimensions,
          validationRules: this.validationRules,
          keyForCheckingLoadedDimensions:
            this.activeTableItem +
            '-' +
            getValidationRulesIds(this.validationRules).join('-')
        })
      );
      this.validationEntities$ = this.store.select(getValidationDataEntities);
    }
  }

  ngAfterViewInit() {
    let element = document.getElementById(this.activeTableItem);
    element.addEventListener('scroll', function() {
      var translate = 'translate(0,' + this.scrollTop + 'px)';
      var myElements = this.querySelectorAll('thead');
      for (var i = 0; i < myElements.length; i++) {
        myElements[i].style.transform = translate;
      }
    });
  }

  setActivePeriod(pe) {
    this.activeTableItem = pe;
    this.validationDimensions = createValidationDimensions(
      this.organisationUnits,
      this.activeTableItem,
      getValidationRulesIds(this.validationRules)
    );
    this.store.dispatch(
      loadValidationData({
        dataDimensions: this.validationDimensions,
        validationRules: this.validationRules,
        keyForCheckingLoadedDimensions:
          this.activeTableItem +
          '-' +
          getValidationRulesIds(this.validationRules).join('-')
      })
    );
    this.validationEntities$ = this.store.select(getValidationDataEntities);
    return pe;
  }

  getFormatedDate(pe) {
    if (pe.length > 4) {
      return {
        period: dateDictionary[pe.substring(4)] + '-' + pe.substring(0, 4)
      };
    } else {
      return { period: pe };
    }
  }

  getDetails(e, key, header) {
    e.stopPropagation();
    this.validationEntities$.subscribe(entities => {
      if (entities) {
        this.validationDetails = {
          data: entities[key]['validationData'],
          validationRule: header['validationRule']
        };
        this.showValidationRuleViolations = true;
      }
    });
    this.formattedPeriod = this.getFormatedDate(this.activeTableItem);
  }

  showValidationRuleViolationModal(e) {
    this.showValidationRuleViolations = e;
  }

  hideValidationModal() {
    console.log('clicked');
    if (this.showValidationRuleViolations == true) {
      this.showValidationRuleViolations = false;
    }
  }
}
