import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  navigateToAddUser() {
    document.getElementById("accorId").click();
    this.router.navigateByUrl("register");
  }

  NavigateToAddUnit() {
    document.getElementById("accorId").click();
    this.router.navigateByUrl("unit");
  }

  navigateToDashboard() {
    this.router.navigateByUrl("dashboard");
  }
}
