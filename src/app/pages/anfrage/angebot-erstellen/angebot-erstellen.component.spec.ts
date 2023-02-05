import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngebotErstellenComponent } from './angebot-erstellen.component';

describe('AngebotErstellenComponent', () => {
  let component: AngebotErstellenComponent;
  let fixture: ComponentFixture<AngebotErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngebotErstellenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngebotErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
