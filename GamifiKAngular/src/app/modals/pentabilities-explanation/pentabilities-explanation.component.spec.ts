import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PentabilitiesExplanationComponent } from './pentabilities-explanation.component';

describe('PentabilitiesExplanationComponent', () => {
  let component: PentabilitiesExplanationComponent;
  let fixture: ComponentFixture<PentabilitiesExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PentabilitiesExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PentabilitiesExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
