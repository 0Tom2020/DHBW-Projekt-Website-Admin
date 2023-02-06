import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventModalComponent } from './dashboard-event-modal.component';

describe('DashboardEventModalComponent', () => {
  let component: DashboardEventModalComponent;
  let fixture: ComponentFixture<DashboardEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEventModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
