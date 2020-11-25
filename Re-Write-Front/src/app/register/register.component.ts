import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  submitted = false;
  addUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      emailAddress: ['', Validators.required]
    });
  }

  get f() {
    return this.addUserForm.controls;
  }

  addUser() {
    this.submitted = true;
    console.log(this.f.firstName.value + " " + this.f.lastName.value + " " + this.f.contactNumber.value);
    const user: User = new User();
    user.firstName = this.f.firstName.value;
    user.lastName = this.f.lastName.value;
    user.contactNumber = this.f.contactNumber.value;
    user.emailId = this.f.emailAddress.value;

    this.userService.addUser(user)
      .subscribe(result => {
        alert(result)
        /*  this.loading = false;
         this.getGroups();
         $('#myModal').modal('hide');*/
         
        /*  this.msgs = [];
         this.msgs.push({severity:'error', summary:'Error', detail:"Hii"});  */
      },
        error => {
          alert(error);
          /*  $('#myModal').modal('hide');
           this.msgs = [];
           this.msgs.push({
             severity: 'error',
             summary: 'Error',
             detail: 'Error While Saving Group'
           })
         }); */
        });
  }
}