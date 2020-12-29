import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUser: User;
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private userService: UserService) {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //    this.isLoggedIn = this.authService.isLoggedIn;
    if (this.currentUser) {
      this.loggedIn.next(true);
    }
  }

  ngOnInit() {

  }


  login() {
    this.loggedIn.next(true);
    this.router.navigate(["/"]);

  }

  logout() {
    localStorage.removeItem("currentUser");
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }
}
