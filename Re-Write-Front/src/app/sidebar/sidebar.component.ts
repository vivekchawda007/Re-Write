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
}
