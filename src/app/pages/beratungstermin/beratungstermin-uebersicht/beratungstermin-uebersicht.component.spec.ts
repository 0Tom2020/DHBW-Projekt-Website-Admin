import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeratungsterminUebersichtComponent } from './beratungstermin-uebersicht.component';

describe('BeratungsterminUebersichtComponent', () => {
  let component: BeratungsterminUebersichtComponent;
  let fixture: ComponentFixture<BeratungsterminUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeratungsterminUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeratungsterminUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
