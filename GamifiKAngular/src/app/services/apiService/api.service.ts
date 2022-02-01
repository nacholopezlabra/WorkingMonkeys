import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { user } from 'src/app/model/interfaces';

const HOST: string = "http://localhost:8080/apis/";
const LOGINURL : string = "login.php?";
const REGISTERURL : string = "register.php";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  logIn(user:string, pass:string): Observable<any>{
    let data= {user:user,pass:pass}
    return  this.http.get(this.generateUrl(LOGINURL+"user="+user+"&pass="+pass));

  }

  logOut(){

  }
  register(user:user):Observable<any>{

    console.log(user);
    let userData = user;
    console.log(userData.password?.length);
    return this.http.post(this.generateUrl(REGISTERURL),userData,{responseType:'json'});


  }


  post(){
    //let json = {"id":2, "nickname":"fonsiii1","mail":"fonsi@gmail.com","password":"1234","name":"fonsi","surname":"Garcia","birthday":"17/09/1999","userType":1,"image":""};
    let json = {name:1};
    return this.http.post(this.generateUrl('tempRegister.php'), json,{responseType: 'json'}).subscribe((data)=>{
      console.log(data);
    })
  }

  generateUrl(path:string):string{
    console.log(HOST+path);
    return HOST+path;
  }

}
