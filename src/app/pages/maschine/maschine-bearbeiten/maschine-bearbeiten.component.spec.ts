import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaschineBearbeitenComponent } from './maschine-bearbeiten.component';

describe('MaschineBearbeitenComponent', () => {
  let component: MaschineBearbeitenComponent;
  let fixture: ComponentFixture<MaschineBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaschineBearbeitenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaschineBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
