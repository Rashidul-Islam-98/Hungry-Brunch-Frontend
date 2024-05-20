import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ISaveFood } from 'src/app/models/save-food.model';
import { FoodService } from 'src/app/services/food.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  navbarOpen: boolean = false;
  cartOpen: boolean = false;
  totalOrders: number = 0;

  constructor(private foodService: FoodService,
    private menuService: MenuService){}

  ngOnInit(){
    this.foodService.orderedFoods.subscribe((orderedFoods: ISaveFood[]) => {
      this.totalOrders = orderedFoods.length;
    });

    this.foodService.isCartOpen.subscribe(response => {
      this.cartOpen = response;
    })

    this.menuService.isSidebarOpen.subscribe(response => {
      this.navbarOpen = response;
    })
  }

  onNavbarToggle(){
    this.menuService.isSidebarOpen.next(!this.navbarOpen);
  }

  onCartToggle(){
    this.foodService.isCartOpen.next(!this.cartOpen);
  }
}
