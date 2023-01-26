import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerUebersichtComponent } from './partner-uebersicht.component';

describe('PartnerUebersichtComponent', () => {
  let component: PartnerUebersichtComponent;
  let fixture: ComponentFixture<PartnerUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
