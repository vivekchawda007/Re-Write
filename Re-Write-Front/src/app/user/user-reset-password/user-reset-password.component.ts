import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user'
import { ShareDataUser } from '../../models/shareDataUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css']
})
export class UserResetPasswordComponent implements OnInit {
  currentUser;
  user : User;
  data: ShareDataUser;
  constructor(
    private dialogRef: MatDialogRef<UserResetPasswordComponent>,
    private toastr : ToastrService,
    private userService: UserService,
    private toastrService : ToastrService,

    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }
  ngOnInit() {
    this.userService.getUser(this.data.id)
    .subscribe(result => {
      this.user = result as User;
      /*  var element = <HTMLInputElement>document.getElementById("modelFirstName");
      element.value = this.volunteer.volunteerInfo.firstName; 
       */
     
    },
      error => {
        this.toastr.error("Error while view volunteer. Please refresh page.")
        console.log("Error while viewing volunteer !");
      });
  }

  passwordReset() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user.modifiedBy = this.currentUser.currentUser.id;
    this.userService.resetPassword(this.user)
      .subscribe(result => {
        this.toastrService.success("Password Reset Successfull")
        this.dialogRef.close("PASSWORD_RESET");
      },
        error => {
          this.toastrService.error("Error while reset password")
          console.log("Error while reset password !");
        });    
  }

  close() {
    this.dialogRef.close();
  }
}