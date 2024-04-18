import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInSummaryComponent } from './check-in-summary.component';

describe('CheckInSummaryComponent', () => {
  let component: CheckInSummaryComponent;
  let fixture: ComponentFixture<CheckInSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckInSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
