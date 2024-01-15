import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockeditComponent } from './stockedit.component';

describe('StockeditComponent', () => {
  let component: StockeditComponent;
  let fixture: ComponentFixture<StockeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
