import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, Inject, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { FingerprintService } from '../../fingerprint.service';
import { get } from 'scriptjs';
import Webcam from 'webcam-easy';
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
    @Inject(MAT_DIALOG_DATA) data) {

  }
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
        this.fingerDataImage = map.get("BMPBase64");
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
  /*  save() {
     this.submitted= false;
     const survey: Survey = new Survey();
     survey.name = this.f.name.value;
     survey.question = this.f.question.value;
     survey.catagories = this.f.catagories.value;
     survey.type = this.f.type.value;
     survey.catquestion = this.f.catquestion.value;
     if (this.f.allowcoupon.value == true) {
       survey.allowcoupon = 1;
     } else {
       survey.allowcoupon = 0;
     }
     survey.catagoriestitle = this.f.catagoriestitle.value;
 
     this.surveyService.addSurvey(survey)
       .subscribe(result => {
         this.surveyList = result as SurveyAdd;
         console.log("Survey Successfully Added !");
         this.toastrService.success("Survey created succesfully.")
         this.dialogRef.close(this.surveyList.output);
         
       },
         error => {
           this.toastrService.error("Error while creating survey.")
           console.log("Error while creating survey !");
         });
     var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
     element.disabled = false;
   }
 */
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
