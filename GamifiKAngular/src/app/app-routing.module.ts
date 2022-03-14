import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterTeachersComponent } from './pages/register-teachers/register-teachers.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterStudentsComponent } from './pages/register-students/register-students.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { AddRankingsComponent } from './modals/add-rankings/add-rankings.component';
import { RankingDetailComponent } from './pages/ranking-detail/ranking-detail.component';

const routes: Routes = [
  { path: '', component: RegisterTeachersComponent },
  { path: 'registerStudents', component: RegisterStudentsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'rankingDetails', component:RankingDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
