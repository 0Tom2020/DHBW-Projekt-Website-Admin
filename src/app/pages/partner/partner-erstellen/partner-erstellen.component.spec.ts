import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerErstellenComponent } from './partner-erstellen.component';

describe('PartnerErstellenComponent', () => {
  let component: PartnerErstellenComponent;
  let fixture: ComponentFixture<PartnerErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerErstellenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
