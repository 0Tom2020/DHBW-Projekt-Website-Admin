import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminareUebersichtComponent } from './seminare-uebersicht.component';

describe('SeminareUebersichtComponent', () => {
  let component: SeminareUebersichtComponent;
  let fixture: ComponentFixture<SeminareUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminareUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminareUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
