import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductseditComponent } from './productsedit.component';

describe('ProductseditComponent', () => {
  let component: ProductseditComponent;
  let fixture: ComponentFixture<ProductseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductseditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
