import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeratungsterminErstellenComponent } from './beratungstermin-erstellen.component';

describe('BeratungsterminErstellenComponent', () => {
  let component: BeratungsterminErstellenComponent;
  let fixture: ComponentFixture<BeratungsterminErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeratungsterminErstellenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeratungsterminErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
