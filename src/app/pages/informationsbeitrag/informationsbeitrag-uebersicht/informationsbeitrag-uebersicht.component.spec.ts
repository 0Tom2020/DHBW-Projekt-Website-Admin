import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsbeitragUebersichtComponent } from './informationsbeitrag-uebersicht.component';

describe('InformationsbeitragBearbeitenComponent', () => {
  let component: InformationsbeitragUebersichtComponent;
  let fixture: ComponentFixture<InformationsbeitragUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsbeitragUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsbeitragUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
