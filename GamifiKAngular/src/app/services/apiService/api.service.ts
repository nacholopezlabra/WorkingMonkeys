import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { user } from 'src/app/model/interfaces';

const HOST: string = "http://localhost:8080/apis/";
const LOGINURL : string = "user/login.php?";
const REGISTERURL : string = "user/register.php";
const MODIFYUSER :string = "user/modifyUser.php";
const CHANGEPASS : string = "user/changePassword.php";
const UPDATERANKING : string = "ranking/updateRanking.php";
const GETRANKINGSTEACHER : string = "ranking/rankingTeacher.php?id=";
const GETRANKINGSUSER : string = "userRanking/getRankingUser.php?id=";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  logIn(user:string, pass:string): Observable<any>{
    return  this.http.get(this.generateUrl(LOGINURL+"user="+user+"&pass="+pass));
  }

  register(user:user):Observable<any>{
    let userData = user;
    return this.http.post(this.generateUrl(REGISTERURL),userData,{responseType:'json'});
  }

  modifyuser(data:any):Observable<any>{
    return this.http.post(this.generateUrl(MODIFYUSER),data,{responseType:'json'});
  }


  changePassword(data:any):Observable<any>{
    return this.http.post(this.generateUrl(CHANGEPASS),data,{responseType:'json'});
  }


  updateRanking(data:any){
    return this.http.post(this.generateUrl(UPDATERANKING),data,{responseType:'json'});
  }

  getRankings(data:any){
    if(data.userType == 1){
      return this.http.get(this.generateUrl(GETRANKINGSTEACHER+data.id));
    }
    return this.http.get(this.generateUrl(GETRANKINGSUSER+data.id));

  }


  generateUrl(path:string):string{
    return HOST+path;
  }

}
