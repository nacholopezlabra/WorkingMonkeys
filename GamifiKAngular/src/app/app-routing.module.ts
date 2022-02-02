import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTeachersComponent } from './pages/register-teachers/register-teachers.component';
import { LoginTeachersComponent } from './pages/login-teachers/login-teachers.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginStudentsComponent } from './pages/login-students/login-students.component';
import { RegisterStudentsComponent } from './pages/register-students/register-students.component';

const routes: Routes = [
  { path: '', component: RegisterTeachersComponent },
  { path: 'registerStudents', component: RegisterStudentsComponent },
  { path: 'loginTeachers', component: LoginTeachersComponent },
  { path: 'loginStudents', component: LoginStudentsComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
