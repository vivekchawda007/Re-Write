import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { ShareDataUser } from '../../models/shareDataUser';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserResetPasswordComponent } from '../user-reset-password/user-reset-password.component';
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users;
  currentUser;
  constructor( private authService : AuthenticationService,private userService: UserService, private router: Router, private dialog: MatDialog, private toastr: ToastrService

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
    this.userService.getAllUser()
      .subscribe(result => {
        this.users = result;
      },
        error => {
          console.log("Error While Fetching Users, Please refresh page.")
          this.toastr.error("Error while fetching Users. Please refresh page.")
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
          },
            error => {
              console.log("Error While Fetching Users, Please refresh page.")
              this.toastr.error("Error while fetching Users. Please refresh page.")
            });
      }
    });
  }
  openAddModal(volunteerId) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "20%"
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
    dialogConfig.width = "20%"
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
          },
            error => {
              console.log("Error While Fetching Users, Please refresh page.")
              this.toastr.error("Error while fetching Users. Please refresh page.")
            });
      }
    });
  }
  /*  openEditModal(surveyId) {
     var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
     element.disabled = true;
     const dialogConfig = new MatDialogConfig();
     const shareData: ShareData = new ShareData();
     shareData.surveys = this.surveys;
     shareData.surveyid = surveyId;
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.data = shareData;
     this.dialog.open(EditSurveyComponent, dialogConfig).afterClosed().subscribe(result => {
       if (result != null) {
         for (var survey of this.surveys) {
           if (survey.surveyid == result.surveyid) {
             this.surveys.splice(this.surveys.indexOf(survey), 1);
           }
         }
         this.surveys.push(result);
       }
     });;
   }
 
 
   openDeleteModal(surveyId) {
     var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
     element.disabled = true;
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     const shareData: ShareData = new ShareData();
     shareData.surveys = this.surveys;
     shareData.surveyid = surveyId;
     dialogConfig.data = shareData;
     this.dialog.open(DeleteSurveyComponent, dialogConfig).afterClosed().subscribe(result => {
       if (result != null) {
         for (var survey of this.surveys) {
           if (survey.surveyid == result) {
             this.surveys.splice(this.surveys.indexOf(survey), 1);
           }
         }
       }
     });
   }
 
   openViewModal(surveyId) {
     var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
     element.disabled = true;
     const shareData: ShareData = new ShareData();
     shareData.surveys = this.surveys;
     shareData.surveyid = surveyId;
     const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = false;
     dialogConfig.data = shareData;
     this.dialog.open(ViewSurveyComponent, dialogConfig);
   } */

}