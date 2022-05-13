import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationPentabilitiesComponent } from './explanation-pentabilities.component';

describe('ExplanationPentabilitiesComponent', () => {
  let component: ExplanationPentabilitiesComponent;
  let fixture: ComponentFixture<ExplanationPentabilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplanationPentabilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplanationPentabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
