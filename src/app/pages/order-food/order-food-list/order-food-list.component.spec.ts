import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFoodListComponent } from './order-food-list.component';

describe('OrderFoodListComponent', () => {
  let component: OrderFoodListComponent;
  let fixture: ComponentFixture<OrderFoodListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderFoodListComponent]
    });
    fixture = TestBed.createComponent(OrderFoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
