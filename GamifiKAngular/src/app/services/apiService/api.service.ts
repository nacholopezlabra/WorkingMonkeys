import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interface } from 'readline';
import { Observable } from 'rxjs';
import { user } from 'src/app/model/interfaces';

const HOST: string = "http://localhost:8080/apis/";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  logIn(user:string, pass:string): Observable<any>{
    let data= {user:user,pass:pass}
    return  this.http.get(this.generateUrl("modifyUser.php?user="+user+"&pass="+pass));

  }

  logOut(){

  }
  register(user:user):Observable<any>{


    return this.http.get(this.generateUrl("register.php?nickname="+user.nickname+"&mail="+user.mail+"&password="+user.password+"&name="+user.name+"&surname"+user.surname+"&center="+user.center+"&image="+user.image+"&birthday="+user.birthday+"&userType="+user.userType ));
  }

  generateUrl(path:string):string{
    console.log(HOST+path);
    return HOST+path;
  }

}
