import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { operators } from '../../../../constants';

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
  tableColumns: any = {};
  leftColumns: Array<any> = [];
  rightColumns: Array<any> = [];
  tableRows: any = {};
  leftRows: Array<any> = [];
  rightRows: Array<any> = [];
  leftSideValues: any = {}; // for storing leftside values for violated rules
  rightSideValues: any = {}; // for storing rightside values for violated rules
  showMoreDetails: Boolean = false;

  constructor() {}

  ngOnInit() {
    if (this.allData) {
      let newTableColumn = {};
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
            this.leftColumns = [];
            this.rightColumns = [];
            this.leftRows = [];
            this.rightRows = [];
            let leftSideElements = [];
            let rightSideElements = [];
            let leftSideExpression = validationRule.leftSide.expression;
            let rightSideExpression = validationRule.rightSide.expression;

            const formulaPattern = /#\{.+?\}/g;
            _.map(
              validationRule.leftSide.expression.match(formulaPattern),
              matchedItem => {
                leftSideElements.push(matchedItem.replace(/[#\{\}]/g, ''));
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
                rightSideElements.push(matchedItem.replace(/[#\{\}]/g, ''));
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
            leftSideElements.forEach(item => {
              if (
                this.allData.metaDataItems &&
                this.allData.metaDataItems[item]
              ) {
                this.leftColumns.push(this.allData.metaDataItems[item].name);
              }
              if (
                this.allData.rowsData[
                  this.selectedOuForViolations.id +
                    '-' +
                    item +
                    '-' +
                    this.period
                ]
              ) {
                this.leftRows.push(
                  this.allData.rowsData[
                    this.selectedOuForViolations.id +
                      '-' +
                      item +
                      '-' +
                      this.period
                  ]
                );
              } else {
                this.leftRows.push('');
              }
            });
            rightSideElements.forEach(item => {
              this.rightColumns.push(this.allData.metaDataItems[item].name);
              if (
                this.allData.rowsData[
                  this.selectedOuForViolations.id +
                    '-' +
                    item +
                    '-' +
                    this.period
                ]
              ) {
                this.rightRows.push(
                  this.allData.rowsData[
                    this.selectedOuForViolations.id +
                      '-' +
                      item +
                      '-' +
                      this.period
                  ]
                );
              } else {
                this.rightRows.push('');
              }
            });
            this.tableColumns[validationRule.id] = {
              leftColumns: this.leftColumns,
              rightColumns: this.rightColumns
            };

            this.tableRows[validationRule.id] = {
              left: this.leftRows,
              right: this.rightRows
            };
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

  toggleMoreInformation(ruleId) {
    this.showMoreDetails = !this.showMoreDetails;
  }
}
