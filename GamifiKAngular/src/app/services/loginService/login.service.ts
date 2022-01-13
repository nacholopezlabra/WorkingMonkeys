import { Injectable } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { UsersService } from '../userService/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginToken:string = "";
  constructor(private userService:UsersService, ) { }



  public logIn(data:user){

    //TODO hacer peticion al servidor i que devuelva los datos del usuario;
    this.userService.fetchCurrentUser(data);
    this.loginToken = "encripted token";




  }


  public logOut(){
    this.loginToken = "";
  }
}
