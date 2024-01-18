import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersaddComponent } from './suppliersadd.component';

describe('SuppliersaddComponent', () => {
  let component: SuppliersaddComponent;
  let fixture: ComponentFixture<SuppliersaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppliersaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
