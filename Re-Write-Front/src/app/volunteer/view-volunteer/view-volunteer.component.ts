import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VolunteerService } from '../../services/volunteer.service';
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
  volunteer;
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
        this.volunteer = result;
        if (this.volunteer.volunteerInfo.gender == '1') {
          this.volunteer.volunteerInfo.gender = "Male";
        } else {
          this.volunteer.volunteerInfo.gender = "Female";
        }

        if (this.volunteer.volunteerInfo.documentType == '1') {
          this.volunteer.volunteerInfo.documentType = "Pan Card";
        } else if (this.volunteer.volunteerInfo.documentType == '2') {
          this.volunteer.volunteerInfo.documentType = "Adhar Card";
        }
        else if (this.volunteer.volunteerInfo.documentType == '3') {
          this.volunteer.volunteerInfo.documentType = "Voter Card";
        } else {
          this.volunteer.volunteerInfo.documentType = "License";
        }

        if(this.volunteer.volunteerInfo.blocked == true) {
          var startDate = new Date();
        var endDate = new Date(this.volunteer.volunteerInfo.blockEndDate);
        var days = (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
          Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) / 86400000;
          this.volunteer.volunteerInfo.blocked = "Blocked for next "+days+" Days";
        } else {
          this.volunteer.volunteerInfo.blocked = "Not Blocked";
        }

        this.volunteer.volunteerInfo.birthDate = this.renderDateAndTime(this.volunteer.volunteerInfo.birthDate);
        console.log("Volunteer View Completed !");
      },
        error => {
          this.toastr.error("Error while view volunteer. Please refresh page.")
          console.log("Error while viewing volunteer !");
        });

  }

  renderDateAndTime(data) {
    if (!data) {
      return "";
    }
    var date = new Date(data);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    return (date.getMonth() + 1) + "/" + date.getDate() + "/"
      + date.getFullYear();
  }
  close() {
    this.dialogRef.close();
  }
}