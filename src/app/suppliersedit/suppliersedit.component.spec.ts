import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierseditComponent } from './suppliersedit.component';

describe('SupplierseditComponent', () => {
  let component: SupplierseditComponent;
  let fixture: ComponentFixture<SupplierseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierseditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
