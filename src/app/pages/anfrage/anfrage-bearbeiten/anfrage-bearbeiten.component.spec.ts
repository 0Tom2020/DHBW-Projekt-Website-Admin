import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnfrageBearbeitenComponent } from './anfrage-bearbeiten.component';

describe('AnfrageBearbeitenComponent', () => {
  let component: AnfrageBearbeitenComponent;
  let fixture: ComponentFixture<AnfrageBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnfrageBearbeitenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnfrageBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
