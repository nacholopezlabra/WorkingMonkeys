import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ranking } from 'src/app/model/interfaces';
import { Observable } from 'rxjs';
import { user } from 'src/app/model/interfaces';

const HOST: string = "http://localhost:8080/apis/";
const LOGINURL : string = "user/login.php?";
const REGISTERURL : string = "user/register.php";
const MODIFYUSER :string = "user/modifyUser.php";
const CHANGEPASS : string = "user/changePassword.php";
const UPDATERANKING : string = "ranking/updateRanking.php";
const GETRANKINGSTEACHER : string = "ranking/rankingTeacher.php?id=";
const GETUSERSBYRANKING : string = "userRanking/getUsersByRanking.php?id=";
const DELETERANKING : string = "ranking/deleteRanking.php?";
const GETTASKBYID : string = "tasks/getTasks.php?id_ranking=";
const GETSCORE: string = "score/getScore.php";
const CREATERANKING: string = "ranking/createRanking.php?";
const ADDUSERINTORANKING : string = "userRanking/addUser.php?code=";
const GETRANKINGSUSER : string = "userRanking/getRankingsUser.php?id=";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http:HttpClient) { }

  logIn(user:string, pass:string): Promise<any>{
    return  this.http.get(this.generateUrl(LOGINURL+"user="+user+"&pass="+pass)).toPromise();
  }

  register(user:user):Promise<any>{
    let userData = user;
    return this.http.post(this.generateUrl(REGISTERURL),userData,{responseType:'json'}).toPromise();
  }

  modifyuser(data:any):Promise<any>{
    return this.http.post(this.generateUrl(MODIFYUSER),data,{responseType:'json'}).toPromise();
  }

  changePassword(data:any):Promise<any>{
    return this.http.post(this.generateUrl(CHANGEPASS),data,{responseType:'json'}).toPromise();
  }

  getRankings(data:any):Promise<any>{
    if(data.userType == 1){
      return this.http.get(this.generateUrl(GETRANKINGSTEACHER+data.id)).toPromise();
    }
    return this.http.get(this.generateUrl(GETRANKINGSUSER+data.id)).toPromise();

  }

  deleteRankings(id_ranking:number, id_teacher: number):Promise<any>{
    return this.http.get(this.generateUrl(DELETERANKING+"id_ranking="+id_ranking+"&id_teacher="+id_teacher)).toPromise();
  }

  getTasksById(id:number):Promise<any>{
    return this.http.get(this.generateUrl(GETTASKBYID+id)).toPromise();
  }

  getUsersById(id:number):Promise<any>{
    return this.http.get(this.generateUrl(GETUSERSBYRANKING+id)).toPromise();
  }

  getScore():Promise<any>{
    return this.http.get(this.generateUrl(GETSCORE)).toPromise();
  }

  createRanking(ranking:ranking):Promise<any>{
    return this.http.post(this.generateUrl(CREATERANKING),ranking,{responseType:'json'}).toPromise();
  }

  updateRanking(ranking:ranking):Promise<any>{
    return this.http.post(this.generateUrl(UPDATERANKING),ranking,{responseType:'json'}).toPromise();
  }

  addUserIntoRanking(data:any):Promise<any>{
    return this.http.get(this.generateUrl(ADDUSERINTORANKING+data.code+"&id_user="+data.id_user)).toPromise();
  }











  generateUrl(path:string):string{
    return HOST+path;
  }
}
