import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ITable } from 'src/app/models/table.model';
import { TableService } from 'src/app/services/table.service';
import { UserService } from 'src/app/services/user.service';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  getTableResponse: any;
  tables: any = [];
  isLoading: boolean = false;
  isOccupied: boolean = false;
  isAddEmployeeMode: boolean = false;
  isSureToDelete: boolean = false;
  employeeId: string = "";
  pageNumber: number = 1;
  pageSize: number = 10;
  show: boolean = true;
  userRole: string = "";

  constructor( private tableService: TableService, private userService: UserService, private toastr: ToastrService,private http: HttpClient){}

  ngOnInit() {
    this.isLoading = true;
    this.loadTableData();
    this.userRole = this.userService.getUserRole();
    this.tableService.isAddEmployeeMode.subscribe(res=>{
      this.isAddEmployeeMode = res;
    })
  }

  onDelete(id: number){
    this.tableService.deleteTable(id).subscribe(res=>{
      this.toastr.success("Ok!","Table is deleted.");
     this.loadTableData();
    });
  }

  onAddEmployeeToTable(table: ITable) {
    this.tableService.table.next(table);
    this.tableService.isAddEmployeeMode.next(true);
  }

  loadTableData(){
    this.isLoading = true;
    let queryParams = new HttpParams().append("pageNumber",this.pageNumber).append("pageSize",this.pageSize);
    this.http.get<any>(`${baseUrl}table/datatable`, {params:queryParams}).subscribe(res=>{
      this.getTableResponse = res;
      this.tables = res.data;
      this.isLoading = false;
    })
  }

  onClickDeleteEmployee(id: string){
    this.isSureToDelete = true;
    this.employeeId = id;
  }

  onDeleteEmployee() {
    this.isSureToDelete = false;
    this.http.delete(`${baseUrl}employee-table/delete/${this.employeeId}`).subscribe(data => {
      this.loadTableData();
    });
  }

  onCancelDelete() {
    this.isSureToDelete = false;
  }

  onChangePage(page: number){
    this.pageNumber+=page;
    this.loadTableData();
  }
}