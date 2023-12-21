import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopventasComponent } from './topventas.component';

describe('TopventasComponent', () => {
  let component: TopventasComponent;
  let fixture: ComponentFixture<TopventasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopventasComponent]
    });
    fixture = TestBed.createComponent(TopventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
