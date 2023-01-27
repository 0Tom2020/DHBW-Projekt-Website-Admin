import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserErstellenComponent } from './adminuser-erstellen.component';

describe('AdminuserErstellenComponent', () => {
  let component: AdminuserErstellenComponent;
  let fixture: ComponentFixture<AdminuserErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminuserErstellenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminuserErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
