import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaschineErstellenComponent } from './maschine-erstellen.component';

describe('MaschineErstellenComponent', () => {
  let component: MaschineErstellenComponent;
  let fixture: ComponentFixture<MaschineErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaschineErstellenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaschineErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
