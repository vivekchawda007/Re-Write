import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service';
declare var $:any;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  submitted = false;
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
  
  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

   
  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      roleName: ['', [Validators.required]],
      userName: ['', [Validators.required]]
    })
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