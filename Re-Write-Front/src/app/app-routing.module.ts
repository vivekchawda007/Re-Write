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
  { path: "register", component: RegisterComponent, canActivate: [AuthGuard] },
  { path: "dashboard", component: DashboardComponent },
  { path: "unit", component: UnitComponent },
  { path: "sidebar", component: SidebarComponent },
  { path: "profile", component: ProfileComponent },
  { path: "volunteer", component: VolunterComponent },
  { path: "user", component: UserComponent },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
