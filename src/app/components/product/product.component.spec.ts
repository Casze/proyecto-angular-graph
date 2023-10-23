import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let controller: ApolloTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [ApolloTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    controller = TestBed.inject(ApolloTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should return some data', async () => {
    component.loadProducts();
    fixture.detectChanges();

    setTimeout((done) => {
      fixture.detectChanges();
      expect(component.getAllProducts).toBeTruthy();
      done();
    }, 1000);
  });
  it('it should return users', async () => {
    component.loadUsers();
    fixture.detectChanges();

    setTimeout((done) => {
      fixture.detectChanges();
      expect(component.getAllUsers).toBeTruthy();
      done();
    }, 1000);
  });
});
