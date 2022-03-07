import { Component, OnInit } from '@angular/core';
import * as sha512 from 'js-sha512';
import { user } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/apiService/api.service';
import { CommonService } from 'src/app/services/commonService/common.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UsersService } from 'src/app/services/userService/users.service';


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
  alteredUser:user ;
  constructor(private usersService: UsersService, public rankingService: RankingService, private apiService: ApiService, private  commonService: CommonService) {
    this.user = this.usersService.getCurrentUser();
    this.alteredUser = this.usersService.getCurrentUser();
  }

  ngOnInit(): void {
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
