import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ranking } from 'src/app/model/interfaces';
import { task } from 'src/app/model/interfaces';
import { Observable } from 'rxjs';
import { user } from 'src/app/model/interfaces';

//const HOST: string = "http://localhost:8080/apis/";
const HOST: string = "http://192.168.7.141:8080/apis/";
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
const DELETEUSERRANKING : string = "userRanking/deleteUser.php?";
const CREATETASK: string = "tasks/createTask.php?";
const DELETETASK: string = "tasks/deleteTask.php?";
const UPDATETASK: string = "tasks/updateTask.php?";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http:HttpClient) { }

  callApiTest(){
    let data = {
      id_student:12,
      code:'27873814'
    }
    return this.http.post(this.generateUrl("join/askToJoin.php"),data).toPromise();
  }

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

  deleteRankings(id_ranking:number, id_teacher: number):Promise<any>{
    return this.http.get(this.generateUrl(DELETERANKING+"id_ranking="+id_ranking+"&id_teacher="+id_teacher)).toPromise();
  }

  addUserIntoRanking(data:any):Promise<any>{
    return this.http.get(this.generateUrl(ADDUSERINTORANKING+data.code+"&id_user="+data.id_user)).toPromise();
  }

  generateUrl(path:string):string{
    return HOST+path;
  }

  createTask(task: task):Promise<any>{
    return this.http.post(this.generateUrl(CREATETASK), task,{responseType:'json'}).toPromise();
  }

  updateTask(task: task):Promise<any>{
    return this.http.post(this.generateUrl(UPDATETASK), task,{responseType:'json'}).toPromise();
  }

  deleteTask(id_task:number):Promise<any>{
    return this.http.get(this.generateUrl(DELETETASK+"id_task="+id_task)).toPromise();
  }

  deleteUserRanking(id_user:number, id_ranking: number):Promise<any>{
    return this.http.get(this.generateUrl(DELETEUSERRANKING+"id_user="+id_user+"&id_ranking="+id_ranking)).toPromise();
  }
}
