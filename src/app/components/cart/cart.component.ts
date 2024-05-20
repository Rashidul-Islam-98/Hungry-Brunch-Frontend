import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ISaveFood } from 'src/app/models/save-food.model';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
import { TableService } from 'src/app/services/table.service';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  baseUrl = baseUrl;
  table: any;
  orderedFoods: ISaveFood[] = [];
  isOrderFoodsExist: boolean = false;
  isOrderPlaced: boolean = false;
  totalPrice: number = 0;
  sendFoodDetails: any = [
    {
      foodId: 0,
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0
    }
  ];
  
  constructor(private foodService: FoodService, 
    private tableService: TableService,
    private http: HttpClient,
    private orderService: OrderService) { }

  ngOnInit() {
    this.tableService.table.subscribe(data => {
      this.table = data;
    })

    this.foodService.orderedFoods.subscribe((response) => {
      this.orderedFoods = response;
    });
    
    if (this.orderedFoods.length > 0) {
      for (let orderFood of this.orderedFoods) {
        const unitPrice = orderFood.discountPrice !== 0 ? orderFood.discountPrice : orderFood.price;
        this.sendFoodDetails.push(
          {
            foodId: orderFood.id,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice
          }
        )
        this.totalPrice += unitPrice;
      }
      this.isOrderFoodsExist = true;
    }
  }

  onCloseCart() {
    this.foodService.isCartOpen.next(false);
  }

  onModalClick(event: Event) {
    event.stopPropagation();
  }

  onOrderFood(food: any) {
    return food;
  }

  onTotalPriceChanged(event: any) {
    this.totalPrice += event.changedPrice;
    for(let sendFoodDetail of this.sendFoodDetails) {
      if(sendFoodDetail.foodId === event.food.id) {
        sendFoodDetail.quantity += event.quantity;
        sendFoodDetail.totalPrice += (sendFoodDetail.unitPrice*event.quantity);
      }
    }
  }

  onSubmitOrder() {
    this.orderService.isOrderConfirmed.next(true);
    this.foodService.isCartOpen.next(false);
    this.isOrderPlaced = false;
    this.sendFoodDetails = this.sendFoodDetails.filter((item: any )=> item.foodId !== 0);
    this.http.post(`${baseUrl}order/create`,{
      tableId: this.table.id,
      orderNumber: Date.now(),
      amount: this.totalPrice,
      items: this.sendFoodDetails
    }).subscribe(response => {
      this.orderedFoods = [];
      this.foodService.isCartOpen.next(false);
    })
  }
}
