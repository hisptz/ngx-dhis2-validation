import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRuleViolationComponent } from './validation-rule-violation.component';

describe('ValidationRuleViolationComponent', () => {
  let component: ValidationRuleViolationComponent;
  let fixture: ComponentFixture<ValidationRuleViolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationRuleViolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationRuleViolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
