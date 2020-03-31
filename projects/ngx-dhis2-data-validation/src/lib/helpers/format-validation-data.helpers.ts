import * as _ from 'lodash';

export function createValidationObject(validationRules, data) {
  let formattedValidationData = {};
  let validatedData = {};
  const validationRulesInKeyValuePair = validationRules.reduce(
    (rules, rule) => ({ ...rules, [rule.id]: rule }),
    {}
  );
  let leftSideValue = 0;
  let rightSideValue = 0;
  const formulaPattern = /#\{.+?\}/g;
  _.map(data['data']['leftSide'], (item, index) => {
    leftSideValue += item['value'] ? parseFloat(item['value']) : 0;
  });
  _.map(data['data']['rightSide'], (item, index) => {
    rightSideValue += item['value'] ? parseFloat(item['value']) : 0;
  });

  if (
    validationRulesInKeyValuePair[data.id.split('-')[0]]['operator'] ==
    'less_than_or_equal_to'
  ) {
    if (leftSideValue <= rightSideValue) {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: false
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: false
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: false
        }
      };
    } else {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: true
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: true
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: true
        }
      };
    }
  } else if (
    validationRulesInKeyValuePair[data.id.split('-')[0]]['operator'] ==
    'greater_than_or_equal_to'
  ) {
    if (leftSideValue >= rightSideValue) {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: false
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: false
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: false
        }
      };
    } else {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: true
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: true
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: true
        }
      };
    }
  } else if (
    validationRulesInKeyValuePair[data.id.split('-')[0]]['operator'] ==
    'equal_to'
  ) {
    if (leftSideValue == rightSideValue) {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: false
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: false
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: false
        }
      };
    } else {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: true
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: true
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: true
        }
      };
    }
  } else if (
    validationRulesInKeyValuePair[data.id.split('-')[0]]['operator'] ==
    'greater_than'
  ) {
    if (leftSideValue > rightSideValue) {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: false
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: false
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: false
        }
      };
    } else {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: true
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: true
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: true
        }
      };
    }
  } else if (
    validationRulesInKeyValuePair[data.id.split('-')[0]]['operator'] ==
    'less_than'
  ) {
    if (leftSideValue < rightSideValue) {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: false
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: false
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: false
        }
      };
    } else {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: true
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: true
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: true
        }
      };
    }
  } else if (
    validationRulesInKeyValuePair[data.id.split('-')[0]]['operator'] ==
    'not_equal_to'
  ) {
    if (leftSideValue != rightSideValue) {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: false
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: false
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: false
        }
      };
    } else {
      formattedValidationData = {
        id: data.id,
        leftSideValue: leftSideValue,
        rightSideValue: rightSideValue,
        violated: true
      };
      validatedData = {
        leftSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: leftSideValue,
          details: data['data']['leftSide'],
          violated: true
        },
        rightSide: {
          id: '',
          name:
            validationRulesInKeyValuePair[data.id.split('-')[0]].leftSide
              .description,
          value: rightSideValue,
          details: data['data']['rightSide'],
          violated: true
        }
      };
    }
  }
  return {
    id: data.id,
    validationData: validatedData
  };
}
