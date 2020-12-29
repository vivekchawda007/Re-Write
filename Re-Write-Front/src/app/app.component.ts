import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  spinner;
  isLoggedIn$: Observable<boolean>;
  currentUser;
  constructor(private authService: AuthService,private router : Router) {
    
   }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

   

    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(
      result => { 
        if(result == true) {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          if(this.currentUser.currentUser.roleId == '1'){
            this.currentUser.currentUser.roleId = 'ADMIN'
          }else if(this.currentUser.currentUser.roleId == '2'){
            this.currentUser.currentUser.roleId = 'REGISTRAR'
          }
         else {
          this.currentUser.currentUser.roleId = 'REVIEVER'
         }
        }
      });
  }

  onLogout() {
    
    document.getElementById("myForceCancel").click();
    this.authService.logout();
  
  }

  navigateToAudit() {
    this.router.navigateByUrl("audit");
  }

  navigateToProfile(){
    this.router.navigateByUrl("profile");
  }
}
