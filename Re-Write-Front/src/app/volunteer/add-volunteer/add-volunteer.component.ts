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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../models/user'
@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.css']
})
export class AddVolunteerComponent implements OnInit {
  currentUser;
  constructor(
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<AddVolunteerComponent>,
    private formBuilder: FormBuilder,
    private fingerPrintService: FingerprintService,
    private _ngZone: NgZone,
    
    private toastrService: ToastrService,
    private volunteerService: VolunteerService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(this.currentUser.currentUser.roleId == "1") {

      } 
  }
  documents = [
    {
      id : 1,
      name : 'PAN Card'
    },
    {
      id : 2,
      name : 'Adhar Card'
    },
    {
      id : 3,
      name : 'Voter Card'
    },
    {
      id : 4,
      name : 'License'
    }
    ]
  spinner;
  spinnerImage;
  
  volunteerAdd : Volunteer;
  Volunteer;
  checked = false;
  addVolunteerForm: FormGroup;
  primaryDiv = true;
  secondaryDiv = false;
  submitted = true;
  data: ShareData;
  fingerDataImage;
  pictureClicked = false;
  liveVideo = true;
  imageData;
  fingerPrintData;
  manufacturer: string;
  model: string;
  serialNumber: string;

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  getFingerPrint() {
    this.spinner = true;
    var body : {
      "Timeout" : 10000,
      "Quality":1,
      "licstr": "", 
      "templateFormat":"ISO"
    }
    this.fingerPrintService.getFingerPrint(body).subscribe(
      result => {
        this.matchFingerPrint(result)
      },
      error => {
        this.spinner = false;
        console.log(error);
        this.toastrService.error("Error while fetching fingerprint. Please contact admin.")
      }
    );
  }

  matchFingerPrint(result) {
    this.fingerPrintService.matchFingerPrint(result).subscribe(
      result => {
        const map = new Map(Object.entries(result));
        
        if(map.get("volunteerInfo").volunteerId == null) {
        this.fingerDataImage = map.get("fingerPrintInfo").BMPBase64;
        this.fingerPrintData = map.get("fingerPrintInfo").TemplateBase64;
        this.model = map.get("fingerPrintInfo").Model;
        this.serialNumber = map.get("fingerPrintInfo").SerialNumber;
        this.manufacturer = map.get("fingerPrintInfo").Manufacturer;
        this.primaryDiv = false;
        this.secondaryDiv = true;
        }else {
          this.dialogRef.close(map.get("volunteerInfo").volunteerId);
        }
        this.spinner = false;
      },
      error => {
        this.spinner = false;
        console.log(error);
        this.toastrService.error("Error while fetching fingerprint. Please contact admin.")
      }
    );
  }

  
  
  ngOnInit() {
    this.addVolunteerForm = this.formBuilder.group({
      studyNumber : ['',Validators.required],
      gender : ['1',Validators.required],
      documentType : ['',Validators.required],
      documentNumber : ['',Validators.required],
      birthDate : ['',Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: [''],
      address: [''],
    });

  }


  public hasError = (controlName: string, errorName: string) => {
    return this.addVolunteerForm.controls[controlName].hasError(errorName);
  }
  get f() {
    return this.addVolunteerForm.controls;
  }
  save() {
    this.submitted = false;

    const volunteer: Volunteer = new Volunteer();
    volunteer.firstName = this.f.firstName.value;
    volunteer.lastName = this.f.lastName.value;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    volunteer.createdBy = this.currentUser.currentUser.id;
    volunteer.mobileNumber = this.f.mobileNumber.value;
    volunteer.fingerPrint = this.fingerPrintData
    volunteer.endDate = new Date();
    volunteer.fingerPrintImage = this.fingerDataImage;
    volunteer.volunteerImage = this.imageData;
    volunteer.address = this.f.address.value;
    volunteer.model = this.model;
    volunteer.manufacturer = this.manufacturer;
    volunteer.serialNumber = this.serialNumber;
    volunteer.studyNumber = this.f.studyNumber.value;
    volunteer.birthDate = this.f.birthDate.value;
    volunteer.documentNumber = this.f.documentNumber.value;
    volunteer.documentType = this.f.documentType.value;
    volunteer.gender = this.f.gender.value;
    
    this.volunteerService.addVolunteer(volunteer)
      .subscribe(result => {
        this.volunteerAdd = result as Volunteer;
        console.log("Volunteer Successfully Added !");
        this.toastrService.success("Voluntter added successfully !")

        this.dialogRef.close(null);

      },
        error => {
          this.toastrService.error("Error while saving volunteer. Please contact admin.")
          console.log("Error while creating survey !");
        });
    //var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
    //element.disabled = false;
  }

  startCamera() {
    this.spinner = true;
    this.liveVideo = true;
    this.pictureClicked = false;
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const snapSoundElement = document.getElementById('snapSound');
    const webcam = new Webcam(webcamElement, 'environment', canvasElement, snapSoundElement);

    webcam.start();
    this.spinner = false;

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