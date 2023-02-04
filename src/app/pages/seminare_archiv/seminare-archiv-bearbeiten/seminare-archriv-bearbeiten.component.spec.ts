import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminareArchrivBearbeitenComponent } from './seminare-archriv-bearbeiten.component';

describe('SeminareArchrivBearbeitenComponent', () => {
  let component: SeminareArchrivBearbeitenComponent;
  let fixture: ComponentFixture<SeminareArchrivBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminareArchrivBearbeitenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminareArchrivBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
