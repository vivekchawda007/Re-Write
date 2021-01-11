import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ShareDataUser } from '../../models/shareDataUser';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserResetPasswordComponent } from '../user-reset-password/user-reset-password.component';
import { AuthService } from '../../services/auth.service'
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { User } from '../../models/user'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users;
  user: User;
  spinner;
  currentUser;
  usersBackup;
  constructor( private authService : AuthService,private userService: UserService, private router: Router, private dialog: MatDialog, private toastr: ToastrService

  ) { 
    const itemStr = localStorage.getItem("currentUser")
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const item = JSON.parse(itemStr)
    const now = new Date();
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem("currentUser");
      this.authService.logout();
      location.reload();
    }
  }

  ngOnInit() {
    this.spinner = true;
    this.userService.getAllUser()
      .subscribe(result => {
        this.users = result as User[];
        
        for(var i = 0 ; i< this.users.length;i++) {
          if(this.users[i].roleId == '1'){
            this.users[i].roleId = 'Admin'
          }else if(this.users[i].roleId == '2'){
            this.users[i].roleId = 'Registrar'
          }else if(this.users[i].roleId == '3'){
            this.users[i].roleId = 'Reviever'
          }
         else {
          this.users[i].roleId = 'Superviser'
         }
        }
        this.usersBackup = [];
        this.usersBackup = this.users.map(x => Object.assign({}, x))
        this.spinner = false;
      },
        error => {
          this.spinner = false;
          console.log("Error While Fetching Users, Please refresh page.")
          this.toastr.error("Error while fetching Users. Please refresh page.")
        });
  }

  filterData(data) {


    this.users = this.usersBackup.filter(function (tag) {
      data.target.value = data.target.value.toUpperCase();
      return (tag.firstName.toUpperCase().indexOf(data.target.value) >= 0) || (tag.lastName.toUpperCase().indexOf(data.target.value) >= 0) || (tag.userName.toUpperCase().indexOf(data.target.value) >= 0);
    });
  }
  passwordReset(userId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "20%"
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.autoFocus = true;
    const shareData: ShareDataUser = new ShareDataUser();
    shareData.id = userId;
    dialogConfig.data = shareData;
    this.dialog.open(UserResetPasswordComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.users = [];
        this.userService.getAllUser()
          .subscribe(result => {
            console.log(result)
            this.users = result;
            for(var i = 0 ; i< this.users.length;i++) {
              if(this.users[i].roleId == '1'){
                this.users[i].roleId = 'Admin'
              }else if(this.users[i].roleId == '2'){
                this.users[i].roleId = 'Registrar'
              }else if(this.users[i].roleId == '3'){
                this.users[i].roleId = 'Reviever'
              }
             else {
              this.users[i].roleId = 'Superviser'
             }
            }
            this.usersBackup = [];
            this.usersBackup = this.users.map(x => Object.assign({}, x))
          },
            error => {
              console.log("Error While Fetching Users, Please refresh page.")
              this.toastr.error("Error while fetching Users. Please refresh page.")
            });
      }
    });
  }
  openAddModal() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%"
    dialogConfig.height = "90%"
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AddUserComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.users = [];
        this.userService.getAllUser()
          .subscribe(result => {
            console.log(result)
            this.users = result;
            for(var i = 0 ; i< this.users.length;i++) {
              if(this.users[i].roleId == '1'){
                this.users[i].roleId = 'Admin'
              }else if(this.users[i].roleId == '2'){
                this.users[i].roleId = 'Registrar'
              }else if(this.users[i].roleId == '3'){
                this.users[i].roleId = 'Reviever'
              }
             else {
              this.users[i].roleId = 'Superviser'
             }
            }
            this.usersBackup = [];
            this.usersBackup = this.users.map(x => Object.assign({}, x))
          },
            error => {
              console.log("Error While Fetching Users, Please refresh page.")
              this.toastr.error("Error while fetching Users. Please refresh page.")
            });
      }
    });
  }

  openEditModal(userId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%"
    dialogConfig.height = "90%"
    const shareData: ShareDataUser = new ShareDataUser();
    shareData.id = userId;
    shareData.user = this.users;
    dialogConfig.autoFocus = false;
    dialogConfig.data = shareData;
    this.dialog.open(EditUserComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.users = [];
        this.userService.getAllUser()
          .subscribe(result => {
            console.log(result)
            this.users = result;
            for(var i = 0 ; i< this.users.length;i++) {
              if(this.users[i].roleId == '1'){
                this.users[i].roleId = 'Admin'
              }else if(this.users[i].roleId == '2'){
                this.users[i].roleId = 'Registrar'
              }else if(this.users[i].roleId == '3'){
                this.users[i].roleId = 'Reviever'
              }
             else {
              this.users[i].roleId = 'Superviser'
             }
            }
            this.usersBackup = [];
            this.usersBackup = this.users.map(x => Object.assign({}, x))
          },
            error => {
              console.log("Error While Fetching Users, Please refresh page.")
              this.toastr.error("Error while fetching Users. Please refresh page.")
            });
      }
    });
  }
 
 openDeleteModal(userId) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.width = "20%"
  dialogConfig.hasBackdrop = true;
  dialogConfig.closeOnNavigation = true;
  dialogConfig.autoFocus = true;
  const shareData: ShareDataUser = new ShareDataUser();
  shareData.id = userId;
  dialogConfig.data = shareData;
  this.dialog.open(DeleteUserComponent, dialogConfig).afterClosed().subscribe(result => {
    if (result != null) {
      this.users = [];
      this.userService.getAllUser()
        .subscribe(result => {
          console.log(result)
          this.users = result;
          for(var i = 0 ; i< this.users.length;i++) {
            if(this.users[i].roleId == '1'){
              this.users[i].roleId = 'Admin'
            }else if(this.users[i].roleId == '2'){
              this.users[i].roleId = 'Registrar'
            }else if(this.users[i].roleId == '3'){
              this.users[i].roleId = 'Reviever'
            }
           else {
            this.users[i].roleId = 'Superviser'
           }
          }
          this.usersBackup = [];
          this.usersBackup = this.users.map(x => Object.assign({}, x))
        },
          error => {
            console.log("Error While Fetching Users, Please refresh page.")
            this.toastr.error("Error while fetching Users. Please refresh page.")
          });
    }
  });
}


}