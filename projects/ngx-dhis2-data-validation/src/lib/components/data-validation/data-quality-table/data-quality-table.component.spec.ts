import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataQualityTableComponent } from './data-quality-table.component';

describe('DataQualityTableComponent', () => {
  let component: DataQualityTableComponent;
  let fixture: ComponentFixture<DataQualityTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataQualityTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataQualityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
