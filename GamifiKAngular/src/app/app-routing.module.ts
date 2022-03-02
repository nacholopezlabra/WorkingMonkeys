import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTeachersComponent } from './pages/register-teachers/register-teachers.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterStudentsComponent } from './pages/register-students/register-students.component';
import { RankingComponent } from './pages/ranking/ranking.component';

const routes: Routes = [
  { path: '', component: RegisterTeachersComponent },
  { path: 'registerStudents', component: RegisterStudentsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'ranking', component: RankingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
