import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminareBearbeitenComponent } from './seminare-bearbeiten.component';

describe('SeminareBearbeitenComponent', () => {
  let component: SeminareBearbeitenComponent;
  let fixture: ComponentFixture<SeminareBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminareBearbeitenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminareBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
