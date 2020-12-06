import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { FingerprintService } from '../../fingerprint.service';
import { get } from 'scriptjs';
import Webcam from 'webcam-easy';
import { User } from '../../models/user'
import { UserService } from '../../services/user.service'
import { RoleService } from '../../role.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private fingerPrintService: FingerprintService,
    private _ngZone: NgZone,
    private toastrService: ToastrService,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) data) {

  }
  Volunteer;
  checked = false;
  addUserForm: FormGroup;

  secondaryDiv = true;
  submitted = true;
  data: ShareData;
  fingerDataImage;
  pictureClicked = false;
  liveVideo = true;
  imageData;
  roles;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
 
  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.roleService.getAllRoles()
    .subscribe(result => {
    this.roles = result; 
    },
      error => {
        this.toastrService.error("Error while saving volunteer. Please contact admin.")
        console.log("Error while creating survey !");
      });
  //var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
  //element.disabled = false;
}
  

  public hasError = (controlName: string, errorName: string) => {
    return this.addUserForm.controls[controlName].hasError(errorName);
  }
  get f() {
    return this.addUserForm.controls;
  }
  save() {
    this.submitted = false;

    const user: User = new User();
    user.firstName = this.f.firstName.value;
    user.lastName = this.f.lastName.value;
    user.userName = this.f.userName.value;
    user.createdBy = "82ebc384-eaa2-47a6-80f4-9dba7244c336";
    user.role = this.f.role.value;
    this.userService.addUser(user)
      .subscribe(result => {
        console.log("User Successfully Added !");
        this.toastrService.success("User added successfully !")
        this.dialogRef.close("USER_ADDED");

      },
        error => {
          this.toastrService.error("Error while saving user. Please contact admin.")
          console.log("Error while creating user !");
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
