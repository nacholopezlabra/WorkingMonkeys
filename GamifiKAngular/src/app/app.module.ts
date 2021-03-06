import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterTeachersComponent } from './pages/register-teachers/register-teachers.component';
import { RegisterStudentsComponent } from './pages/register-students/register-students.component';
import { CommonModule } from '@angular/common';
import { AddRankingsComponent } from './modals/add-rankings/add-rankings.component';
import { AddScoresComponent } from './modals/add-scores/add-scores.component';
import { UpdateRankingComponent } from './modals/update-ranking/update-ranking.component';
import { UpdateScoresComponent } from './modals/update-scores/update-scores.component';
import { AddTasksComponent } from './modals/add-tasks/add-tasks.component';
import { UpdateTaskComponent } from './modals/update-task/update-task.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { RankingDetailComponent } from './pages/ranking-detail/ranking-detail.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { JoinRankingComponent } from './modals/join-ranking/join-ranking.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PentabilitiesExplanationComponent } from './modals/pentabilities-explanation/pentabilities-explanation.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { ExplanationPentabilitiesComponent } from './modals/explanation-pentabilities/explanation-pentabilities.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterTeachersComponent,
    RegisterStudentsComponent,
    AddRankingsComponent,
    AddScoresComponent,
    UpdateRankingComponent,
    UpdateScoresComponent,
    AddTasksComponent,
    UpdateTaskComponent,
    RankingDetailComponent,
    RankingComponent,
    JoinRankingComponent,
    NotificationsComponent,
    PentabilitiesExplanationComponent,
    ExplanationPentabilitiesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ModalModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
