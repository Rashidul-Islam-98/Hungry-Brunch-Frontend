import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IGetFoods } from 'src/app/models/get-foods.model';
import { TableService } from 'src/app/services/table.service';
import { baseUrl } from 'src/environments/environment';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-order-food-list',
  templateUrl: './order-food-list.component.html',
  styleUrls: ['./order-food-list.component.css']
})
export class OrderFoodListComponent implements OnInit{
  isLoading = true;
  isTableSelected = false;
  tableNumber: number = 0;
  searchText: string = "";
  tables: any = [];
  foods: any = [];

  constructor(private tableService: TableService, 
    private http: HttpClient,
    private foodService: FoodService){}

  ngOnInit() {
    this.isLoading = true;
    this.loadTableData();
    this.loadFoodData();
  }

  loadTableData() {
    this.tableService.getTables().subscribe(res=>{
      this.tables = res.data;
      this.isLoading = false;
    });
  }

  loadFoodData(){
    let queryParams = new HttpParams().append("search",this.searchText);
    this.http.get<IGetFoods>(`${baseUrl}food/datatable`, {params:queryParams}).subscribe(res=>{
      this.foods = res.data;
      this.isLoading = false;
    })
  }

  tableSelected(table: any){
    this.isTableSelected = true;
    this.tableService.table.next(table);
    this.tableNumber = table.tableNumber;
    this.foodService.deleteAllFoods();
    this.loadFoodData();
  }

  onSearchFood(searchText: string){
    this.loadFoodData();
  }

  onOrderFood(food: any){
    return food;
  }
}
