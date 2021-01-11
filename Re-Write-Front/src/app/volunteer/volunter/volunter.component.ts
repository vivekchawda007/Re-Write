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
import { BlockVolunteerComponent } from '../block-volunteer/block-volunteer.component';
import { FinalBlockVolunteerComponent } from '../final-block-volunteer/final-block-volunteer.component';
import { Block } from '../../models/block'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-volunter',
  templateUrl: './volunter.component.html',
  styleUrls: ['./volunter.component.css']
})
export class VolunterComponent implements OnInit {
  currentUser;
  volunteers;
  volunteersBackup;
  isViewPermission;
  isEditPermission;
  isDeletePermission;
  isAddPermission;
  isBlockPermission;
  isBlockPermissionSpecial;
  filterQuery;
  spinner;
  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog, private toastr: ToastrService, private volunteerService: VolunteerService

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
      //Admin
      this.isDeletePermission = true;
      this.isEditPermission = true;
      this.isViewPermission = true;
      this.isBlockPermission = true;
      this.isAddPermission = true;
      this.isBlockPermissionSpecial = true;
    }
    if (this.currentUser.currentUser.roleId == '2') {
      //Registrar
      this.isDeletePermission = false;
      this.isEditPermission = true;
      this.isViewPermission = true;
      this.isBlockPermission = true;
      this.isAddPermission = true;
      this.isBlockPermissionSpecial = false;
    }
    if (this.currentUser.currentUser.roleId == '3') {
      //Reveiver
      this.isDeletePermission = false;
      this.isEditPermission = false;
      this.isViewPermission = true;
      this.isBlockPermission = false;
      this.isAddPermission = false;
      this.isBlockPermissionSpecial = false;
    }
    if (this.currentUser.currentUser.roleId == '4') {
      //Superwiser
      this.isDeletePermission = true;
      this.isEditPermission = true;
      this.isViewPermission = true;
      this.isBlockPermission = true;
      this.isAddPermission = true;
      this.isBlockPermissionSpecial = true;
    }
  }

  filterData(data) {


    this.volunteers = this.volunteersBackup.filter(function (tag) {
      data.target.value = data.target.value.toUpperCase();
      return (tag.firstName.toUpperCase().indexOf(data.target.value) >= 0) || (tag.lastName.toUpperCase().indexOf(data.target.value) >= 0) || (tag.volunteerId.toUpperCase().indexOf(data.target.value) >= 0);
    });
    
  }
  ngOnInit() {
   
    
    this.spinner = true;
    this.volunteerService.getVolunteers()
      .subscribe(result => {
        console.log(result)
        this.volunteers = result as Volunteers;
        for(var i = 0 ; i< this.volunteers.length ; i++) {
          if(this.volunteers[i].blocked == true) {
            var startDate = new Date();
          var endDate = new Date(this.volunteers[i].blockEndDate);
          var days = (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
            Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) / 86400000;
            this.volunteers[i].blocked = "Blocked for next "+days+" Days";
          } else {
            this.volunteers[i].blocked = "Not Blocked";
          }
        }
        this.volunteersBackup = this.volunteers.map(x => Object.assign({}, x))
        this.spinner = false;
      },
        error => {
          this.spinner = false;
          console.log("Error While Fetching Survey, Please refresh page.")
          this.toastr.error("Error while fetching volunteer. Please refresh page.")
        });
  }

  //Get all surveys


  openAddModal() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%"
    dialogConfig.height = "95%";
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
            for(var i = 0 ; i< this.volunteers.length ; i++) {
              if(this.volunteers[i].blocked == true) {
                var startDate = new Date();
                var endDate = new Date(this.volunteers[i].blockEndDate);
                var days = (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
                Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) / 86400000;
                this.volunteers[i].blocked = "Blocked for "+days+" Days";
              } else {
                this.volunteers[i].blocked = "No";
              }
            }
            this.volunteersBackup = [];
            this.volunteersBackup = this.volunteers.map(x => Object.assign({}, x))
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
    dialogConfig.height = "95%";
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
            for(var i = 0 ; i< this.volunteers.length ; i++) {
              if(this.volunteers[i].blocked == true) {
                this.volunteers[i].blocked = "Yes";
              } else {
                this.volunteers[i].blocked = "No";
              }
            }
            this.volunteersBackup = [];
            this.volunteersBackup = this.volunteers.map(x => Object.assign({}, x))
          },
            error => {
              console.log("Error While Fetching Survey, Please refresh page.")
              this.toastr.error("Error while fetching volunteer. Please refresh page.")
            });
      }
    });
  }

  openBlockModel() {
    const shareData: Block = new Block();
   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "60%"
    dialogConfig.height = "95%";
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
   
  
    dialogConfig.autoFocus = false;
    dialogConfig.data = shareData;

    this.dialog.open(BlockVolunteerComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.openFinalBlockModel(result);
      } else {
        this.volunteers = [];
        this.volunteerService.getVolunteers()
          .subscribe(result => {
            console.log(result)
            this.volunteers = result as Volunteers;
            for(var i = 0 ; i< this.volunteers.length ; i++) {
              if(this.volunteers[i].blocked == true) {
                this.volunteers[i].blocked = "Yes";
              } else {
                this.volunteers[i].blocked = "No";
              }
            }
            this.volunteersBackup = [];
            
            this.volunteersBackup = this.volunteers.map(x => Object.assign({}, x))
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
            for(var i = 0 ; i< this.volunteers.length ; i++) {
              if(this.volunteers[i].blocked == true) {
                this.volunteers[i].blocked = "Yes";
              } else {
                this.volunteers[i].blocked = "No";
              }
            }
            this.volunteersBackup = [];
            this.volunteersBackup = this.volunteers.map(x => Object.assign({}, x))
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
    dialogConfig.height = "95%";
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
            for(var i = 0 ; i< this.volunteers.length ; i++) {
              if(this.volunteers[i].blocked == true) {
                this.volunteers[i].blocked = "Yes";
              } else {
                this.volunteers[i].blocked = "No";
              }
            }
            this.volunteersBackup = [];
            this.volunteersBackup = this.volunteers.map(x => Object.assign({}, x))
          },
            error => {
              console.log("Error While Fetching Survey, Please refresh page.")
              this.toastr.error("Error while fetching volunteer. Please refresh page.")
            });
      }
    });
  }
  openViewModal(volunteerId) {
    const shareData: ShareDataVolunteer = new ShareDataVolunteer();
    shareData.volunteers = this.volunteers;
    shareData.volunteerId = volunteerId;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%"
    dialogConfig.height = "95%";
    dialogConfig.autoFocus = false;
    dialogConfig.data = shareData;
    this.dialog.open(ViewVolunteerComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result != null) {
        this.volunteers = [];
        this.volunteerService.getVolunteers()
          .subscribe(result => {
            console.log(result)
            this.volunteers = result as Volunteers;
            for(var i = 0 ; i< this.volunteers.length ; i++) {
              if(this.volunteers[i].blocked == true) {
                this.volunteers[i].blocked = "Yes";
              } else {
                this.volunteers[i].blocked = "No";
              }
            }
            this.volunteersBackup = [];
            this.volunteersBackup = this.volunteers.map(x => Object.assign({}, x))
          },
            error => {
              console.log("Error While Fetching Survey, Please refresh page.")
              this.toastr.error("Error while fetching volunteer. Please refresh page.")
            });
      }
    });
  }
}