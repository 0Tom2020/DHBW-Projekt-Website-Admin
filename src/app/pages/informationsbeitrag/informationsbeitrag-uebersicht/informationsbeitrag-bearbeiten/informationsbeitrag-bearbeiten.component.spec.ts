import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsbeitragBearbeitenComponent } from './informationsbeitrag-bearbeiten.component';

describe('InformationsbeitragBearbeitenComponent', () => {
  let component: InformationsbeitragBearbeitenComponent;
  let fixture: ComponentFixture<InformationsbeitragBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsbeitragBearbeitenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsbeitragBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
