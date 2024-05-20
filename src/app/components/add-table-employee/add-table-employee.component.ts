import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TableService } from 'src/app/services/table.service';
import { baseUrl } from 'src/environments/environment';

interface TableEmployee {
  "id": string, 
  "name": string,
  "selected": boolean
}

@Component({
  selector: 'app-add-table-employee',
  templateUrl: './add-table-employee.component.html',
  styleUrls: ['./add-table-employee.component.css']
})
export class AddTableEmployeeComponent implements OnInit{
  isOpen: boolean = true;
  isAddingEmployee: boolean = false;
  table: any;
  employees: TableEmployee[] = [];
  addedEmployees: TableEmployee[] = [];
  postEmployees: { "employeeId": string, "tableId": number}[] = [];
  @Output() loadTable: EventEmitter<any> = new EventEmitter();

  constructor(private tableService: TableService, 
    private http: HttpClient,
    private toastr: ToastrService){}

  ngOnInit(){

    this.tableService.table.subscribe(res => {
      this.table = res;
    });

    this.http.get<any>(`${baseUrl}employee/get`).subscribe(res=>{
      const data: TableEmployee[] = res.data;
      data.forEach(item=>{
        let isExist = false;
        for(let employee of this.table.employees){
          if(item.name === employee.name){
            isExist = true;
            break;
          }
        }
        if(!isExist){
          this.employees.push({ id: item.id, name: item.name, selected: false});
        }
      })
    });

    this.tableService.isAddEmployeeMode.subscribe(res=>{
      this.isOpen = res;
    })
  }

  onClose(){
    this.tableService.isAddEmployeeMode.next(false);
  }

  onModalClick(event: Event) {
    event.stopPropagation();
  }

  onToggleIsAddingEmployee(){
    this.isAddingEmployee = !this.isAddingEmployee;
  }

  onChangeEmployee(employee: TableEmployee) {
    if (employee.selected) {
      this.addedEmployees.push(employee);
    } else {
      this.addedEmployees = this.addedEmployees.filter(item => item.selected);
    }
  }

  onAssign() {
    this.addedEmployees.forEach(addEmployee => {
      this.postEmployees.push({employeeId: addEmployee.id, tableId: this.table.id});
    });
    
    this.http.post(`${baseUrl}employee-table/create-range`,this.postEmployees).subscribe(response=>{
      this.toastr.success("Ok!","Employees Added.");
      this.tableService.isAddEmployeeMode.next(false);
      this.loadTable.emit();
    })
  }
}