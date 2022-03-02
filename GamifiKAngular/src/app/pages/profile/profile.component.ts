import { Component, OnInit } from '@angular/core';
import * as sha512 from 'js-sha512';
import { user } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/apiService/api.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UsersService } from 'src/app/services/userService/users.service';
import Swal from 'sweetalert2';

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


  constructor(private usersService: UsersService, public rankingService: RankingService, private apiService: ApiService) {
    this.user = this.usersService.getCurrentUser();
  }

  cifrar(pass:string){
    return sha512.sha512(pass);
 }

  ngOnInit(): void {
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
      lastPassword:this.cifrar(this.lastPassword),
      newPassword:this.cifrar(this.newPassword),
      repeatNewPassword:this.cifrar(this.repeatNewPassword)
    }
    console.log(data);
    this.apiService.changePassword(data).subscribe(
      (data) => {
        if(data.data == 3){//el tres lo usamos para comprobar que la peticion se ha hecho correctamente
          //TODO aqui va swal
          console.log("se ha cambiado la contraseña correctamente");
        }else if(data.data == 2){ //el dos lo usamos para decir que el correo que el usuario a puesta ya esta en uso

          //TODO aqui va swal
          console.log("las contraseñas nuevas no concuerdan");
        }else if(data.data == 1){ // el uno lo usamos para decir que el nickname del usuario ya existe
          //TODO aqui va swal
          console.log("la contraseña anterior no concuerda")
        }
      });
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
