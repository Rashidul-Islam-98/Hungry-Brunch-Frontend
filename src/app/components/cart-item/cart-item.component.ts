import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit{
  @Input() food: any;
  unitPrice: number = 0;
  @Output() priceChanged = new EventEmitter<{changedPrice: number,food: any,quantity: number}>();

  constructor(private foodService: FoodService){
  }

  ngOnInit(){
    this.unitPrice = this.food.discountPrice !== 0 ? this.food.discountPrice : this.food.price;
  }

  countFood: number = 1;

  onAddFood(){
    this.countFood++;
    this.priceChanged.emit({ changedPrice: this.unitPrice,food: this.food, quantity: 1 });
  }

  onRemoveFood(){
    this.countFood--;
    this.priceChanged.emit({ changedPrice: -this.unitPrice, food: this.food, quantity: -1 });
  }

  onDeleteFood(){
    this.priceChanged.emit({ changedPrice: -(this.unitPrice*this.countFood),food: this.food, quantity: -this.countFood });
    this.foodService.deleteFood(this.food);
    this.food = null;
  }
}
