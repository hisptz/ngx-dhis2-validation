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
  @Input() storedViolations: any;
  @Input() period: string;
  @Input() allData: any;
  @Input() selectedOuForViolations: any;
  @Input() marginTop: string;
  @Output() showValidationRuleViolationModal = new EventEmitter<boolean>();
  possibleViolatedRules: Array<any> = [];
  leftSideValues: any = {}; // for storing leftside values for violated rules
  rightSideValues: any = {}; // for storing rightside values for violated rules
  showMoreDetails: Boolean = false;
  selectedPeriod: string;

  constructor() {}

  ngOnInit() {
    if (this.allData) {
      this.selectedPeriod =
        dateDictionary[this.period.slice(4)] + ' ' + this.period.slice(0, 4);
      _.map(
        Object.keys(this.allData.validationViolations.violatedRules),
        key => {
          if (
            this.allData.validationViolations.violatedRulesByOu[
              key + '-' + this.selectedOuForViolations.id
            ]
          ) {
            const validationRule = this.allData.validationViolations
              .violatedRulesByOu[key + '-' + this.selectedOuForViolations.id];
            this.possibleViolatedRules.push(validationRule);
            let leftSideExpression = validationRule.leftSide.expression;
            let rightSideExpression = validationRule.rightSide.expression;

            const formulaPattern = /#\{.+?\}/g;
            _.map(
              validationRule.leftSide.expression.match(formulaPattern),
              matchedItem => {
                leftSideExpression = this.allData.rowsData[
                  this.selectedOuForViolations.id +
                    '-' +
                    matchedItem.replace(/[#\{\}]/g, '') +
                    '-' +
                    this.period
                ]
                  ? leftSideExpression.replace(
                      matchedItem,
                      this.allData.rowsData[
                        this.selectedOuForViolations.id +
                          '-' +
                          matchedItem.replace(/[#\{\}]/g, '') +
                          '-' +
                          this.period
                      ]
                    )
                  : leftSideExpression.replace(matchedItem, 0);
              }
            );
            _.map(
              validationRule.rightSide.expression.match(formulaPattern),
              matchedItem => {
                rightSideExpression = this.allData.rowsData[
                  this.selectedOuForViolations.id +
                    '-' +
                    matchedItem.replace(/[#\{\}]/g, '') +
                    '-' +
                    this.period
                ]
                  ? rightSideExpression.replace(
                      matchedItem,
                      this.allData.rowsData[
                        this.selectedOuForViolations.id +
                          '-' +
                          matchedItem.replace(/[#\{\}]/g, '') +
                          '-' +
                          this.period
                      ]
                    )
                  : rightSideExpression.replace(matchedItem, 0);
              }
            );
            this.leftSideValues[validationRule.id + '-left'] = eval(
              leftSideExpression
            )
              ? eval(leftSideExpression)
              : 0;
            this.rightSideValues[validationRule.id + '-right'] = eval(
              rightSideExpression
            )
              ? eval(rightSideExpression)
              : 0;
          }
        }
      );
    }
  }

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
