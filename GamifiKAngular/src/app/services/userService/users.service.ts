import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';
import { CommonService } from '../commonService/common.service';
import { DbService } from '../Database/db.service';
import { RankingService } from '../rankingService/ranking.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentUser: user = {
    id: 0,
    nickname: '',
    mail: '',
    password: '',
    name: '',
    surname: '',
    birthday: '',
    userType: 0,
    image: '',
  }; //we use this var for the logged user(can be a teacher or a student);
  private sessionToken:string= "";

  constructor(private db: DbService, private apiService: ApiService, private commonService:CommonService,
    private router:Router, ) {
  }

  public fetchCurrentUser(data: user): void {

    if (!!data) {
      this.currentUser = data;
    }
  }

  public getCurrentUser(): user {
    return this.currentUser;
  }
  public logOut() {
    this.currentUser = {id: 0,nickname: '',mail: '',password: '',name: '',surname: '',birthday: '',userType: 0,image: ''};
    this.sessionToken = "";
    this.db.clear("sessionToken");
    this.db.clear("user");
  }

   public async registerUser(user: user) {
    await this.apiService.register(user).then(
      (data) => {
        console.log(data);
        if (data.data == 3) {
          //el tres lo usamos para comprobar que la peticion se ha hecho correctamente
          this.logIn(user.nickname, user.password);
        } else if (data.data == 2) {
          //el dos lo usamos para decir que el correo que el usuario a puesta ya esta en uso
          this.commonService.sweetalert("error","Email ya en uso");
        } else if (data.data == 1) {
          // el uno lo usamos para decir que el nickname del usuario ya existe
          this.commonService.sweetalert('error',"El usuario ya existe");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async logIn(user:string,pass:string){
    await this.apiService.logIn(user,pass).then((data) => {
      let res = data.data;
      if(res.id){
        this.sessionToken = this.randomString(40, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        this.db.pushData("sessionToken", this.sessionToken);
        this.db.pushData("user",res);
        console.log(this.db.fetchData("user"));
        this.fetchCurrentUser(res);
        this.commonService.sweetalert("success","Usuario logeado").then((result)=>{
          this.router.navigate(['ranking']);
        })
      }else if (res == 2){
        this.commonService.sweetalert("error","La contrase??a o el usuario no son validos");
      }

    },(error) => {
      console.log('Me ha dado error');
    }
  );
  }


  async changePassword(data:any){
    await this.apiService.changePassword(data).then(
      (data) => {
        if(data.data == 3){//el tres lo usamos para comprobar que la peticion se ha hecho correctamente
          this.commonService.sweetalert("success", "Se ha cambiado la contrase??a correctamente");
        }else if(data.data == 2){ //el dos lo usamos para decir que el correo que el usuario a puesta ya esta en uso
          this.commonService.sweetalert("error", "Las contrase??as nuevas no concuerdan");
        }else if(data.data == 1){ // el uno lo usamos para decir que el nickname del usuario ya existe
          this.commonService.sweetalert("error", "La contrase??a anterior no concuerda");
        }
      });
  }

  public async changeUserprofile(data:any)  {

    await this.apiService.modifyuser(data).then(
      (data) => {
        if(data.data == 1){//el primero lo usamos para comprobar que la peticion se ha hecho correctamente
          this.commonService.sweetalert("success", "Se ha modificado el usuario correctamente");
        }else if(data.data == 2){ //el dos lo usamos para decir que el usuario no se ha modificado.
          this.commonService.sweetalert("error", "No se ha podido modificar");
        }else if(data.data == 3){ // el tres lo usamos para decir que el correo del usuario ya esta en uso
          this.commonService.sweetalert("error", "El correo ya esta en uso");
        }
      });

  }

  private randomString(length: number, chars:string) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  public isSession(){
    if(this.sessionToken == ""){
      this.router.navigate(['']);
    }else{
      return true;
    }
    return false;
  }


  setSession(token:string){
    this.sessionToken = token;
  }
}
