import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { FingerprintService } from '../../services/fingerprint.service';
import { get } from 'scriptjs';
import Webcam from 'webcam-easy';
import { Volunteer } from '../../models/volunteer'
import { VolunteerService } from '../../services/volunteer.service'
import { ShareDataVolunteer } from '../../models/shareDataVolunteer';
import { VolunteerBlock } from '../../models/volunteerBlock'

@Component({
  selector: 'final-block-volunteer',
  templateUrl: './final-block-volunteer.component.html',
  styleUrls: ['./final-block-volunteer.component.css']
})
export class FinalBlockVolunteerComponent implements OnInit {
  isDisabled: boolean = false;
  blockedTill;
  constructor(
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<FinalBlockVolunteerComponent>,
    private formBuilder: FormBuilder,
    private fingerPrintService: FingerprintService,
    private _ngZone: NgZone,
    private toastr: ToastrService,
    private toastrService: ToastrService,
    private volunteerService: VolunteerService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.data = data;
  }
  volunteerAdd: Volunteer;
  Volunteer;
  checked = false;
  finalButton : boolean = true;
  editVolunteerForm: FormGroup;
  primaryDiv = false;
  isSuperwiser : boolean = false;;
  secondaryDiv = true;
  submitted = true;
  currentUser;
  blockDaysEnable;
  fingerDataImage;
  pictureClicked = false;
  liveVideo = true;
  imageData;
  fingerPrintData;
  manufacturer: string;
  model: string;
  serialNumber: string;
  volunteer;
  buttonName;
  data: ShareDataVolunteer;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  documents = [
    {
      id: 1,
      name: 'PAN Card'
    },
    {
      id: 2,
      name: 'Adhar Card'
    },
    {
      id: 3,
      name: 'Voter Card'
    },
    {
      id: 4,
      name: 'License'
    }
  ]


  ngOnInit() {
    const itemStr = localStorage.getItem("currentUser")
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.editVolunteerForm = this.formBuilder.group({
      gender: ['1'],
      documentType: [''],
      documentNumber: [''],
      birthDate: [''],
      firstName: [''],
      lastName: [''],
      block: ['', Validators.required],
      remarks: [''],
      studyNumber: ['', Validators.required],
      mobileNumber: [''],
      address: [''],
    });
    this.volunteerService.getVolunteer(this.data.volunteerId)
      .subscribe(result => {
        this.volunteer = result;
        /*  var element = <HTMLInputElement>document.getElementById("modelFirstName");
        element.value = this.volunteer.volunteerInfo.firstName; 
         */

        this.volunteer.volunteerInfo.birthDate = this.renderDateAndTime(this.volunteer.volunteerInfo.birthDate);
       
        this.fingerDataImage = this.volunteer.volunteerInfo.fingerPrintImage;
        this.imageData = this.volunteer.volunteerInfo.volunteerImage;
        this.liveVideo = true;
        this.pictureClicked = false;
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
        if (this.volunteer.volunteerInfo.blocked == true) {
          this.blockedTill = "Volunteer is blocked till :"+ this.renderDateAndTime(this.volunteer.volunteerInfo.blockEndDate);
          
          var startDate = new Date();
          var endDate = new Date(this.volunteer.volunteerInfo.blockEndDate);
          var days = (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
            Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) / 86400000;
          this.editVolunteerForm.controls['studyNumber'].setValue(this.volunteer.volunteerInfo.studyNumber);
          this.editVolunteerForm.controls['block'].setValue(days);
          this.editVolunteerForm.controls['remarks'].setValue(this.volunteer.volunteerInfo.remarks);
         
          this.editVolunteerForm.controls['block'].disable();
          this.editVolunteerForm.controls['studyNumber'].disable();
          this.isSuperwiser = true;
          
          if(this.currentUser.currentUser.roleId == '4' || this.currentUser.currentUser.roleId == '1') {
            this.buttonName = "Add Remark";
          } else {
            this.buttonName = "Block Volunteer"
            this.editVolunteerForm.controls['remarks'].disable();
            this.finalButton = false;
          }
        }else {
          
          this.isSuperwiser = false;
          this.buttonName = "Block Volunteer";
        }
                
        //this.volunteer.volunteerInfo.birthDate = this.renderDateAndTime(this.volunteer.volunteerInfo.birthDate);
        //console.log("Volunteer View Completed !");
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


  public hasError = (controlName: string, errorName: string) => {
    return this.editVolunteerForm.controls[controlName].hasError(errorName);
  }

  get f() {
    return this.editVolunteerForm.controls;
  }
  save() {
    this.submitted = false;
    var finalDate = new Date();
    var todaysDate = new Date();
    var numberOfDaysToAdd = this.f.block.value;

    finalDate.setDate(finalDate.getDate() + parseInt(numberOfDaysToAdd));
    const volunteer: VolunteerBlock = new VolunteerBlock();
    volunteer.blockEndDate = finalDate;
    volunteer.volunteerId = this.volunteer.volunteerInfo.volunteerId;
    volunteer.remarks = this.f.remarks.value;
    volunteer.studyNumber = this.f.studyNumber.value;
    volunteer.id = this.volunteer.volunteerInfo.blockId;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    volunteer.modifiedBy = this.currentUser.currentUser.id;
    volunteer.createdBy = this.currentUser.currentUser.id;
    this.volunteerService.blockVolunteer(volunteer)
      .subscribe(result => {
        this.volunteerAdd = result as Volunteer;
        console.log("Volunteer Successfully Blocked !");
        this.toastrService.success("Volunteer blocked successfully !")

        this.dialogRef.close(this.volunteerAdd);

      },
        error => {
          this.toastrService.error("Error while blocking volunteer. Please contact admin.")
          console.log("Error while blocking volunteer !");
        });
    //var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
    //element.disabled = false;
  }

  startCamera() {

    this.liveVideo = true;
    this.pictureClicked = false;
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const snapSoundElement = document.getElementById('snapSound');
    const webcam = new Webcam(webcamElement, 'environment', canvasElement, snapSoundElement);

    webcam.start();

  }

  clickPicture() {
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const snapSoundElement = document.getElementById('snapSound');
    const webcam = new Webcam(webcamElement, 'environment', canvasElement, snapSoundElement);
    webcam.start();
    var clickPicture = webcam.snap();
    webcam.stop();
    this.imageData = clickPicture;
    this.liveVideo = false;
    this.pictureClicked = true;



  }
  close() {
    this.dialogRef.close();
    /*  var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
     element.disabled = false; */
  }
}