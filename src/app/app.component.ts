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
  currentUser: User;
  constructor(private authService: AuthService,private router : Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  pageTop() {
    alert("Ho")
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
