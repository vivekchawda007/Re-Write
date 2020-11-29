import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UnitComponent } from "./unit/unit.component";
import { AppComponent } from "./app.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ProfileComponent } from "./profile/profile.component";
import { AddUserComponent } from './add-user/add-user.component';
import { VolunterComponent } from './volunteer/volunter/volunter.component';


const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent, canActivate: [AuthGuard] },
  { path: "dashboard", component: DashboardComponent },
  { path: "unit", component: UnitComponent },
  { path: "sidebar", component: SidebarComponent },
  { path: "profile", component: ProfileComponent },
  { path: "add-user", component: AddUserComponent },
  { path: "volunteer", component: VolunterComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
