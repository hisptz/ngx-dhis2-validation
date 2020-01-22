import { NgModule } from '@angular/core';
import { DataValidationComponent } from './components/data-validation/data-validation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { dataElementsAnalyticsReducer } from './store/reducers/data-elements-analytics.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoaderComponent } from './containers/loader/loader.component';
import { DataQualityTableComponent } from './components/data-validation/data-quality-table/data-quality-table.component';
import { ValidationRuleViolationComponent } from './components/data-validation/data-quality-table/validation-rule-violation/validation-rule-violation.component';
import { DataElementsAnalyticsEffects } from './store/effects/data-elements-analytics.effects';

@NgModule({
  declarations: [
    DataValidationComponent,
    LoaderComponent,
    DataQualityTableComponent,
    ValidationRuleViolationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature(
      'dataElementsAnalytics',
      dataElementsAnalyticsReducer
    ),
    EffectsModule.forFeature([DataElementsAnalyticsEffects])
  ],
  exports: [DataValidationComponent]
})
export class NgxDhis2DataValidationModule {}
