import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterTeachersComponent } from './pages/register-teachers/register-teachers.component';
import { LoginTeachersComponent } from './pages/login-teachers/login-teachers.component';
import { LoginStudentsComponent } from './pages/login-students/login-students.component';
import { RegisterStudentsComponent } from './pages/register-students/register-students.component';
import { CommonModule } from '@angular/common';

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
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
