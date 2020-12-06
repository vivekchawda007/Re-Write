import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShareDataVolunteer } from '../../models/shareDataVolunteer';
import { Volunteers } from '../../models/volunteers'
import { VolunteerService } from '../../volunteer.service'
import { AddVolunteerComponent } from '../add-volunteer/add-volunteer.component';
import { DeleteVolunteerComponent } from '../delete-volunteer/delete-volunteer.component';
import { EditVolunteerComponent } from '../edit-volunteer/edit-volunteer.component';
import { ViewVolunteerComponent } from '../view-volunteer/view-volunteer.component';


@Component({
  selector: 'app-volunter',
  templateUrl: './volunter.component.html',
  styleUrls: ['./volunter.component.css']
})
export class VolunterComponent implements OnInit {

  volunteers;
  constructor(private router: Router, private dialog: MatDialog, private toastr: ToastrService, private volunteerService: VolunteerService

  ) { }

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
      }else {
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