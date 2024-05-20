import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ISaveFood } from 'src/app/models/save-food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent {
  isClicked: boolean = false;
  orderedFoods: ISaveFood[] = [];
  @Input() food!: ISaveFood;

  constructor(private foodService: FoodService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.foodService.orderedFoods.subscribe((data) => {
      this.orderedFoods = data;
      if(this.orderedFoods.includes(this.food)) {
        this.isClicked = true;
      } else {
        this.isClicked = false;
      }
    });
  }

  onOrderFood(food: ISaveFood) {
    this.foodService.orderFood(food);
    this.toastr.success("Food Added to Cart.", "Success!");
  }
}
