import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(private orderService: OrderService, private foodService: FoodService){}

  onConfirmOrder(){
    this.orderService.isOrderConfirmed.next(false);
    this.foodService.deleteAllFoods();
  }
}
