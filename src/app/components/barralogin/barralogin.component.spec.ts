import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraloginComponent } from './barralogin.component';

describe('BarraloginComponent', () => {
  let component: BarraloginComponent;
  let fixture: ComponentFixture<BarraloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
