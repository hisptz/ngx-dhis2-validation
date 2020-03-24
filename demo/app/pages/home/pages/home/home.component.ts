import { Component, OnInit } from '@angular/core';
import { DataStoreService } from 'demo/app/core/services';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  marginTopViolation = '10px';
  violationBgrColor = '#ff89a0';
  successBgrColor = 'green';
  discrepancyBgrColor = '#e4ed6a';
  selectedValidationRuleGroup: any;
  dashboardConfigurations: any;
  indicator: any;
  dataElements: any;
  parentOu: any;
  childrenOus: any;
  analyticsPeriods: any;
  dateDictionary: any = {
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
    '01': 'Jan',
    '02': 'Feb',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'Aug',
    '09': 'Sept',
    Q1: 'Jan - Mar',
    Q2: 'Apr - June',
    Q3: 'July - Sept',
    Q4: 'Oct - Dec',
    '01B': 'Jan - Feb',
    '02B': 'Mar - Apr',
    '03B': 'May - June',
    '04B': 'July - Aug',
    '05B': 'Sep - Oct',
    '06B': 'Nov - Dec',
    S1: 'January - June',
    S2: 'July - December',
    April: 'Financial April',
    July: 'Financial July',
    Oct: 'Financial October'
  };

  periodTypesReferences: any = {
    Monthly: {
      priority: 2,
      name: 'Monthly',
      identifiers: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
      ]
    },
    Quarterly: {
      priority: 2,
      name: 'Quarterly',
      identifiers: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    Yearly: {
      priority: 1,
      name: 'Yearly',
      identifiers: []
    }
  };

  operators: any = {
    less_than_or_equal_to: '<=',
    greater_than_or_equal_to: '>=',
    greater_than: '>',
    less_than: '<'
  };
  period: string;
  indicatorDataElements: Array<any> = [];
  validationRules: Array<string>;
  constructor(private dataStoreService: DataStoreService) {
    this.parentOu = { name: 'Arusha City Council', id: 'lgZ6HfZaj3f' };
    this.childrenOus = [
      {
        name: 'Levolosi Health Center',
        id: 'g3ATGeDJpr0'
      },
      {
        name: 'Okoa Dispensary',
        id: 'FxkvwFQBteg'
      },
      {
        name: 'Mt. Meru Hospital',
        id: 'Nky82zx6NQw'
      },
      {
        name: 'Daraja Ii Health Center',
        id: 'Vnzin0vWH9c'
      },
      {
        name: 'Eben Dispensary',
        id: 'MGRNfzaj2NR'
      }
    ];
  }

  ngOnInit() {
    this.dataStoreService.getDashboards().subscribe(dashboardConfigs => {
      if (dashboardConfigs) {
        this.dashboardConfigurations = dashboardConfigs['HIV-AIDS-dashboards'];

        this.selectedValidationRuleGroup = this.dashboardConfigurations[1];
        this.dataElements = this.getDataElementsFromValidationRules(
          this.selectedValidationRuleGroup.validationRules
        );

        this.indicator = this.selectedValidationRuleGroup.indicators[0];
        console.log('indicator', this.indicator);
        this.validationRules = this.selectedValidationRuleGroup.indicators[0][
          'validationRules'
        ];

        const expression =
          this.indicator['numerator'] + '+' + this.indicator['denominator'];
        const formulaPattern = /#\{.+?\}/g;
        _.map(expression.match(formulaPattern), matchedItem => {
          this.indicatorDataElements.push(matchedItem.replace(/[#\{\}]/g, ''));
        });
        this.analyticsPeriods = this.formatAnalyticsPeriods(
          'Monthly',
          2019,
          this.periodTypesReferences
        );
        this.period = '2019';
        this.analyticsPeriods = this.analyticsPeriods;
      }
    });
  }

  formatAnalyticsPeriods(periodType, pe, periodTypesReferences) {
    let analyticsPeriods = [];
    _.map(periodTypesReferences[periodType].identifiers, indentifier => {
      analyticsPeriods.push(pe.toString() + indentifier);
    });
    return analyticsPeriods;
  }

  getDataElementsFromValidationRules(validationRules) {
    let dataElements = [];
    _.map(validationRules, validationRule => {
      let expression =
        validationRule.leftSide.expression +
        '+' +
        validationRule.rightSide.expression;
      expression = expression.replace(/I\{[^)]+/g, ''); // TODO: Add logic to handle program indicators
      const formulaPattern = /#\{.+?\}/g;
      _.map(expression.match(formulaPattern), matchedItem => {
        dataElements.push(matchedItem.replace(/[#\{\}]/g, ''));
      });
    });
    return _.uniq(dataElements);
  }
}
