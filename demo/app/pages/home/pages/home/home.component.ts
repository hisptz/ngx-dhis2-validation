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
      },
      {
        name: 'Olorieni Dispensary',
        id: 'uQ6AEPLq1W0'
      },
      {
        name: 'Zac Mianzini Dispensary',
        id: 'Fw7YZAASKel'
      },
      {
        name: 'KANAAN DISP.',
        id: 'xd2Rxi91ZTD'
      },
      {
        name: 'Upendo Dispensary',
        id: 'hh0mrmZ1Viq'
      },
      {
        name: 'LCC Huruma',
        id: 'E7wzi4PdTiD'
      },
      {
        name: 'Cogi Daraja Ii Dispensary',
        id: 'euufGwsOdQz'
      },
      {
        name: 'Total Care Health Center',
        id: 'e3OgvhjDa7D'
      },
      {
        name: 'Sikh Temple Dispensary',
        id: 'ch0KchJQVl6'
      },
      {
        name: 'Huruma Kanora Dispensary',
        id: 'vJ5s1v4SNSQ'
      },
      {
        name: 'Oljoro Road Dispensary',
        id: 'AGQikljQSJ1'
      },
      {
        name: 'Sakina Dispensary',
        id: 'y3BwWgEBHD4'
      },
      {
        name: 'st.Elizabeth',
        id: 'mPP11IHuwHU'
      },
      {
        name: 'Sun Beam Optical centre',
        id: 'fMBAgl4v8ZM'
      },
      {
        name: 'AGA KHAN HEALTH CENTRE',
        id: 'To5ATasBZMu'
      },
      {
        name: 'Kimandolu Dispensary',
        id: 'pK5FsujmLPf'
      },
      {
        name: 'Zebra Eye Clinic',
        id: 'ri55daHZCCt'
      },
      {
        name: 'Mrt Health Center',
        id: 'pbt52idmn2y'
      },
      {
        name: 'Baraa Rc Dispensary',
        id: 'cfmo8YynfrX'
      },
      {
        name: 'Star Optometry',
        id: 'myYdAxOCkpR'
      },
      {
        name: 'Highway',
        id: 'FDpsVCkyrtX'
      },
      {
        name: 'Arusha School Dispensary',
        id: 'W1uL3UTkc9I'
      },
      {
        name: 'I. C. M.F Dispensary',
        id: 'qObyLU1yJoN'
      },
      {
        name: 'Terrat Road Dispensary',
        id: 'QonSb24QVNo'
      },
      {
        name: 'Sanawari Dispensary',
        id: 'ueA5e1VANsu'
      },
      {
        name: 'MARYLAND',
        id: 'OapFyXDTlMp'
      },
      {
        name: 'ELERAI',
        id: 'DxKeXp4SRle'
      },
      {
        name: 'Bikira Maria Mama Wa Huruma Dispensary',
        id: 'hl6gBEyQ2ZE'
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
        name: 'Shree Hindu Hospital',
        id: 'jGRJjf4ZM94'
      },
      {
        name: 'St. Thomas Health Center',
        id: 'aAMeRYFum96'
      },
      {
        name: 'Tumaini VCT Clinic',
        id: 'pChM6mlXt73'
      },
      {
        name: 'Tanganyika Packers Dispensary',
        id: 'XMXUbkykD72'
      },
      {
        name: 'Afyamax Clinics',
        id: 'aVQFxLRDxW3'
      },
      {
        name: 'Neema Dispensary',
        id: 'fRzkZyPlPaU'
      },
      {
        name: 'ICD',
        id: 'vu8bIjX9gD1'
      },
      {
        name: 'SDA Njiro',
        id: 'WwkgvKn4lbb'
      },
      {
        name: 'Mkonoo Health Center',
        id: 'v9ZWDqvz4bJ'
      },
      {
        name: 'Sombetini Dispensary',
        id: 'wkt9kBPiUhQ'
      },
      {
        name: 'Winner Dental Clinic Clinic',
        id: 'B4xeYH1Bh44'
      },
      {
        name: 'Health Master Dispensary',
        id: 'RFxJQgHTP9I'
      },
      {
        name: 'West end Darajani Dispensary',
        id: 'C7CbWUh3ZGZ'
      },
      {
        name: 'Olasiti Amani Cogi Dispensary',
        id: 'rQCXeEZ2Hu2'
      },
      {
        name: 'Moshono Dispensary',
        id: 'yxDguaBESrz'
      },
      {
        name: 'Aicc Hospital',
        id: 'SuoqM5pXPWG'
      },
      {
        name: 'Arusha Medical Centre Dispensary',
        id: 'PkYOq3i96W5'
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
        name: 'Canosa Dispensary',
        id: 'EwiQb3Ro0K8'
      },
      {
        name: 'FMM',
        id: 'YnyHZS7iTzr'
      },
      {
        name: 'Uzima Vct Clinic',
        id: 'x9rWO43vi0w'
      },
      {
        name: 'Kwa Dr Wanjara',
        id: 'IzqA1bVBDmf'
      },
      {
        name: 'Olorien Community',
        id: 'yB8hKiHiVqe'
      },
      {
        name: 'Moivaro Health Center',
        id: 'd0OIGtP3C5z'
      },
      {
        name: 'Shama Dispensary',
        id: 'VsBybftGPCh'
      },
      {
        name: 'Emunah',
        id: 'mmz3jdw1yZL'
      },
      {
        name: 'Lebrani Dispensary',
        id: 'Qw4j4vqVZQd'
      },
      {
        name: 'Ithnaasher Hospital',
        id: 'Y8rGS7kiOav'
      },
      {
        name: 'Migungani Dispensary',
        id: 'hgqiYpjjCGK'
      },
      {
        name: 'Kimahama Clinic',
        id: 'VR9DGyn74Qw'
      },
      {
        name: 'Love Calvary Dispensary',
        id: 'ZfHUjM9fQoN'
      },
      {
        name: 'Mateves Dispensary',
        id: 'gmcaHms2xyb'
      },
      {
        name: 'Tumaini Dispensary',
        id: 'zeBD0GNTXuH'
      },
      {
        name: 'Faraja Dispensary',
        id: 'bbx2XZhopXy'
      },
      {
        name: 'Facility XXXX',
        id: 'Jzg8ZduUaBg'
      },
      {
        name: 'St. Michael Dispensary',
        id: 'jNAny7XRnDb'
      },
      {
        name: 'Ngarenaro Health Center',
        id: 'M63y0lV6dCQ'
      },
      {
        name: 'Faith Dispensary',
        id: 'NV8pMkRVSX1'
      },
      {
        name: 'Sinon Parish',
        id: 'XwSWVFKMzee'
      },
      {
        name: 'Hope Dispensary',
        id: 'cJAFqbZOIn8'
      },
      {
        name: 'Ffu Dispensary',
        id: 'ThjuZW56J4J'
      },
      {
        name: 'Green Hope Dispensary',
        id: 'q91iEOWkRyx'
      },
      {
        name: 'Police Dispensary',
        id: 'EPP1XcYSwha'
      },
      {
        name: 'MRT H/C',
        id: 'KKI55pR8v43'
      },
      {
        name: 'Heaven',
        id: 'JVgr5ecJKxd'
      },
      {
        name: 'Shalom Clinic',
        id: 'rfo2Eqny4zf'
      },
      {
        name: 'St. Veronica Dispensary',
        id: 'OEL2xs4Ugpb'
      },
      {
        name: 'Soweto Health Center',
        id: 'wJNRf5HFkn1'
      },
      {
        name: 'JMS DISP',
        id: 'gDcTrVWcaex'
      },
      {
        name: 'KALOLENI HC',
        id: 'S75EZoUUftE'
      },
      {
        name: 'Eleram Dispensary',
        id: 'qTCRCgN12gE'
      },
      {
        name: 'Tbl Dispensary',
        id: 'bLU2X0DWfLm'
      },
      {
        name: 'Arusha &labaratory Dispensary',
        id: 'DwmrRABVABm'
      },
      {
        name: 'N.G Light Dispensary',
        id: 'zZMzWjD2tux'
      },
      {
        name: 'Terrat Dispensary',
        id: 'SwXhEVeg1Xy'
      },
      {
        name: 'Aveti Dispensary',
        id: 'eCUwwNkqxOL'
      },
      {
        name: 'Devine Grace Clinic',
        id: 'kIZQN2D1ekK'
      },
      {
        name: 'Gloria',
        id: 'wahSKrGd1v8'
      },
      {
        name: 'Seca Care',
        id: 'JTzn5YtWBIy'
      },
      {
        name: 'Vision Care',
        id: 'vW00w9u5ghW'
      },
      {
        name: 'Cogi Esso Dispensary',
        id: 'TKGFxisQtcd'
      },
      {
        name: 'Sinon Daraja II, ZAAC',
        id: 'vdhmdacr3FO'
      },
      {
        name: 'Bama Beba Dispensary',
        id: 'n7TEJsHmWDd'
      },
      {
        name: 'Vision Perfect',
        id: 'DFAZ8676wy4'
      },
      {
        name: 'ST RAPHAEL',
        id: 'Evd3wbDmdGu'
      },
      {
        name: 'Magereza Dispensary',
        id: 'jeW1i7vkgaH'
      },
      {
        name: 'Kijenge Rc Dispensary',
        id: 'EDBRNm4RWw3'
      },
      {
        name: 'Testing facility 1',
        id: 'vGgfWC2XX2R'
      },
      {
        name: 'Lulu Dispensary',
        id: 'oprrRJ54Yup'
      },
      {
        name: 'Jobi',
        id: 'jUpCI4ul5kN'
      },
      {
        name: 'Huruma Kimandolu Dispensary',
        id: 'vB38tTn5YGm'
      },
      {
        name: 'Arusha Lutheran Center Hospital',
        id: 'hcb09IcZvZo'
      },
      {
        name: 'Kam Med Health Centre Health Center',
        id: 'cMXbDCKFOjr'
      },
      {
        name: 'Aar Health Center',
        id: 'VN8Jjz61jOE'
      },
      {
        name: 'Kam Med Dispensary',
        id: 'FwGAWe7EO3z'
      },
      {
        name: 'Nadosoito Dispensary',
        id: 'n3WL7IVRMgN'
      },
      {
        name: 'Olasiti SDA Dispensary',
        id: 'JraJ1Bp0ZAY'
      },
      {
        name: 'Samarithani Dispensary',
        id: 'zd1wO4UoL3f'
      },
      {
        name: 'Facility XXXXX',
        id: 'ZvW1SsWm9VP'
      },
      {
        name: 'Imani Arusha Dispensary',
        id: 'mcSNtlO2X3M'
      },
      {
        name: 'Moshi Arusha Occupational Dispensary',
        id: 'TA9jVBhblu6'
      },
      {
        name: 'Old Arusha Clinic Health Center',
        id: 'Xe9q1NwLEAu'
      },
      {
        name: 'Facility XXXX',
        id: 'MmgvsH4h8pn'
      },
      {
        name: 'Arusha X-Ray Centre Dispensary',
        id: 'JQMx11NWqAg'
      },
      {
        name: 'Olkereyan Dispensary',
        id: 'DpUMHSNKeiS'
      },
      {
        name: 'Cogi Kijenge Dispensary',
        id: 'FX9ABe3SEwA'
      },
      {
        name: 'NSK HOSPITAL',
        id: 'mrgygzWlK28'
      },
      {
        name: 'Marie Stopes Dispensary',
        id: 'epbMUPJh161'
      },
      {
        name: 'Sunni muslim Dispensary',
        id: 'QZqP8F53daD'
      },
      {
        name: 'Upone',
        id: 'QW1IRLgfxLd'
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
