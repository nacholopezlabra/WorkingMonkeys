import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTeachersComponent } from './pages/register-teachers/register-teachers.component';
import { LoginTeachersComponent } from './pages/login-teachers/login-teachers.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterTeachersComponent },
  { path: 'loginTeachers', component: LoginTeachersComponent },
  { path: '', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
