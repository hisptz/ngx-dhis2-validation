import { NgModule } from '@angular/core';
import { DataValidationComponent } from './components/data-validation/data-validation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { validationDataReducer } from './store/reducers/data-validation.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoaderComponent } from './containers/loader/loader.component';
import { DataQualityTableComponent } from './components/data-validation/data-quality-table/data-quality-table.component';
import { ValidationRuleViolationComponent } from './components/data-validation/data-quality-table/validation-rule-violation/validation-rule-violation.component';
import { ValidationDataEffects } from './store/effects/data-validation.effects';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LegendComponent } from './containers/legend/legend.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DataValidationComponent,
    LoaderComponent,
    DataQualityTableComponent,
    ValidationRuleViolationComponent,
    LegendComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule,
    StoreModule.forFeature('validationInfo', validationDataReducer),
    EffectsModule.forFeature([ValidationDataEffects])
  ],
  exports: [DataValidationComponent, MatProgressBarModule]
})
export class NgxDhis2DataValidationModule {}
