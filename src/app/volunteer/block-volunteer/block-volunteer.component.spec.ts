import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockVolunteerComponent } from './block-volunteer.component';

describe('BlockVolunteerComponent', () => {
  let component: BlockVolunteerComponent;
  let fixture: ComponentFixture<BlockVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockVolunteerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
