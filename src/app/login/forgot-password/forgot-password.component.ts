import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ShareDataUser } from '../../models/shareDataUser'
import { User } from '../../models/user'
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  data: ShareDataUser;
  currentUser;
  constructor(private userService : UserService,private toastr : ToastrService,private dialogRef: MatDialogRef<ForgotPasswordComponent>,private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) data) {
      this.data = data; 
    this.forgotPasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required]
      });
      
  }

  ngOnInit(): void {
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName);
  }
  get f() {
    return this.forgotPasswordForm.controls;
  }

  save() {
    if(this.f.password.value != this.f.rePassword.value) {
      this.toastr.error("Both Password is not matching !")
      return;
    }
    if(this.f.oldPassword.value != this.data.password) {
      this.toastr.error("Old Password is wrong !")
      return;
    }

    const user: User = new User();
    user.id = this.data.id;
    user.password = this.f.password.value;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    user.modifiedBy = this.currentUser.currentUser.id;
    user.new = false;
    this.userService.updatePassword(user)
      .subscribe(result => {
        //console.log("User Successfully Added !");
        this.toastr.success("Password Updated succesfully !")
        this.dialogRef.close("USER_ADDED");

      },
        error => {
          this.toastr.error("Error while saving your password. Please contact admin.")
          //console.log("Error while creating user !");
        });
    //var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
    //element.disabled = false;
  }
  close() {
    this.dialogRef.close();
    /*  var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
     element.disabled = false; */
  }
}
