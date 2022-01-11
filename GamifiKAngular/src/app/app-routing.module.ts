import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTeachersComponent } from './register-teachers/register-teachers.component';
import { LoginTeachersComponent } from './login-teachers/login-teachers.component';

const routes: Routes = [
  { path: '', component: RegisterTeachersComponent },
  { path: 'loginTeachers', component: LoginTeachersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
