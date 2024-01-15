import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientaddComponent } from './ingredientadd.component';

describe('IngredientaddComponent', () => {
  let component: IngredientaddComponent;
  let fixture: ComponentFixture<IngredientaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
