import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentenzugriffErstellenComponent } from './dokumentenzugriff-erstellen.component';

describe('DokumentenzugriffErstellenComponent', () => {
  let component: DokumentenzugriffErstellenComponent;
  let fixture: ComponentFixture<DokumentenzugriffErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DokumentenzugriffErstellenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DokumentenzugriffErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
