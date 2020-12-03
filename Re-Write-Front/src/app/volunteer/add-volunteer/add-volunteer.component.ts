import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { FingerprintService } from '../../fingerprint.service';
import { get } from 'scriptjs';
import Webcam from 'webcam-easy';
import { Volunteer } from '../../models/volunteer'
import { VolunteerService } from '../../volunteer.service'
@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.css']
})
export class AddVolunteerComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<AddVolunteerComponent>,
    private formBuilder: FormBuilder,
    private fingerPrintService: FingerprintService,
    private _ngZone: NgZone,
    
    private toastrService: ToastrService,
    private volunteerService: VolunteerService,
    @Inject(MAT_DIALOG_DATA) data) {

  }
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
    this.fingerPrintService.getFingerPrint().subscribe(
      result => {
        const map = new Map(Object.entries(result));
        this.fingerDataImage = map.get("fingerPrintInfo").BMPBase64;
        this.fingerPrintData = map.get("fingerPrintInfo").TemplateBase64;
        this.model = map.get("fingerPrintInfo").Model;
        this.serialNumber = map.get("fingerPrintInfo").SerialNumber;
        this.manufacturer = map.get("fingerPrintInfo").Manufacturer;
        this.primaryDiv = false;
        this.secondaryDiv = true;

      },
      error => {
        console.log(error);
        alert("Error in fetching fingerprint");
      }
    );
  }
  ngOnInit() {
    this.addVolunteerForm = this.formBuilder.group({
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
    volunteer.createdBy = "b9805a32-6410-42a2-8b2b-3be94a753722";
    volunteer.mobileNumber = this.f.mobileNumber.value;
    volunteer.fingerPrint = this.fingerPrintData
    volunteer.endDate = new Date();
    volunteer.fingerPrintImage = this.fingerDataImage;
    volunteer.volunteerImage = this.imageData;
    volunteer.address = this.f.address.value;
    volunteer.model = this.model;
    volunteer.manufacturer = this.manufacturer;
    volunteer.serialNumber = this.serialNumber;

    this.volunteerService.addVolunteer(volunteer)
      .subscribe(result => {
        this.volunteerAdd = result as Volunteer;
        console.log("Volunteer Successfully Added !");
        this.toastrService.success("Voluntter added successfully !")

        this.dialogRef.close( this.volunteerAdd);

      },
        error => {
          this.toastrService.error("Error while saving volunteer. Please contact admin.")
          console.log("Error while creating survey !");
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