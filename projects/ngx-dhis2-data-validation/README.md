# NgxDhis2DataValidation

This library, validate data in a dhis2 instance using the available validation rules. To use the library go to `using the NgxDhis2DataValidation libray`.

## Using the NgxDhis2DataValidation library

To use the library use pass required properties as follows

```
........
<ngx-data-validation
      [indicator]="indicator"
      [validationRules]="validationRules"
      [dataElements]="dataElements"
      [parentOu]="parentOu"
      [childrenOus]="childrenOus"
      [period]="period"
      [dateDictionary]="dateDictionary"
      [indicatorDataElements]="indicatorDataElements"
      [validationPeriods]="analyticsPeriods"
      [marginTopViolation]="marginTopViolation"
      [violationBgrColor]="violationBgrColor"
      [discrepancyBgrColor]="discrepancyBgrColor"
      [successBgrColor]="successBgrColor"
      [currentValidationPeriod]="currentValidationPeriod"
    ></ngx-data-validation>
    .......
```

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
