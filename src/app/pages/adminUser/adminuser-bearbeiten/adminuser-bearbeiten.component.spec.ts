import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserBearbeitenComponent } from './adminuser-bearbeiten.component';

describe('AdminuserBearbeitenComponent', () => {
  let component: AdminuserBearbeitenComponent;
  let fixture: ComponentFixture<AdminuserBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminuserBearbeitenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminuserBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
