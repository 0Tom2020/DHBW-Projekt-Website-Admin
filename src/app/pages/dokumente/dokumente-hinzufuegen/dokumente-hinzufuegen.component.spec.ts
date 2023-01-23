import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumenteHinzufuegenComponent } from './dokumente-hinzufuegen.component';

describe('DokumenteHinzufuegenComponent', () => {
  let component: DokumenteHinzufuegenComponent;
  let fixture: ComponentFixture<DokumenteHinzufuegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DokumenteHinzufuegenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DokumenteHinzufuegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
