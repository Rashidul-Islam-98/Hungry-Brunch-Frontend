import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  isLoading: boolean = false;
  getAllOrdersResponse: any;
  allorders: any;
  baseUrl = baseUrl;
  searchStatus: number = 0;
  searchText: string = "All";
  statusOptions: any = [
    {
      text: "All",
      value: 0
    },
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
  Page: number = 1;
  isSearchClicked: boolean = false;

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.isLoading = true;
    this.loadOrderData();
  }

  onOrder(order: any){
    return order;
  }

  loadOrderData(){
    let queryParams = new HttpParams().append("page", this.Page).append("search",this.searchStatus);
    this.http.get<any>(`${baseUrl}order/datatable`, {params:queryParams}).subscribe(res=>{
      this.getAllOrdersResponse = res;
      this.Page = this.getAllOrdersResponse.current_page;
      this.allorders = res.data;
      this.isLoading = false;
    })
  }

  onSearchClicked(){
    this.isSearchClicked = !this.isSearchClicked;
  }

  onSearchSelect(searchType: any){
    this.searchStatus = searchType.value;
    this.searchText = searchType.text;
    this.isSearchClicked = !this.isSearchClicked;
    this.isLoading = true;
    this.loadOrderData();
  }

  onPageChange(event: number): void {
    this.Page = event;
    this.loadOrderData();
  }
}
