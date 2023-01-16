import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentenzugriffUebersichtComponent } from './dokumentenzugriff-uebersicht.component';

describe('DokumentenzugriffUebersichtComponent', () => {
  let component: DokumentenzugriffUebersichtComponent;
  let fixture: ComponentFixture<DokumentenzugriffUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DokumentenzugriffUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DokumentenzugriffUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
