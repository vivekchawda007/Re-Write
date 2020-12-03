import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VolunteerService } from '../../volunteer.service';
import { ShareDataVolunteer } from '../../models/shareDataVolunteer';
import { Volunteer } from '../../models/volunteer';

@Component({
  selector: 'app-view-volunteer',
  templateUrl: './view-volunteer.component.html',
  styleUrls: ['./view-volunteer.component.css']
})
export class ViewVolunteerComponent implements OnInit {
  volunteerView: Volunteer;
  volunteer: Volunteer;
  isChecked = false;
  data: ShareDataVolunteer;
  constructor(
    private volunteerService: VolunteerService,
    private dialogRef: MatDialogRef<ViewVolunteerComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit() {

    this.volunteerService.getVolunteer(this.data.volunteerId)
      .subscribe(result => {
        this.volunteer = result as Volunteer;
        console.log("Volunteer Successfully Added !");
      },
        error => {
          console.log("Error while creating survey !");
        });
   

  }
  close() {
    this.dialogRef.close();
  }
}