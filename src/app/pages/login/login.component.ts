import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { baseUrl } from '../../../environments/environment';
import { IAuthResponse } from 'src/app/models/auth-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;
  authResponse: any = {
    user: {},
    token: ''
  };
  isError: boolean = false;
  username: string = "rashidul@mail.com";
  password: string = "Rashidul@123";

  constructor(private http: HttpClient,
    private authService: AuthService) { }


  onSubmit() {
    this.isLoading = true;
    this.http.post<IAuthResponse>(`${baseUrl}auth/login`,
      {
        username: this.username,
        password: this.password
      }).subscribe(response => {
        this.authService.login(response);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.isError = true;
      })
  }
}
