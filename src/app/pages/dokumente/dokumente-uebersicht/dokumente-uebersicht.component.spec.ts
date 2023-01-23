import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumenteUebersichtComponent } from './dokumente-uebersicht.component';

describe('DokumenteUebersichtComponent', () => {
  let component: DokumenteUebersichtComponent;
  let fixture: ComponentFixture<DokumenteUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DokumenteUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DokumenteUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
