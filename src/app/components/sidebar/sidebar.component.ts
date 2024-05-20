import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  userId: string | undefined;
  user: any = null;

  constructor(private authService: AuthService,
    private userService: UserService,
    private menuService: MenuService){}

  ngOnInit(): void {
    this.userId = this.authService.getUser()?.id;
    if(this.userId) {
      this.userService.getUser(this.userId).subscribe(response => {
        this.user = response;
      });
    }
  }

  onLogOut(){
    this.authService.logout();
  }

  onClickMenu(){
    this.menuService.isSidebarOpen.next(false);
  }

  onSidebarClick(event: Event) {
    event.stopPropagation();
  }
  
}

