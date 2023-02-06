import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeratungsterminBearbeitenComponent } from './beratungstermin-bearbeiten.component';

describe('BeratungsterminBearbeitenComponent', () => {
  let component: BeratungsterminBearbeitenComponent;
  let fixture: ComponentFixture<BeratungsterminBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeratungsterminBearbeitenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeratungsterminBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
