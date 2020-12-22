import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Volunteer } from '../../models/volunteer'
import { ShareDataVolunteer } from '../../models/shareDataVolunteer';
import { VolunteerService } from '../../services/volunteer.service';
import { UserService } from '../../services/user.service'
import { User } from '../../models/user'
import { ShareDataUser } from '../../models/shareDataUser'

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  user;
  currentUser;
  data: ShareDataUser;
  constructor(
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    private toastr : ToastrService,
    private userService: UserService,


    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }
  ngOnInit() {
    this.userService.getUser(this.data.id)
    .subscribe(result => {
      this.user = result;
     
    },
      error => {
        this.toastr.error("Error while view volunteer. Please refresh page.")
        console.log("Error while viewing volunteer !");
      });
  }

  deleteVolunteer() {
    const user : User = new User();
    user.id = this.user.id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    user.modifiedBy = this.currentUser.currentUser.id;
    this.userService.deleteUser(user)
      .subscribe(result => {
        this.toastr.success("User Delete Successfull")
        this.dialogRef.close("PASSWORD_RESET");
      },
        error => {
          this.toastr.error("Error while delete user")
          console.log("Error while delete user!");
        });    
  }

  close() {
    this.dialogRef.close();
  }
}