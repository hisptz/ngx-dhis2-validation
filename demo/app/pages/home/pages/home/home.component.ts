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
  currentValidationPeriod: any;
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
        name: 'Eben Dispensary',
        id: 'MGRNfzaj2NR'
      },
      {
        name: 'Olorieni Dispensary',
        id: 'uQ6AEPLq1W0'
      },
      {
        name: 'FM Health Care Level IA2 (Dispensary Laboratory)',
        id: 'P2Nm5FKYzVn'
      },
      {
        name: 'Upendo Dispensary',
        id: 'hh0mrmZ1Viq'
      },
      {
        name: 'Sakina Dispensary',
        id: 'y3BwWgEBHD4'
      },
      {
        name: 'ash Health Labs',
        id: 'YbJIrQInY0v'
      },
      {
        name: 'JOBI Dispensary',
        id: 'jUpCI4ul5kN'
      },
      {
        name: 'KAM MED Dispensary',
        id: 'FwGAWe7EO3z'
      },
      {
        name: 'Kimandolu Dispensary',
        id: 'pK5FsujmLPf'
      },
      {
        name: 'meserani Health Labs',
        id: 'qeuUQYiDbq5'
      },
      {
        name: 'Tahfifu Level IA2 (Dispensary Laboratory)',
        id: 'mt2tp7QRLQR'
      },
      {
        name: 'Sanawari Dispensary',
        id: 'ueA5e1VANsu'
      },
      {
        name: 'Vision Perfect Limited Optometry Clinic',
        id: 'DFAZ8676wy4'
      },
      {
        name: 'Smart Dental Clinic',
        id: 'FyUzlX9lEl3'
      },
      {
        name: 'Themi Health Center',
        id: 'DmmzYQSSqeS'
      },
      {
        name: 'Well Point Dispensary',
        id: 'R7gKjuhTRrV'
      },
      {
        name: 'Smart Level IA2 (Dispensary Laboratory)',
        id: 'xIujEjtKZBA'
      },
      {
        name: 'Tumaini VCT Clinic',
        id: 'pChM6mlXt73'
      },
      {
        name: 'Upone Charitable Foundation Dispensary',
        id: 'QW1IRLgfxLd'
      },
      {
        name: 'Wanjiro Level IA2 (Dispensary Laboratory)',
        id: 'G9w0Sc0VKuW'
      },
      {
        name: 'Highway Dispensary',
        id: 'FDpsVCkyrtX'
      },
      {
        name: 'Agape Level IA2 (Dispensary Laboratory)',
        id: 'GlZ96ikDzX9'
      },
      {
        name: 'Moshono Dispensary',
        id: 'yxDguaBESrz'
      },
      {
        name: 'Holy Family Dispensary',
        id: 'IDW9Eez19K6'
      },
      {
        name: 'Mother Medical Care Health Center',
        id: 'hbeiD77AQxs'
      },
      {
        name: 'Muriet Health Center',
        id: 'NS7bHDbwDGU'
      },
      {
        name: 'Qube Level IA2 (Dispensary Laboratory)',
        id: 'Nr6aPjFfVYV'
      },
      {
        name: 'Shamsi Level IA2 (Dispensary Laboratory)',
        id: 'GWmLIRuCV0b'
      },
      {
        name: 'arusha centre Health Labs',
        id: 'ctZkJXqHU2e'
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
        this.validationRules = this.selectedValidationRuleGroup.indicators[0][
          'validationRules'
        ];

        const expression =
          this.indicator['numerator'] + '+' + this.indicator['denominator'];
        const formulaPattern = /#\{.+?\}/g;
        _.map(expression.match(formulaPattern), matchedItem => {
          this.indicatorDataElements.push(matchedItem.replace(/[#\{\}]/g, ''));
        });
        this.period = '2020';
        this.analyticsPeriods = this.formatAnalyticsPeriods(
          'Monthly',
          this.period,
          this.periodTypesReferences
        );
        this.currentValidationPeriod = _.last(this.analyticsPeriods);
      }
    });
  }

  formatAnalyticsPeriods(periodType, pe, periodTypesReferences) {
    let now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    let analyticsPeriods = [];
    _.map(periodTypesReferences[periodType].identifiers, identifier => {
      // identify maximum valid period
      if (
        Number(pe) == currentYear &&
        Number(this.getIdentifierNumericPart(identifier)) < currentMonth
      ) {
        analyticsPeriods.push(pe.toString() + identifier);
      } else if (Number(pe) < currentYear) {
        analyticsPeriods.push(pe.toString() + identifier);
      }
    });
    return analyticsPeriods;
  }

  getIdentifierNumericPart(identifier) {
    if (identifier.indexOf('Q') > -1) {
      return Number(_.last(identifier) * 3);
    } else {
      return identifier;
    }
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
