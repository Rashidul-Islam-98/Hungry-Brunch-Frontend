import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AddEmployeeComponent } from './pages/employee/add-employee/add-employee.component';
import { TableListComponent } from './pages/table/table-list/table-list.component';
import { AddTableComponent } from './pages/table/add-table/add-table.component';
import { FoodListComponent } from './pages/food/food-list/food-list.component';
import { AddFoodComponent } from './pages/food/add-food/add-food.component';
import { OrderFoodListComponent } from './pages/order-food/order-food-list/order-food-list.component';
import { AllOrdersComponent } from './pages/all-orders/all-orders.component';
import { UpdateEmployeeComponent } from './pages/employee/update-employee/update-employee.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: "", 
    component: MainLayoutComponent, 
    canActivate: [AuthGuard], 
    children: [
      { path: "", component: WelcomeComponent} ,
      { path: "employees", component: EmployeeListComponent },
      { path: "add-employee", component: AddEmployeeComponent },
      { path: "tables", component: TableListComponent },
      { path: "add-table", component: AddTableComponent },
      { path: "update-employee/:employeeId", component: UpdateEmployeeComponent },
      { path: "foods", component: FoodListComponent },
      { path: "add-food", component: AddFoodComponent },
      { path: "order-food", component: OrderFoodListComponent },
      { path: "all-orders", component: AllOrdersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
