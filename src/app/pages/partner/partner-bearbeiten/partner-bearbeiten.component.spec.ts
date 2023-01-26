import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerBearbeitenComponent } from './partner-bearbeiten.component';

describe('PartnerBearbeitenComponent', () => {
  let component: PartnerBearbeitenComponent;
  let fixture: ComponentFixture<PartnerBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerBearbeitenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
