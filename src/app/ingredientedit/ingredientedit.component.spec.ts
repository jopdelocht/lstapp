import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredienteditComponent } from './ingredientedit.component';

describe('IngredienteditComponent', () => {
  let component: IngredienteditComponent;
  let fixture: ComponentFixture<IngredienteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredienteditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredienteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
