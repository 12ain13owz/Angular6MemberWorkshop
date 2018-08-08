import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UicardsComponent } from './uicards.component';

describe('UicardsComponent', () => {
  let component: UicardsComponent;
  let fixture: ComponentFixture<UicardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UicardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UicardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
