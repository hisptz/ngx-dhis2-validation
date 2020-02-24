# NgxDhis2DataValidation

This library, validate data in a dhis2 instance using the available validation rules. To use the library to to `using the libray`.

## Using the NgxDhis2DataValidation library

To use the library use pass required properties as follows

```<ngx-data-validation
      [indicator]="indicator"
      [validationRuleGroup]="selectedValidationRuleGroup"
      [dataElements]="dataElements"
      [parentOu]="parentOu"
      [childrenOus]="childrenOus"
      [period]="period"
      [dateDictionary]="dateDictionary"
      [indicatorDataElements]="indicatorDataElements"
      [analyticsPeriods]="analyticsPeriods"
      [marginTopViolation]="marginTopViolation"
      [violationBgrColor]="violationBgrColor"
    ></ngx-data-validation>
```

## Build

Run `ng build ngx-dhis2-data-validation` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngx-dhis2-data-validation`, go to the dist folder `cd dist/ngx-dhis2-data-validation` and run `npm publish`.

## Running unit tests

Run `ng test ngx-dhis2-data-validation` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
