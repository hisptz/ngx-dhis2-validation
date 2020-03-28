import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { operators } from '../../../../constants';
import { dateDictionary } from '../../../../constants';

@Component({
  selector: 'app-validation-rule-violation',
  templateUrl: './validation-rule-violation.component.html',
  styleUrls: ['./validation-rule-violation.component.css']
})
export class ValidationRuleViolationComponent implements OnInit {
  @Input() validationDetails: any;
  @Input() period: string;
  @Input() selectedOuForViolations: any;
  @Input() marginTop: string;
  @Output() showValidationRuleViolationModal = new EventEmitter<boolean>();
  possibleViolatedRules: Array<any> = [];
  leftSideValues: any = {}; // for storing leftside values for violated rules
  rightSideValues: any = {}; // for storing rightside values for violated rules
  showMoreDetails: Boolean = false;
  selectedPeriod: string;

  constructor() {}

  ngOnInit() {}

  removeSpecialChars(expression) {
    return expression
      .replace(/#/g, '')
      .replace(/{/g, '')
      .replace(/}/g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '');
  }

  splitExpressionToGetDataElements(expression) {
    return expression
      .replace(/#/g, '')
      .replace(/{/g, '')
      .replace(/}/g, '')
      .replace(/\(/g, '+')
      .replace(/\)/g, '+')
      .replace(/\-/g, '+')
      .replace(/\*/g, '+');
  }

  unSetModal(e) {
    this.showValidationRuleViolationModal.emit(false);
  }

  getOperator(rule) {
    return operators[rule.operator];
  }

  toggleMoreInformation() {
    this.showMoreDetails = !this.showMoreDetails;
  }
}
