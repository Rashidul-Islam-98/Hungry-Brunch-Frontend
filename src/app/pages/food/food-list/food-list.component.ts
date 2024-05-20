import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IGetFoods } from 'src/app/models/get-foods.model';
import { ISaveFood } from 'src/app/models/save-food.model';
import { UserService } from 'src/app/services/user.service';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-food',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  getFoodResponse: IGetFoods = {
    totalItems: 0,
    items: 0,
    from: 0,
    to: 0,
    totalPages: 0,
    currentPage: 0,
    itemPerPage: 0,
    data: []
  };
  foods: ISaveFood[] = [];
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  userRole: string = "";

  constructor(private http: HttpClient, private toastr: ToastrService, private userService: UserService){}

  ngOnInit(){
    this.loadFoodData();
    this.userRole = this.userService.getUserRole();
  }

  loadFoodData(){
    this.isLoading = true;
    let queryParams = new HttpParams().append("pageNumber",this.pageNumber).append("pageSize",this.pageSize);
    this.http.get<IGetFoods>(`${baseUrl}food/datatable`, {params:queryParams}).subscribe(res=>{
      this.getFoodResponse = res;
      this.foods = res.data;
      this.isLoading = false;
    })
  }

  onDelete(id: any){
    this.isLoading
    this.http.delete(`${baseUrl}food/delete/${id}`).subscribe(res=>{
      this.toastr.success("Ok!","Employee is deleted.");
      this.loadFoodData();
    });
  }

  onChangePage(page: number){
    this.pageNumber+=page;
    this.loadFoodData();
  }
}
