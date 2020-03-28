import * as _ from 'lodash';

export function createValidationDimensions(
  childrenOus,
  period,
  validationRules
) {
  let dimensions = [];
  _.map(validationRules, validationRuleId => {
    _.map(childrenOus, ou => {
      dimensions.push({
        validationRuleId: validationRuleId,
        periodId: period,
        organisationUnitId: ou.id
      });
    });
  });
  return dimensions;
}

export function createValidationHeaders(periods, validationRules) {
  let headers = {};
  _.map(periods, period => {
    let headerByRule = [];
    let validationRulesHeader = [];
    _.map(validationRules, validationRule => {
      validationRulesHeader.push(validationRule);
      headerByRule.push({
        fetchingIdPart: validationRule.id + '-' + period,
        id: validationRule.id + '-' + period + '-left',
        name: validationRule.leftSide.description,
        left: true,
        validationRule: validationRule
      });
      headerByRule.push({
        fetchingIdPart: validationRule.id + '-' + period,
        id: validationRule.id + '-' + period + '-right',
        name: validationRule.rightSide.description,
        right: true,
        validationRule: validationRule
      });
    });
    headers[period] = {
      rules: validationRulesHeader,
      dataReferences: headerByRule
    };
  });
  return headers;
}

export function getValidationRulesIds(validationRules) {
  let rulesIds = [];
  _.map(validationRules, rule => {
    rulesIds.push(rule.id);
  });
  return rulesIds;
}
