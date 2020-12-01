import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { FingerprintService } from '../../fingerprint.service';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service';
declare var $:any;
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
    private fingerPrintService: FingerprintService,
    private _ngZone: NgZone,
    private toastrService: ToastrService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) data) {

  }
  Volunteer;
  checked = false;
  addVolunteerForm: FormGroup;
  primaryDiv = true;
  secondaryDiv = false;
  submitted = true;
  data: ShareData;
  fingerDataImage;
  pictureClicked = false;
  liveVideo = true;
  imageData;

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  addUserForm: FormGroup;
  msgs = [];
  roles: any = [{
    'id':'4ff79590-0ec1-45cd-9c65-f0ad371943eb',
    'name' : 'Reviewer'
  },
  {
    'id':'4bf54a19-9bc8-44eb-8fba-abcc095f410b',
    'name' : 'Registrar'
  },
  {
    'id':'42e77ad4-32c0-4510-9703-cf27d9251d08',
    'name' : 'Volunteer'
  }];
  

   
  ngOnInit() {
    this.addVolunteerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: [''],
      address: [''],
    });

    
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.addVolunteerForm.controls[controlName].hasError(errorName);
  }
 
  get roleName() {
    return this.addUserForm.get('roleName');
  }
  get f() {
    return this.addUserForm.controls;
  }

  changeRole(e) {
    this.roleName.setValue(e.target.value, {
      onlySelf: true
    })
  }

  addUser() {
    this.submitted = true;
    const user: User = new User();
    user.userName = this.f.userName.value;
    user.role = this.f.roleName.value;
    this.userService.addUser(user)
      .subscribe(result => {
        alert(result)
        
         
         $('#myModal').modal('hide');
         
          this.msgs = [];
         this.msgs.push({severity:'error', summary:'Error', detail:"Hii"});  
      },
        error => {
          alert(error);
          $('#myModal').modal('hide');
           this.msgs = [];
           this.msgs.push({
             severity: 'error',
             summary: 'Error',
             detail: 'Error While Saving Group'
           })
         });
  }
}