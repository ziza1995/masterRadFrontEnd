import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './auth/user_details/user_details';
import { AuthGuard } from './auth/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'user_details', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
