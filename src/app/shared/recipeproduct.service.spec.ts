import { TestBed } from '@angular/core/testing';

import { RecipeproductService } from './recipeproduct.service';

describe('RecipeproductService', () => {
  let service: RecipeproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
