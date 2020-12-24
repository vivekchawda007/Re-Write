import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

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

  navigateToProfile(){
    this.router.navigateByUrl("profile");
  }
}
