import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentenzugriffBearbeitenComponent } from './dokumentenzugriff-bearbeiten.component';

describe('DokumentenzugriffBearbeitenComponent', () => {
  let component: DokumentenzugriffBearbeitenComponent;
  let fixture: ComponentFixture<DokumentenzugriffBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DokumentenzugriffBearbeitenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DokumentenzugriffBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
