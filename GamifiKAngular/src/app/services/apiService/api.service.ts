import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { user } from 'src/app/model/interfaces';

const HOST: string = "http://localhost:8080/apis/";
const LOGINURL : string = "user/login.php?";
const REGISTERURL : string = "user/register.php";
const CHANGEPASS : string = "user/changePassword.php";
const UPDATERANKING : string = "ranking/updateRanking.php";
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

  changePassword(data:any):Observable<any>{
    return this.http.post(this.generateUrl(CHANGEPASS),data,{responseType:'json'});
  }


  updateRanking(data:any){
    return this.http.post(this.generateUrl(UPDATERANKING),data,{responseType:'json'});
  }

  generateUrl(path:string):string{
    return HOST+path;
  }

}
