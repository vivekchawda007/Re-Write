import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VolunteerService } from '../../volunteer.service';
import { ShareDataVolunteer } from '../../models/shareDataVolunteer';
import { Volunteer } from '../../models/volunteer';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ViewVolunteerComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }

  ngOnInit() {

    this.volunteerService.getVolunteer(this.data.volunteerId)
      .subscribe(result => {
        this.volunteer = result as Volunteer;
        console.log("Volunteer View Completed !");
      },
        error => {
          this.toastr.error("Error while view volunteer. Please refresh page.")
          console.log("Error while viewing volunteer !");
        });

  }
  close() {
    this.dialogRef.close();
  }
}