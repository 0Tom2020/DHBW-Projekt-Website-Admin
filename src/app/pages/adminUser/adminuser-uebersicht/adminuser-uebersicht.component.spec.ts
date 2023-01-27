import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserUebersichtComponent } from './adminuser-uebersicht.component';

describe('AdminuserUebersichtComponent', () => {
  let component: AdminuserUebersichtComponent;
  let fixture: ComponentFixture<AdminuserUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminuserUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminuserUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
