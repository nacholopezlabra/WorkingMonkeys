import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';
import { CommonService } from '../commonService/common.service';
import { DbService } from '../Database/db.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  students: user[] = []; //array that fetch all students from database;
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

  constructor(private db: DbService, private apiService: ApiService, private commonService:CommonService,
    private router:Router) {
    this.fetchCurrentUser();
  }

  public fetchCurrentUser(data?: user): void {

    if (!!data) {
      this.currentUser = data;
    }
  }

  public getCurrentUser(): user {
    return this.currentUser;
  }
  public logOut() {
    this.currentUser = {id: 0,nickname: '',mail: '',password: '',name: '',surname: '',birthday: '',userType: 0,image: ''};
  }

   public async registerUser(user: user) {
    await this.apiService.register(user).subscribe(
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
    await this.apiService.logIn(user,pass).subscribe((data) => {
      let res = data.data;
      if(res.id){
        this.fetchCurrentUser(res);
        this.commonService.sweetalert("error","correo no valido").then((result)=>{
          this.router.navigate(['profile']);
        })
      }else if (res == 2){
        this.commonService.sweetalert("error","La contraseña o el usuario no son validos");
      }

    },(error) => {
      console.log('Me ha dado error');
    }
  );
  }


  async changePassword(data:any){
    await this.apiService.changePassword(data).subscribe(
      (data) => {
        if(data.data == 3){//el tres lo usamos para comprobar que la peticion se ha hecho correctamente
          this.commonService.sweetalert("success", "Se ha cambiado la contraseña correctamente");
        }else if(data.data == 2){ //el dos lo usamos para decir que el correo que el usuario a puesta ya esta en uso
          this.commonService.sweetalert("error", "Las contraseñas nuevas no concuerdan");
        }else if(data.data == 1){ // el uno lo usamos para decir que el nickname del usuario ya existe
          this.commonService.sweetalert("error", "La contraseña anterior no concuerda");
        }
      });
  }
}
