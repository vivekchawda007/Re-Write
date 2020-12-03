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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    private fingerPrintService: FingerprintService,
    private _ngZone: NgZone,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) data) {

  }
  Volunteer;
  checked = false;
  addVolunteerForm: FormGroup;

  secondaryDiv = true;
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

  close() {
    this.dialogRef.close();
    /*  var element = <HTMLInputElement>document.getElementById("toggleNavigationId");
     element.disabled = false; */
  }
}
