import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { AddEmployeeComponent } from './pages/employee/add-employee/add-employee.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { TableListComponent } from './pages/table/table-list/table-list.component';
import { AddTableEmployeeComponent } from './components/add-table-employee/add-table-employee.component';
import { AddTableComponent } from './pages/table/add-table/add-table.component';
import { FoodListComponent } from './pages/food/food-list/food-list.component';
import { AddFoodComponent } from './pages/food/add-food/add-food.component';
import { OrderFoodListComponent } from './pages/order-food/order-food-list/order-food-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { FoodItemComponent } from './components/food-item/food-item.component';
import { AllOrdersComponent } from './pages/all-orders/all-orders.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UpdateEmployeeComponent } from './pages/employee/update-employee/update-employee.component';
import { SubmittingLoaderComponent } from './shared/submitting-loader/submitting-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    HeaderComponent,
    WelcomeComponent,
    SpinnerComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    AddEmployeeComponent,
    TableListComponent,
    AddTableEmployeeComponent,
    AddTableComponent,
    FoodListComponent,
    AddFoodComponent,
    OrderFoodListComponent,
    CartComponent,
    CartItemComponent,
    FoodItemComponent,
    AllOrdersComponent,
    OrderCardComponent,
    ConfirmDialogComponent,
    UpdateEmployeeComponent,
    SubmittingLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    NgxPaginationModule,
    MatCheckboxModule,
    ToastrModule.forRoot({  
      timeOut: 1500,
      positionClass:'toast-top-right',  
      closeButton: true
      } 
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
