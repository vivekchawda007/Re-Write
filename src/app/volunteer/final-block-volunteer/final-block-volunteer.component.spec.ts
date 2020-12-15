import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalBlockVolunteerComponent } from './final-block-volunteer.component';

describe('FinalBlockVolunteerComponent', () => {
  let component: FinalBlockVolunteerComponent;
  let fixture: ComponentFixture<FinalBlockVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalBlockVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalBlockVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
