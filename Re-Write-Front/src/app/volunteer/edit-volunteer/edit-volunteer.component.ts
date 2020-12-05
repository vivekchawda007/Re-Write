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
import { ShareDataVolunteer } from '../../models/shareDataVolunteer';

@Component({
  selector: 'app-edit-volunteer',
  templateUrl: './edit-volunteer.component.html',
  styleUrls: ['./edit-volunteer.component.css']
})
export class EditVolunteerComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<EditVolunteerComponent>,
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
  editVolunteerForm: FormGroup;
  primaryDiv = false;
  secondaryDiv = true;
  submitted = true;

  fingerDataImage;
  pictureClicked = false;
  liveVideo = true;
  imageData;
  fingerPrintData;
  manufacturer: string;
  model: string;
  serialNumber: string;
  volunteer;
  data: ShareDataVolunteer;
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;


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

    this.editVolunteerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: [''],
      address: [''],
    });
    this.volunteerService.getVolunteer(this.data.volunteerId)
      .subscribe(result => {
        this.volunteer = result;
        /*  var element = <HTMLInputElement>document.getElementById("modelFirstName");
        element.value = this.volunteer.volunteerInfo.firstName; 
         */
        this.editVolunteerForm.controls['firstName'].setValue(this.volunteer.volunteerInfo.firstName);
        this.editVolunteerForm.controls['lastName'].setValue(this.volunteer.volunteerInfo.lastName);
        this.editVolunteerForm.controls['mobileNumber'].setValue(this.volunteer.volunteerInfo.mobileNumber);
        this.editVolunteerForm.controls['address'].setValue(this.volunteer.volunteerInfo.address);
        this.fingerDataImage = this.volunteer.volunteerInfo.fingerPrintImage;
        this.imageData = this.volunteer.volunteerInfo.volunteerImage;
        this.liveVideo = true;
        this.pictureClicked = false;
        console.log("Volunteer View Completed !");
      },
        error => {
          this.toastr.error("Error while view volunteer. Please refresh page.")
          console.log("Error while viewing volunteer !");
        });

  }



  public hasError = (controlName: string, errorName: string) => {
    return this.editVolunteerForm.controls[controlName].hasError(errorName);
  }
  get f() {
    return this.editVolunteerForm.controls;
  }
  save() {
    this.submitted = false;

    const volunteer: Volunteer = new Volunteer();
    volunteer.firstName = this.f.firstName.value;
    volunteer.id = this.volunteer.volunteerInfo.volunteerId;
    volunteer.lastName = this.f.lastName.value;
    volunteer.createdBy = "b9805a32-6410-42a2-8b2b-3be94a753722";
    volunteer.mobileNumber = this.f.mobileNumber.value;
    volunteer.endDate = new Date();
    volunteer.address = this.f.address.value;
    this.volunteerService.updateVolunteer(volunteer)
      .subscribe(result => {
        this.volunteerAdd = result as Volunteer;
        console.log("Volunteer Successfully Added !");
        this.toastrService.success("Voluntter added successfully !")

        this.dialogRef.close(this.volunteerAdd);

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