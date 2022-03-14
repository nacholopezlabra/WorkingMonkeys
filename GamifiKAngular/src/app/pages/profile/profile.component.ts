import { Component, OnInit } from '@angular/core';
import * as sha512 from 'js-sha512';
import { user } from 'src/app/model/interfaces';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UsersService } from 'src/app/services/userService/users.service';
import { AddRankingsComponent } from 'src/app/modals/add-rankings/add-rankings.component';
import { ApiService } from 'src/app/services/apiService/api.service';
import { CommonService } from 'src/app/services/commonService/common.service';
import { AddTasksComponent } from 'src/app/modals/add-tasks/add-tasks.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: user;
  passwordShowed: boolean = false;
  lastPassword : string = "";
  newPassword: string = "";
  repeatNewPassword: string = "";
  canChangeImg : boolean = false;
  imgBase64Path: string = '';
  isImageSaved: boolean = false;
  cardImageBase64: string = '';
  editMode:boolean = false;



  constructor(private usersService: UsersService, public rankingService: RankingService, private modal:BsModalService) {
    this.user = this.usersService.getCurrentUser();
    if(this.usersService.isSession()){
      this.getRanking();
    }

  }

  ngOnInit(): void {
  }

  getRanking(){
    let data = {
      userType:this.user.userType,
      id:this.user.id
    }
    this.rankingService.fetchRankings(data);

  }

  encode(pass:string){
    return sha512.sha512(pass);
  }

 openEditMode(){
   if(this.editMode){
     this.editMode = false;
   }else{
     this.editMode = true;
   }
 }

  showPassword(): void {
    if (!this.passwordShowed) {
      this.passwordShowed = true;
    } else {
      this.passwordShowed = false;
    }
  }
  changePassword(){
    let data= {
      id:this.user?.id,
      lastPassword:this.encode(this.lastPassword),
      newPassword:this.encode(this.newPassword),
      repeatNewPassword:this.encode(this.repeatNewPassword)
    }
    this.usersService.changePassword(data);

  }

  editProfileData(){
    this.usersService.changeUserprofile(this.user);
  }

  createRanking(){
    this.modal.show(AddRankingsComponent);
  }


  createTask(){
    this.modal.show(AddTasksComponent);
  }

  fileChangeOpen(){
    document.getElementById('upload-file')?.click();
  }


  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          this.imgBase64Path = e.target.result;
          this.cardImageBase64 = this.imgBase64Path;
          this.isImageSaved = true;
          this.user.image = this.cardImageBase64;
          console.log(this.user)
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }




}
//Sumbit imagen, correo, nombre, apellido

