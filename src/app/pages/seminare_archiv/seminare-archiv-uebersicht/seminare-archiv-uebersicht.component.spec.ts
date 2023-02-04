import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminareArchivUebersichtComponent } from './seminare-archiv-uebersicht.component';

describe('SeminareArchivUebersichtComponent', () => {
  let component: SeminareArchivUebersichtComponent;
  let fixture: ComponentFixture<SeminareArchivUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminareArchivUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminareArchivUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
