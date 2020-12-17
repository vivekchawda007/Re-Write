import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnitComponent } from './unit/unit.component';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { VolunterComponent } from './volunteer/volunter/volunter.component';
import { AddVolunteerComponent } from './volunteer/add-volunteer/add-volunteer.component';
import { UserComponent } from './user/user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ViewVolunteerComponent } from './volunteer/view-volunteer/view-volunteer.component';
import { EditVolunteerComponent } from './volunteer/edit-volunteer/edit-volunteer.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserResetPasswordComponent } from './user/user-reset-password/user-reset-password.component';
import { DeleteVolunteerComponent } from './volunteer/delete-volunteer/delete-volunteer.component';
import { AuditComponent } from './audit/audit/audit.component';
import { DateFilterComponent } from './audit/filters/date-filter/date-filter.component';
import { TextFilterComponent } from './audit/filters/text-filter/text-filter.component';

import { CellService, ColumnFilterService, DynamicTableModule } from 'material-dynamic-table';
import { OptionsCellComponent } from './audit/cells/options-cell/options-cell.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { BlockVolunteerComponent } from './volunteer/block-volunteer/block-volunteer.component';
import { FinalBlockVolunteerComponent } from './volunteer/final-block-volunteer/final-block-volunteer.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    UnitComponent,
    ProfileComponent,
    AddVolunteerComponent,
    VolunterComponent,
    UserComponent,
    AddUserComponent,
    ViewVolunteerComponent,
    EditVolunteerComponent,
    OptionsCellComponent,
    EditUserComponent,
    ViewUserComponent,
    UserResetPasswordComponent,
    DeleteVolunteerComponent,
    AuditComponent,
    DateFilterComponent,
    TextFilterComponent,
    ForgotPasswordComponent,
    BlockVolunteerComponent,
    FinalBlockVolunteerComponent,
  
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    MatRadioModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    DynamicTableModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })],
    entryComponents: [
      OptionsCellComponent,  
      TextFilterComponent,
      DateFilterComponent
    ],
  providers: [
    AuthGuard,
        AlertService,
        AuthService,
        MatDatepickerModule,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        UserService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private readonly cellService: CellService, private readonly columnFilterService: ColumnFilterService) {
    cellService.registerCell('options', OptionsCellComponent);

    columnFilterService.registerFilter('string', TextFilterComponent);
    columnFilterService.registerFilter('date', DateFilterComponent);
  }

}
