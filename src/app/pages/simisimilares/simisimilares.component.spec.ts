import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimisimilaresComponent } from './simisimilares.component';

describe('SimisimilaresComponent', () => {
  let component: SimisimilaresComponent;
  let fixture: ComponentFixture<SimisimilaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimisimilaresComponent]
    });
    fixture = TestBed.createComponent(SimisimilaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
