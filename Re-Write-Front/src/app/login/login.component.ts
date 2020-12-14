import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment'
import { ShareDataUser } from "../models/shareDataUser";
import { User } from "../models/user";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { AddUserComponent } from "../user/add-user/add-user.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
declare var jquery: any;
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  firstName: string;
  currentUser;
  jol: Boolean = false;
  loginForm: FormGroup;
  users;
  resetPasswordForm: FormGroup;
  resetPasswordModal: Boolean;
  passwordChanged: String;
  savedUserId: number;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) { }

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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.loginUser(user).subscribe(
      result => {

        const map = new Map(Object.entries(result));
        if (map.get("userName") == "NO_USER_FOUND") {
          this.toastrService.error("User name and/or password is wrong.")
        } else {
          const now = new Date()
          const item = {
            'currentUser': result,
            expiry: now.getTime() + 600000,
          }
          localStorage.setItem("currentUser", JSON.stringify(item));
          if (map.get("new") == true) {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.width = "20%"
            dialogConfig.hasBackdrop = true;
            dialogConfig.closeOnNavigation = true;
            dialogConfig.autoFocus = true;
            const shareData: ShareDataUser = new ShareDataUser();
            shareData.id = map.get("id");
            shareData.password =  this.f.password.value;
            dialogConfig.data = shareData;
            this.dialog.open(ForgotPasswordComponent, dialogConfig).afterClosed().subscribe(result => {
              if (result != null) {
                localStorage.removeItem("currentUser");
                this.authService.logout();
              }
            });
          } else {
            this.authService.login();
          }
        }
      },
      error => {
        console.log(error);
        this.toastrService.error("Looks like internal server error at backend or backend is down.")
      }
    );
  }
  openForgotPasswordModel() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "20%"
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ForgotPasswordComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {

      }
    });
  }
}
