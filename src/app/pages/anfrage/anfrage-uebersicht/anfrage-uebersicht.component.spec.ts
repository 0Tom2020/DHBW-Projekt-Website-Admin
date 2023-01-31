import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnfrageUebersichtComponent } from './anfrage-uebersicht.component';

describe('AnfrageUebersichtComponent', () => {
  let component: AnfrageUebersichtComponent;
  let fixture: ComponentFixture<AnfrageUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnfrageUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnfrageUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
