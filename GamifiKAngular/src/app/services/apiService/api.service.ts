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
const GETRANKINGSUSER : string = "userRanking/getUsersByRanking.php?id=";
const DELETERANKING : string = "ranking/deleteRanking.php?";
const GETTASKBYID : string = "tasks/getTasks.php?id_ranking=";
const GETSCORE: string = "score/getScore.php";
const CREATERANKING: string = "ranking/createRanking.php?";

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




  getRankings(data:any){
    if(data.userType == 1){
      return this.http.get(this.generateUrl(GETRANKINGSTEACHER+data.id));
    }
    return this.http.get(this.generateUrl(GETRANKINGSUSER+data.id));

  }

  deleteRankings(id_ranking:number, id_teacher: number){
    console.log(this.generateUrl(DELETERANKING+"id_ranking="+id_ranking+"&id_teacher="+id_teacher))
    return this.http.get(this.generateUrl(DELETERANKING+"id_ranking="+id_ranking+"&id_teacher="+id_teacher));
  }

  getTasksById(id:number){
    console.log(this.generateUrl(GETTASKBYID+id))
    return this.http.get(this.generateUrl(GETTASKBYID+id));
  }

  getUsersById(id:number){
    return this.http.get(this.generateUrl(GETRANKINGSUSER+id));
  }

  getScore(){
    return this.http.get(this.generateUrl(GETSCORE));
  }


  generateUrl(path:string):string{
    return HOST+path;
  }

  createRanking(ranking:ranking):Observable<any>{
    let rankingData = ranking;
    console.log(this.generateUrl(CREATERANKING),rankingData,{responseType:'json'})
    return this.http.post(this.generateUrl(CREATERANKING),rankingData,{responseType:'json'});
  }

  updateRanking(ranking:ranking):Observable<any>{
    let rankingData = ranking;
    console.log(this.generateUrl(UPDATERANKING),rankingData,{responseType:'json'})
    return this.http.post(this.generateUrl(UPDATERANKING),rankingData,{responseType:'json'});
  }

}
