import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngebotUebersichtComponent } from './angebot-uebersicht.component';

describe('AngebotUebersichtComponent', () => {
  let component: AngebotUebersichtComponent;
  let fixture: ComponentFixture<AngebotUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngebotUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngebotUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
