import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router,private authService : AuthService) {
    
  }
  currentUser;
  isUserPermission;
  auditTitle;
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser.currentUser.roleId == "1") {
      this.isUserPermission = true
    }else {
      this.isUserPermission = false;
    }

    if(this.currentUser.currentUser.roleId == "2") {
      this.auditTitle = "Report";
    }else {
      this.auditTitle = "Audit";
    }
  }
  navigateToAddUser() {
    document.getElementById("accorId2").click();
    this.router.navigateByUrl("user");
  }

  navigateToAddVolunteer() {
    document.getElementById("accorId1").click();
    this.router.navigateByUrl("volunteer");
  }

  navigateToDashboard() {
    this.router.navigateByUrl("dashboard");
  }
  navigateToAudit() {
    document.getElementById("accorId3").click();
    this.router.navigateByUrl("audit")
  }
}
