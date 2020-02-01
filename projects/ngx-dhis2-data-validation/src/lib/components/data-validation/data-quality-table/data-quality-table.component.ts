import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { dateDictionary } from '../../../constants';

@Component({
  selector: 'app-data-quality-table',
  templateUrl: './data-quality-table.component.html',
  styleUrls: ['./data-quality-table.component.css']
})
export class DataQualityTableComponent implements OnInit {
  @Input() periods;
  @Input() tableObjectsList;
  @Input() isTableObjectsListCreated;
  @Input() selectedTableObject;
  @Input() dateDictionary: any;
  @Input() dataElementsAnalyticsData: any;
  @Input() marginTopViolation: string;
  possibleViolatedRules: Array<any>;
  selectedOuForViolations: Boolean = false;
  showValidationRuleViolations: Boolean = false;
  @Input() activeTableItem: any;
  constructor() {}

  ngOnInit() {}

  setActivePeriod(pe) {
    this.activeTableItem = pe;
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

  showValidationRuleViolationModal(e) {
    this.showValidationRuleViolations = e;
  }

  hideValidationModal() {
    if (this.selectedOuForViolations == true) {
      this.showValidationRuleViolations = false;
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

  getViolationFromStoredViolations(rules, violations, ou, itemIdentifier, pe) {
    for (let count = 0; count < rules.length; count++) {
      if (
        violations[rules[count].id + '-' + ou + '-' + itemIdentifier + '-' + pe]
      ) {
        return 'fail';
        break;
      }
    }
    return 'test';
  }

  getCountOfVilatedRules(violatedRules) {
    if (violatedRules) {
      return Object.keys(violatedRules).length;
    } else {
      return 0;
    }
  }

  getApplicableValidationRules(validationRules, item) {
    let applicableRules = [];
    _.map(validationRules, rule => {
      if (
        _.indexOf(
          rule.leftSide.expression + '+' + rule.rightSide.expression,
          item
        ) > -1
      ) {
        applicableRules.push(rule);
      }
    });
    return applicableRules;
  }

  showValidationStatus(
    allData,
    itemIdentifier,
    rules,
    pe,
    ou,
    selectedTableObject,
    violationMessage
  ) {
    if (this.showValidationRuleViolations) {
      this.showValidationRuleViolations = false;
    } else {
      this.possibleViolatedRules = [];
      this.selectedTableObject = selectedTableObject;
      this.selectedOuForViolations = ou;
      let violatedRulesIds = [];
      _.map(
        Object.keys(selectedTableObject.validationViolations.violatedRules),
        key => {
          if (key.indexOf(pe) > -1) {
            this.possibleViolatedRules.push(key);
          }
        }
      );
      rules.forEach(rule => {
        if (_.indexOf(violatedRulesIds, rule.id) > -1) {
          this.possibleViolatedRules.push(rule);
        }
      });
      if (violationMessage == 'fail') {
        this.showValidationRuleViolations = true;
      } else {
        this.showValidationRuleViolations = false;
      }
    }
  }
}
