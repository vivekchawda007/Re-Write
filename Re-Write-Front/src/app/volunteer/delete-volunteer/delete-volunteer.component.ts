import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Volunteer } from '../../models/volunteer'
import { ShareDataVolunteer } from '../../models/shareDataVolunteer';
import { VolunteerService } from '../../volunteer.service';

@Component({
  selector: 'app-delete-volunteer',
  templateUrl: './delete-volunteer.component.html',
  styleUrls: ['./delete-volunteer.component.css']
})
export class DeleteVolunteerComponent implements OnInit {
  volunteer;
  data: ShareDataVolunteer;
  constructor(
    private dialogRef: MatDialogRef<DeleteVolunteerComponent>,
    private toastr : ToastrService,
    private volunteerService: VolunteerService,


    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }
  ngOnInit() {
    this.volunteerService.getVolunteer(this.data.volunteerId)
    .subscribe(result => {
      this.volunteer = result;
      /*  var element = <HTMLInputElement>document.getElementById("modelFirstName");
      element.value = this.volunteer.volunteerInfo.firstName; 
       */
     
    },
      error => {
        this.toastr.error("Error while view volunteer. Please refresh page.")
        console.log("Error while viewing volunteer !");
      });
  }

  deleteVolunteer() {
    const volunteer : Volunteer = new Volunteer();
    volunteer.id = this.volunteer.volunteerInfo.volunteerId;
    this.volunteerService.deleteVolunteer(volunteer)
      .subscribe(result => {
        this.toastr.success("Volunteer Delete Successfull")
        this.dialogRef.close("PASSWORD_RESET");
      },
        error => {
          this.toastr.error("Error while delete volunteer")
          console.log("Error while delete volunteer!");
        });    
  }

  close() {
    this.dialogRef.close();
  }
}