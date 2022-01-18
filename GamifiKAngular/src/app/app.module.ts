import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterTeachersComponent } from './pages/register-teachers/register-teachers.component';
import { LoginTeachersComponent } from './pages/login-teachers/login-teachers.component';
import { LoginStudentsComponent } from './pages/login-students/login-students.component';
import { RegisterStudentsComponent } from './pages/register-students/register-students.component';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterTeachersComponent,
    LoginTeachersComponent,
    LoginStudentsComponent,
    RegisterStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
