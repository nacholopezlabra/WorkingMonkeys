import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRankingComponent } from './join-ranking.component';

describe('JoinRankingComponent', () => {
  let component: JoinRankingComponent;
  let fixture: ComponentFixture<JoinRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
