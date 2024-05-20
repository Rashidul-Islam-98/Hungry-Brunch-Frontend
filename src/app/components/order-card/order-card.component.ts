import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent{
  baseUrl = baseUrl;
  isUpdateStatus: boolean = false;
  isStatusClicked: boolean = false;
  updateStatus: string = "All";
  userRole: string = "";
  statusOptions: any = [
    {
      text: "Pending",
      value: 1
    },
    {
      text: "Confirmed",
      value: 2
    },
    {
      text: "Preparing",
      value: 3
    },
    {
      text: "PreparedToServe",
      value: 4
    },
    {
      text: "Served",
      value: 5
    },
    {
      text: "Paid",
      value: 6
    }
  ];

  @Input() order: any; 
  @Output() changeOrder: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private toastr: ToastrService, private userService: UserService){}

  ngOnInit() {
    this.userRole = this.userService.getUserRole();
  }

  onUpdateStatusMode (){
    this.isUpdateStatus = !this.isUpdateStatus;
  }
  
  onUpdateStatus(status: string, value: number){
    this.updateStatus = status;
    this.isStatusClicked = !this.isStatusClicked;
    this.http.put(`${baseUrl}order/update-status/${this.order.id}`,{
      "status": value
    }).subscribe(() => {
      this.changeOrder.emit();
    });
    this.isUpdateStatus = false;
  }

  onStatusClicked(){
    this.isStatusClicked = !this.isStatusClicked;
  }

  onDeleteCard(id: string){
    this.http.delete(`${baseUrl}order/delete/${id}`).subscribe(res => {
      this.toastr.success("Ok","Order deleted successfully.");
      this.changeOrder.emit();
    })
  }
}
