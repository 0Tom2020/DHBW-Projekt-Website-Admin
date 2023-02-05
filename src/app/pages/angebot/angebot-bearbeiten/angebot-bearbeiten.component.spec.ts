import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngebotBearbeitenComponent } from './angebot-bearbeiten.component';

describe('AngebotBearbeitenComponent', () => {
  let component: AngebotBearbeitenComponent;
  let fixture: ComponentFixture<AngebotBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngebotBearbeitenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngebotBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
