import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  getEmployeeResponse: any;
  employees: any[] = [];
  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  userRole: string = "";

  constructor(private http: HttpClient, private userService: UserService){}

  ngOnInit(){
    this.loadEmployeeData();
    this.userRole = this.userService.getUserRole();
  }

  loadEmployeeData(){
    this.isLoading = true;
    let queryParams = new HttpParams().append("pageNumber",this.pageNumber).append("pageSize",this.pageSize);
    this.http.get<any>(`${baseUrl}employee/datatable`, {params:queryParams}).subscribe(res=>{
      this.getEmployeeResponse = res;
      this.employees = res.data;
      this.isLoading = false;
    })
  }

  onDelete(id: string){
    this.isLoading
    this.http.delete(`${baseUrl}employee/delete/${id}`).subscribe(res=>{
      this.loadEmployeeData();
    });
  }

  onChangePage(page: number){
    this.pageNumber+=page;
    this.loadEmployeeData();
  }
}
