import * as _ from 'lodash';
import { periodTypesReferences } from '../constants';

export function validateData(dataObject, pe, ous, rules) {
  let violatedRules = {};
  let violatedRulesByOu = {};
  let violationInfo = {};
  let indicatorInconsistance = {};
  _.map(ous, ou => {
    _.map(rules, rule => {
      let dataElements = [];
      let leftSide = rule.leftSide.expression;
      let rightSide = rule.rightSide.expression;
      let leftSideElements = [];
      let rightSideElements = [];

      const formulaPattern = /#\{.+?\}/g;
      _.map(leftSide.match(formulaPattern), matchedItem => {
        leftSideElements.push(matchedItem.replace(/[#\{\}]/g, ''));
      });
      _.map(rightSide.match(formulaPattern), matchedItem => {
        rightSideElements.push(matchedItem.replace(/[#\{\}]/g, ''));
      });
      _.map(leftSideElements, elementId => {
        dataElements.push(elementId);
        if (
          Number(
            dataObject[rule.id + '-' + ou.id + '-' + elementId + '-' + pe]
          ) != NaN
        ) {
          leftSide = leftSide
            .split(elementId)
            .join(
              Number(
                dataObject[rule.id + '-' + ou.id + '-' + elementId + '-' + pe]
              )
            );
        } else {
          leftSide = leftSide.split(elementId).join(0);
        }
      });

      _.map(rightSideElements, elementId => {
        dataElements.push(elementId);
        if (
          Number(
            dataObject[rule.id + '-' + ou.id + '-' + elementId + '-' + pe]
          ) != NaN
        ) {
          rightSide = rightSide
            .split(elementId)
            .join(
              Number(
                dataObject[rule.id + '-' + ou.id + '-' + elementId + '-' + pe]
              )
            );
        } else {
          rightSide = rightSide.split(elementId).join(0);
        }
      });
      if (rule.operator == 'less_than_or_equal_to') {
        if (
          eval(removeSpecialChars(leftSide)) <=
          eval(removeSpecialChars(rightSide))
        ) {
          _.uniq(dataElements).forEach(dataElement => {
            if (
              violationInfo[ou.id + '-' + dataElement + '-' + pe] &&
              violationInfo[ou.id + '-' + dataElement + '-' + pe] != 'fail'
            ) {
              violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'success';
            }
          });
        } else {
          _.uniq(dataElements).forEach(dataElement => {
            violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'fail';
          });
          violatedRules[rule.id] = rule;
          violatedRulesByOu[rule.id + '-' + ou.id] = rule;
        }
      } else if (rule.operator == 'greater_than_or_equal_to') {
        if (
          eval(removeSpecialChars(leftSide)) >=
          eval(removeSpecialChars(rightSide))
        ) {
          _.uniq(dataElements).forEach(dataElement => {
            if (
              violationInfo[ou.id + '-' + dataElement + '-' + pe] &&
              violationInfo[ou.id + '-' + dataElement + '-' + pe] != 'fail'
            ) {
              violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'success';
            }
          });
        } else {
          _.uniq(dataElements).forEach(dataElement => {
            violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'fail';
          });
          violatedRules[rule.id] = rule;
          violatedRulesByOu[rule.id + '-' + ou.id] = rule;
        }
      } else if (rule.operator == 'equal_to') {
        if (
          eval(removeSpecialChars(leftSide)) ==
          eval(removeSpecialChars(rightSide))
        ) {
          _.uniq(dataElements).forEach(dataElement => {
            if (
              violationInfo[ou.id + '-' + dataElement + '-' + pe] &&
              violationInfo[ou.id + '-' + dataElement + '-' + pe] != 'fail'
            ) {
              violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'success';
            }
          });
        } else {
          _.uniq(dataElements).forEach(dataElement => {
            violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'fail';
          });
          violatedRules[rule.id] = rule;
          violatedRulesByOu[rule.id + '-' + ou.id] = rule;
        }
      } else if (rule.operator == 'greater_than') {
        if (
          eval(removeSpecialChars(leftSide)) >
          eval(removeSpecialChars(rightSide))
        ) {
          _.uniq(dataElements).forEach(dataElement => {
            if (
              violationInfo[ou.id + '-' + dataElement + '-' + pe] &&
              violationInfo[ou.id + '-' + dataElement + '-' + pe] != 'fail'
            ) {
              violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'success';
            }
          });
        } else {
          _.uniq(dataElements).forEach(dataElement => {
            violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'fail';
          });
          violatedRules[rule.id] = rule;
          violatedRulesByOu[rule.id + '-' + ou.id] = rule;
        }
      } else if (rule.operator == 'less_than') {
        if (
          eval(removeSpecialChars(leftSide)) >
          eval(removeSpecialChars(rightSide))
        ) {
          _.uniq(dataElements).forEach(dataElement => {
            if (
              violationInfo[ou.id + '-' + dataElement + '-' + pe] &&
              violationInfo[ou.id + '-' + dataElement + '-' + pe] != 'fail'
            ) {
              violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'success';
            }
          });
        } else {
          _.uniq(dataElements).forEach(dataElement => {
            violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'fail';
          });
          violatedRules[rule.id] = rule;
          violatedRulesByOu[rule.id + '-' + ou.id] = rule;
        }
      } else if (rule.operator == 'not_equal_to') {
        if (
          eval(removeSpecialChars(leftSide)) !=
          eval(removeSpecialChars(rightSide))
        ) {
          _.uniq(dataElements).forEach(dataElement => {
            if (
              violationInfo[ou.id + '-' + dataElement + '-' + pe] &&
              violationInfo[ou.id + '-' + dataElement + '-' + pe] != 'fail'
            ) {
              violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'success';
            }
          });
        } else {
          _.uniq(dataElements).forEach(dataElement => {
            violationInfo[ou.id + '-' + dataElement + '-' + pe] = 'fail';
          });
          violatedRules[rule.id] = rule;
          violatedRulesByOu[rule.id + '-' + ou.id] = rule;
        }
      }
    });
  });
  return {
    violations: violationInfo,
    violatedRules: violatedRules,
    violatedRulesCount: Object.keys(violatedRules).length,
    violatedRulesByOu: violatedRulesByOu
  };
}

function removeSpecialChars(expression) {
  return expression
    .split('NaN')
    .join(0)
    .replace(/I\{[^)]+/g, '')
    .replace(/AVG/g, '')
    .replace(/#/g, '')
    .replace(/{/g, '')
    .replace(/}/g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '');
}

export function getMinimumPossiblePeriodTypeFromValidationRules(
  validationRules
) {
  const periodTypes = _.uniq(_.map(validationRules, 'periodType'));
  let periodPriorities = [];
  _.map(periodTypes, (type: string) => {
    periodPriorities.push(periodTypesReferences[type]);
  });
  const selectedPeriodType = _.take(
    _.sortBy(periodPriorities, 'priority'),
    1
  )[0];
  return selectedPeriodType;
}

export function createNumberOfViolationsByOu(violationsByOu, validationRules) {
  let numberOfRuleViolationsByOu = {};
  _.map(Object.keys(violationsByOu), ruleAndOu => {
    let countOfViolations = 0;
    _.map(validationRules, rule => {
      if (violationsByOu[rule.id + '-' + ruleAndOu.split('-')[1]]) {
        countOfViolations++;
      }
    });
    numberOfRuleViolationsByOu[ruleAndOu.split('-')[1]] = countOfViolations;
  });
  return numberOfRuleViolationsByOu;
}
