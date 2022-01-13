import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const HOST: string = "http://localhost:8080/apis/";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  logIn(user:string, pass:string): Observable<any>{
    let data= {user:user,pass:pass}
    return  this.http.get(this.generateUrl("login.php?user="+user+"&pass="+pass));

  }

  logOut(){

  }



  generateUrl(path:string):string{
    return HOST+path;
  }

}
