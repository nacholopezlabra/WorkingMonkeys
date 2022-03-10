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
import { RankingComponent } from './pages/ranking/ranking.component';
import { AddRankingsComponent } from './modals/add-rankings/add-rankings.component';
import { AddScoresComponent } from './modals/add-scores/add-scores.component';
import { UpdateRankingComponent } from './modals/update-ranking/update-ranking.component';
import { UpdateScoresComponent } from './modals/update-scores/update-scores.component';
import { AddTasksComponent } from './modals/add-tasks/add-tasks.component';
import { UpdateTaskComponent } from './modals/update-task/update-task.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { RankingDetailComponent } from './rankingDetail/ranking-detail/ranking-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterTeachersComponent,
    RegisterStudentsComponent,
    RankingComponent,
    AddRankingsComponent,
    AddScoresComponent,
    UpdateRankingComponent,
    UpdateScoresComponent,
    AddTasksComponent,
    UpdateTaskComponent,
    RankingDetailComponent
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
    ModalModule
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
