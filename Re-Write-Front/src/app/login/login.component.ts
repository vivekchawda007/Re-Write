import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../models/user";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

declare var jquery: any;
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  firstName: string;
  jol: Boolean = false;
  loginForm: FormGroup;
  resetPasswordForm: FormGroup;
  resetPasswordModal: Boolean;
  passwordChanged: String;
  savedUserId: number;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.resetPasswordForm = this.formBuilder.group({
      firstPassword: ["", Validators.required],
      secondPassword: ["", Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  get g() {
    return this.resetPasswordForm.controls;
  }

  resetPassword() {
    const user: User = new User();
   /*  user.emailId = this.f.userName.value;
    user.password = this.g.secondPassword.value;
    user.userId = this.savedUserId;
    user.passwordChanged = 1; */
    this.userService.updateUser(user).subscribe(
      result => {
        this.authService.login();
      },
      error => {
        alert("Something Wrong While Updating. please contact Admin");
      }
    );
  }

  onSubmit() {
    const user: User = new User();
    user.userName = this.f.userName.value;
     user.password = this.f.password.value;
    this.userService.loginUser(user).subscribe(
      result => {
        const map = new Map(Object.entries(result));
       
       /*  if (this.passwordChanged != "1") {
          $("#myModal").modal("show");
        }  */ {
          localStorage.setItem("currentUser", JSON.stringify(result));
          this.authService.login();
        }
      },
      error => {
        console.log(error);
        alert("Wrong Username And/Or Password. Please Try Again !");
      }
    );
  }
}
