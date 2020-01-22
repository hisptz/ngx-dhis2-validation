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
  @Output() showValidationRuleViolationModal = new EventEmitter<boolean>();
  possibleViolatedRules: Array<any> = [];
  tableColumns: any = {};
  leftColumns: Array<any> = [];
  rightColumns: Array<any> = [];
  tableRows: any = {};
  leftRows: Array<any> = [];
  rightRows: Array<any> = [];
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

            const formulaPattern = /#\{.+?\}/g;
            _.map(
              validationRule.leftSide.expression.match(formulaPattern),
              matchedItem => {
                leftSideElements.push(matchedItem.replace(/[#\{\}]/g, ''));
              }
            );
            _.map(
              validationRule.rightSide.expression.match(formulaPattern),
              matchedItem => {
                rightSideElements.push(matchedItem.replace(/[#\{\}]/g, ''));
              }
            );
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
}
