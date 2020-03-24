import * as _ from 'lodash';

export function createValidationDimensions(
  childrenOus,
  analyticsPeriods,
  validationRules
) {
  let dimensions = [];
  _.map(childrenOus, ou => {
    _.map(analyticsPeriods, period => {
      _.map(validationRules, validationRuleId => {
        dimensions.push({
          validationRuleId: validationRuleId,
          periodId: period,
          organisationUnitId: ou.id
        });
      });
    });
  });
  return dimensions;
}
