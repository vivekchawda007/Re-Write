import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { ShareDataUser } from '../../models/shareDataUser';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  constructor(

    private dialogRef: MatDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    private _ngZone: NgZone,
    private toastr: ToastrService,
    private roleService: RoleService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  Volunteer;
  checked = false;
  editUserForm: FormGroup;
  primaryDiv = false;
  secondaryDiv = true;
  submitted = true;
  currentUser;
  fingerDataImage;
  pictureClicked = false;
  liveVideo = true;
  imageData;
  fingerPrintData;
  manufacturer: string;
  model: string;
  serialNumber: string;
  user;
  roles;
  data: ShareDataUser;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  ngOnInit() {

    this.editUserForm = this.formBuilder.group({
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
          this.toastr.error("Error while getting user. Please contact admin.")
          console.log("Error while getting user !");
        });
    this.userService.getUser(this.data.id)
      .subscribe(result => {
        this.user = result;
        /*  var element = <HTMLInputElement>document.getElementById("modelFirstName");
        element.value = this.volunteer.volunteerInfo.firstName; 
         */
        this.editUserForm.controls['firstName'].setValue(this.user.firstName);
        this.editUserForm.controls['lastName'].setValue(this.user.lastName);
        this.editUserForm.controls['userName'].setValue(this.user.userName);
        this.editUserForm.controls['role'].setValue(this.user.roleId);
        console.log("User View Completed !");
      },
        error => {
          
          this.toastr.error("Error while view user. Please refresh page.")
          console.log("Error while viewing user !");
        });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editUserForm.controls[controlName].hasError(errorName);
  }
  get f() {
    return this.editUserForm.controls;
  }
  save() {
    this.submitted = false;

    const user: User = new User();
    user.firstName = this.f.firstName.value;
    user.lastName = this.f.lastName.value;
    user.userName = this.f.userName.value;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    user.modifiedBy = this.currentUser.currentUser.id;
    user.role = this.f.role.value;
    user.id = this.data.id;
    this.userService.updateUser(user)
      .subscribe(result => {
        console.log("User Successfully Updated !");
        this.toastr.success("User updated successfully !")
        this.dialogRef.close("UPDATE_USER");

      },
        error => {
          this.toastr.error("Error while updating user. Please contact admin.")
          console.log("Error while updating user !");
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
