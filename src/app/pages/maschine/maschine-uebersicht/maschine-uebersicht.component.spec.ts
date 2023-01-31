import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaschineUebersichtComponent } from './maschine-uebersicht.component';

describe('MaschineUebersichtComponent', () => {
  let component: MaschineUebersichtComponent;
  let fixture: ComponentFixture<MaschineUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaschineUebersichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaschineUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
