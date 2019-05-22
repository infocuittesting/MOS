import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarveldeskComponent } from './tarveldesk.component';

describe('TarveldeskComponent', () => {
  let component: TarveldeskComponent;
  let fixture: ComponentFixture<TarveldeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarveldeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarveldeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
