import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor(private router: Router,private dialog: MatDialog,private toastr: ToastrService

    ) { }
  
    ngOnInit() {
      
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
         // this.volunteers.push(result);
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