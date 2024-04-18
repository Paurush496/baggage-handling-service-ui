import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BagApcFormComponent } from './bag-apc-form.component';

describe('BagApcFormComponent', () => {
  let component: BagApcFormComponent;
  let fixture: ComponentFixture<BagApcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BagApcFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BagApcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
