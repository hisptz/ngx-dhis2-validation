import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { DataElementsAnalyticsState } from '../../store/states/data-elements-analytics.states';
import {
  getDataElementsAnalytics,
  addLoadedDataIdentifier,
  checkIfAnalyticsIsDone
} from '../../store/actions';
import { drawTable } from '../../helpers';
import {
  getDataElementsAnalyticsEntities,
  getAllDataElementsAnalytics,
  getNumberOfAnalyticsDone,
  getExpectedAnalyticsCount
} from '../../store/selectors/data-elements-analytics.selectors';
import { Observable } from 'rxjs';
import {
  validateData,
  createNumberOfViolationsByOu
} from '../../helpers/validate-data.helpers';

@Component({
  selector: 'ngx-data-validation',
  templateUrl: './data-validation.component.html',
  styleUrls: ['./data-validation.component.css']
})
export class DataValidationComponent implements OnInit {
  @Input() validationRuleGroup: any;
  @Input() dataElements: any;
  @Input() organisationUnits: any;
  @Input() indicator: any;
  @Input() indicatorDataElements: any;
  @Input() childrenOus: any;
  @Input() parentOu: any;
  @Input() analyticsPeriods: any;
  @Input() period: any;
  @Input() dataElementsDataDimensions: Array<any> = [];
  @Input() dateDictionary: any;
  @Input() marginTopViolation: string;
  tableObjectsList: any = {};
  indicatorAnalytics: any;
  dataElementsAnalyticsData$: Observable<any>;
  activeTableItem: any;
  selectedTableObject: any;
  isTableObjectsListCreated: Boolean = false;
  allDataElementsAnalytics$: Observable<any>;
  loading$: Observable<Boolean>;
  expectedAnalyticsCount$: Observable<number>;
  analyticsDone$: Observable<any>;
  analyticsUniqueIdentifier: string;
  constructor(private dataElementsStore: Store<DataElementsAnalyticsState>) {}

  ngOnInit() {
    if (this.indicator && this.analyticsPeriods) {
      this.analyticsUniqueIdentifier =
        this.indicator.id + '-' + this.parentOu.id + '-' + this.period;
      _.map(this.analyticsPeriods, pe => {
        let dimension = {
          visualizationId: this.indicator.id,
          indicatorId: this.indicator.id,
          period: pe,
          dataElements: this.dataElements,
          parentPe: this.period,
          organisationUnits: this.getOuIds(this.childrenOus),
          parentOuId: this.parentOu.id
        };
        this.dataElementsDataDimensions.push(dimension);
      });

      if (
        this.dataElementsDataDimensions.length == this.analyticsPeriods.length
      ) {
        this.dataElementsStore.dispatch(
          checkIfAnalyticsIsDone({
            dimensions: {
              id: this.analyticsUniqueIdentifier,
              dataDimensions: this.dataElementsDataDimensions
            }
          })
        );
        // this.dataElementsStore.dispatch(
        //   getDataElementsAnalytics({
        //     dataDimensions: this.dataElementsDataDimensions
        //   })
        // );

        this.activeTableItem = this.analyticsPeriods[0];

        this.allDataElementsAnalytics$ = this.dataElementsStore.select(
          getAllDataElementsAnalytics
        );
        this.analyticsDone$ = this.dataElementsStore.select(
          getNumberOfAnalyticsDone
        );

        this.expectedAnalyticsCount$ = this.dataElementsStore.select(
          getExpectedAnalyticsCount
        );
        this.dataElementsAnalyticsData$ = this.dataElementsStore.select(
          getDataElementsAnalyticsEntities
        );
        this.dataElementsAnalyticsData$.subscribe(dataElementsAnalytics => {
          if (dataElementsAnalytics) {
            _.map(this.analyticsPeriods, pe => {
              let analyticsData =
                dataElementsAnalytics[
                  this.indicator.id + '-' + this.parentOu.id + '-' + pe
                ];
              this.tableObjectsList[pe] = drawTable(
                analyticsData,
                pe,
                this.indicator.id,
                this.validationRuleGroup.validationRules,
                this.indicatorDataElements,
                this.indicatorAnalytics
              );

              this.tableObjectsList[pe].validationViolations = validateData(
                this.tableObjectsList[pe].validationInformation,
                pe,
                this.tableObjectsList[pe].rows,
                this.tableObjectsList[pe].validationRules
              );
              if (this.tableObjectsList[pe].validationViolations) {
                this.tableObjectsList[
                  pe
                ].numberOfRuleViolationsByOu = createNumberOfViolationsByOu(
                  this.tableObjectsList[pe].validationViolations
                    .violatedRulesByOu,
                  this.tableObjectsList[pe].validationRules
                );
              }
              this.isTableObjectsListCreated = true;
              if (pe == this.activeTableItem) {
                this.selectedTableObject = this.tableObjectsList[pe];
              }
            });
          }
        });

        this.dataElementsStore.dispatch(
          addLoadedDataIdentifier({
            loadedDataIdentifier: {
              id: this.analyticsUniqueIdentifier,
              data: []
            }
          })
        );
      }
    }
  }

  getOuIds(ous) {
    let ouIds = [];
    _.map(ous, ou => {
      ouIds.push(ou.id);
    });
    return ouIds;
  }
}
