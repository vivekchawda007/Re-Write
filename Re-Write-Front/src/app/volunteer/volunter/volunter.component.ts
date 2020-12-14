import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user'
import { ShareDataVolunteer } from '../../models/shareDataVolunteer';
import { Volunteers } from '../../models/volunteers'
import { VolunteerService } from '../../services/volunteer.service'
import { AddVolunteerComponent } from '../add-volunteer/add-volunteer.component';
import { DeleteVolunteerComponent } from '../delete-volunteer/delete-volunteer.component';
import { EditVolunteerComponent } from '../edit-volunteer/edit-volunteer.component';
import { ViewVolunteerComponent } from '../view-volunteer/view-volunteer.component';
import { AuthenticationService } from '../../services/authentication.service'
import { BlockVolunteerComponent } from '../block-volunteer/block-volunteer.component';
import { FinalBlockVolunteerComponent } from '../final-block-volunteer/final-block-volunteer.component';

@Component({
  selector: 'app-volunter',
  templateUrl: './volunter.component.html',
  styleUrls: ['./volunter.component.css']
})
export class VolunterComponent implements OnInit {
  currentUser;
  volunteers;
  isViewPermission;
  isEditPermission;
  isDeletePermission;
  constructor(private authService: AuthenticationService, private router: Router, private dialog: MatDialog, private toastr: ToastrService, private volunteerService: VolunteerService

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
    if (this.currentUser.currentUser.roleId == '1') {
      this.isDeletePermission = true;
      this.isEditPermission = true;
      this.isViewPermission = true;
    }
    if (this.currentUser.currentUser.roleId == '2') {
      this.isDeletePermission = false;
      this.isEditPermission = true;
      this.isViewPermission = true;
    }
    if (this.currentUser.currentUser.roleId == '3') {
      this.isDeletePermission = false;
      this.isEditPermission = false;
      this.isViewPermission = true;
    }
  }

  ngOnInit() {
    this.volunteerService.getVolunteers()
      .subscribe(result => {
        console.log(result)
        this.volunteers = result as Volunteers;
      },
        error => {
          console.log("Error While Fetching Survey, Please refresh page.")
          this.toastr.error("Error while fetching volunteer. Please refresh page.")
        });
  }

  //Get all surveys


  openAddModal(volunteerId) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%"
    dialogConfig.height = "100%";
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    this.dialog.open(AddVolunteerComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.openEditModal(result);
      } else {
        this.volunteers = [];
        this.volunteerService.getVolunteers()
          .subscribe(result => {
            console.log(result)
            this.volunteers = result as Volunteers;
          },
            error => {
              console.log("Error While Fetching Survey, Please refresh page.")
              this.toastr.error("Error while fetching volunteer. Please refresh page.")
            });
      }
    });

  }
  openFinalBlockModel(volunteerId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%"
    const shareData: ShareDataVolunteer = new ShareDataVolunteer();
    shareData.volunteers = this.volunteers;
    shareData.volunteerId = volunteerId;
    dialogConfig.autoFocus = false;
    dialogConfig.data = shareData;
    this.dialog.open(FinalBlockVolunteerComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.volunteers = [];
        this.volunteerService.getVolunteers()
          .subscribe(result => {
            console.log(result)
            this.volunteers = result as Volunteers;
          },
            error => {
              console.log("Error While Fetching Survey, Please refresh page.")
              this.toastr.error("Error while fetching volunteer. Please refresh page.")
            });
      }
    });
  }

  openBlockModel(volunteerId) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%"
    dialogConfig.height = "100%";
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    this.dialog.open(BlockVolunteerComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.openFinalBlockModel(result);
      } else {
        this.volunteers = [];
        this.volunteerService.getVolunteers()
          .subscribe(result => {
            console.log(result)
            this.volunteers = result as Volunteers;
          },
            error => {
              console.log("Error While Fetching Survey, Please refresh page.")
              this.toastr.error("Error while fetching volunteer. Please refresh page.")
            });
      }
    });

  }

  openDeleteModal(volunteerId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "20%"
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.autoFocus = true;
    const shareData: ShareDataVolunteer = new ShareDataVolunteer();
    shareData.volunteerId = volunteerId;
    dialogConfig.data = shareData;
    this.dialog.open(DeleteVolunteerComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.volunteers = [];
        this.volunteerService.getVolunteers()
          .subscribe(result => {
            console.log(result)
            this.volunteers = result;
          },
            error => {
              console.log("Error While Fetching Volunteers, Please refresh page.")
              this.toastr.error("Error while fetching Volunteers. Please refresh page.")
            });
      }
    });
  }

  openEditModal(volunteerId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%"
    const shareData: ShareDataVolunteer = new ShareDataVolunteer();
    shareData.volunteers = this.volunteers;
    shareData.volunteerId = volunteerId;
    dialogConfig.autoFocus = false;
    dialogConfig.data = shareData;
    this.dialog.open(EditVolunteerComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.volunteers = [];
        this.volunteerService.getVolunteers()
          .subscribe(result => {
            console.log(result)
            this.volunteers = result as Volunteers;
          },
            error => {
              console.log("Error While Fetching Survey, Please refresh page.")
              this.toastr.error("Error while fetching volunteer. Please refresh page.")
            });
      }
    });
  }

  /* 
 
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
*/
  openViewModal(volunteerId) {
    const shareData: ShareDataVolunteer = new ShareDataVolunteer();
    shareData.volunteers = this.volunteers;
    shareData.volunteerId = volunteerId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = shareData;
    this.dialog.open(ViewVolunteerComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.volunteers = [];
        this.volunteerService.getVolunteers()
          .subscribe(result => {
            console.log(result)
            this.volunteers = result as Volunteers;
          },
            error => {
              console.log("Error While Fetching Survey, Please refresh page.")
              this.toastr.error("Error while fetching volunteer. Please refresh page.")
            });
      }
    });
  }
}