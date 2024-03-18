import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelGameComponent } from './label-game.component';

describe('LabelGameComponent', () => {
  let component: LabelGameComponent;
  let fixture: ComponentFixture<LabelGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
