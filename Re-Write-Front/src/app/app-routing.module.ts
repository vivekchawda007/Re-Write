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
import { VolunterComponent } from './volunteer/volunter/volunter.component';
import { UserComponent } from './user/user/user.component';


const routes: Routes = [
  { path: "", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent,  canActivate: [AuthGuard]},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "unit", component: UnitComponent, canActivate: [AuthGuard] },
  { path: "sidebar", component: SidebarComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent , canActivate: [AuthGuard]},
  { path: "volunteer", component: VolunterComponent , canActivate: [AuthGuard]},
  { path: "user", component: UserComponent , canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
