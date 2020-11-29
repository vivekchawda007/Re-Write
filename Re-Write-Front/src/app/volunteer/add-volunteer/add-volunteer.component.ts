import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.css']
})
export class AddVolunteerComponent implements OnInit {
  survey;
  checked = false;
  addSurveyForm: FormGroup;

  submitted = true;
  data: ShareData
  constructor(
    private dialogRef: MatDialogRef<AddVolunteerComponent>,
    private formBuilder: FormBuilder,

    private _ngZone: NgZone,
    private toastrService : ToastrService,
    @Inject(MAT_DIALOG_DATA) data) {

  }
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }


  ngOnInit() {
    this.addSurveyForm = this.formBuilder.group({
      name: ['', Validators.required],
      question: [''],
      type: ['', Validators.required],
      catagories: [''],
      catquestion: [''],
      catagoriestitle: ['']
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addSurveyForm.controls[controlName].hasError(errorName);
  }
  get f() {
    return this.addSurveyForm.controls;
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
