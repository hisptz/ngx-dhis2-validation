import * as _ from 'lodash';

export function drawTable(
  analyticsObject,
  pe,
  indicatorId,
  allValidationRules,
  indicatorDataElements,
  indicatorAnalyticsData
) {
  //   const possibleDataInconstance = compareMainUnitVsDataEntryUnits(
  //     indicatorAnalyticsData,
  //     indicatorId,
  //     pe,
  //     indicatorDataElements
  //   );
  const table = {
    title: '',
    headers: [],
    columns: [],
    rows: [],
    metaDataItems: analyticsObject ? analyticsObject.data.metaData.items : [],
    validationInformation: {},
    possibleIndicatorDataInconstance: {},
    validationRules: allValidationRules,
    rowsData: {},
    titles: {
      columns: [],
      rows: []
    },
    validationViolations: {},
    numberOfRuleViolationsByOu: {},
    titlesAvailable: false,
    hasParentOu: false
  };
  // table.title = tableConfiguration.title;
  let dimensionDxArr = analyticsObject
    ? analyticsObject.data.metaData.dimensions.dx
    : [];
  const elementsToShow = _.uniq(dimensionDxArr);
  let colsIndex = [];
  elementsToShow.forEach(formtHeader);
  function formtHeader(itemId, index) {
    if (_.indexOf(elementsToShow, itemId) > -1) {
      colsIndex.push(index);
      table.titles.columns.push({
        id: itemId,
        name: analyticsObject.data.metaData.items[itemId].name
      });
    }
  }

  let dimensionOus = analyticsObject
    ? analyticsObject.data.metaData.dimensions.ou
    : [];

  _.map(dimensionOus, ou => {
    table.rows.push({
      id: ou,
      name: analyticsObject.data.metaData.items[ou].name
    });
  });

  let dataRows = analyticsObject ? analyticsObject.data.rows : [];
  if (dataRows.length > 0) {
    _.map(analyticsObject.data.rows, row => {
      table.rowsData[row[2] + '-' + row[0] + '-' + row[1]] = row[3];
    });
  }
  // create validation information
  _.map(allValidationRules, validationRule => {
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
      _.map(table.rows, ou => {
        table.validationInformation[
          validationRule.id + '-' + ou.id + '-' + item + '-' + pe
        ] = table.rowsData[ou.id + '-' + item + '-' + pe];
      });
    });
    rightSideElements.forEach(item => {
      table.rows.forEach(ou => {
        table.validationInformation[
          validationRule.id + '-' + ou.id + '-' + item + '-' + pe
        ] = table.rowsData[ou.id + '-' + item + '-' + pe];
      });
    });
  });

  table.possibleIndicatorDataInconstance = {};
  return table;
}

function compareMainUnitVsDataEntryUnits(
  indicatorAnalyticsData,
  indicatorId,
  pe,
  indicatorDataElements
) {
  let mainUnitData;
  let entryUnitDataRows;
  let keyValuePairForDataWithPossibleInconsistance = {};
  let inconsistentAreas = {}; // key ou + "-" + dataElementId + "-" + pe
  const mainUnitAnalytics = _.filter(indicatorAnalyticsData, {
    id: pe + '-' + indicatorId + '-main-unit'
  });
  const subUnitsAnalytics = _.filter(indicatorAnalyticsData, {
    id: pe + '-' + indicatorId + '-sub-units'
  });
  if (
    mainUnitAnalytics.length > 0 &&
    mainUnitAnalytics[0].data.rows.length > 0 &&
    subUnitsAnalytics.length > 0 &&
    subUnitsAnalytics[0].data.rows.length > 0
  ) {
    mainUnitData = mainUnitAnalytics[0].data.rows[0][3];

    entryUnitDataRows = subUnitsAnalytics[0].data.rows;
    _.map(entryUnitDataRows, row => {
      if (Math.abs(Number(row[3]) - Number(mainUnitData)) > 20) {
        keyValuePairForDataWithPossibleInconsistance[row[2]] = {
          mainUnitValue: mainUnitData,
          entryUnitValue: row[3],
          dataElements: indicatorDataElements
        };
        _.map(indicatorDataElements, element => {
          inconsistentAreas[row[2] + '-' + element + '-' + pe] = 'inconsistent';
          inconsistentAreas[row[2] + '-' + element.split('.')[0] + '-' + pe] =
            'inconsistent';
        });
      }
    });
  }
  return {
    inconsistentAreas: inconsistentAreas,
    ouHasInconsistance: keyValuePairForDataWithPossibleInconsistance
  };
}
