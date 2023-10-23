import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Apollo, ApolloModule } from 'apollo-angular';
import { AppModule } from 'src/app/app.module';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [Apollo],
      imports: [ApolloTestingModule],
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
