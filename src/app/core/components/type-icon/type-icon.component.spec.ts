import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeIconComponent } from './type-icon.component';

describe('TypeIconComponent', () => {
  let component: TypeIconComponent;
  let fixture: ComponentFixture<TypeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
