import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsaddComponent } from './productsadd.component';

describe('ProductsaddComponent', () => {
  let component: ProductsaddComponent;
  let fixture: ComponentFixture<ProductsaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
