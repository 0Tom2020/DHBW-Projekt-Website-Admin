import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarErstellenComponent } from './seminar-erstellen.component';

describe('SeminarErstellenComponent', () => {
  let component: SeminarErstellenComponent;
  let fixture: ComponentFixture<SeminarErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminarErstellenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeminarErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
