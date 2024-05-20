import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bss-restaurant';

  constructor(private authService: AuthService){
  }

  ngOnInit(){
    this.authService.autoLogin();
    initFlowbite();
  }
}
