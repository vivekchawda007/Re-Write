import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
    
    private toastrService : ToastrService,
    @Inject(MAT_DIALOG_DATA) data) {

  }
  

 


  ngOnInit() {
   
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addSurveyForm.controls[controlName].hasError(errorName);
  }
  get f() {
    return this.addSurveyForm.controls;
  }
}
