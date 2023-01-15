import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsbeitragErstellenComponent } from './informationsbeitrag-erstellen.component';

describe('InformationsbeitragErstellenComponent', () => {
  let component: InformationsbeitragErstellenComponent;
  let fixture: ComponentFixture<InformationsbeitragErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationsbeitragErstellenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsbeitragErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
