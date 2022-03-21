import { Injectable } from '@angular/core';
import { ranking, task } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';
import { CommonService } from '../commonService/common.service';
import { UsersService } from '../userService/users.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  rankings:ranking[]=[];
  currentRanking: any;
  tasks:task[] = [];

  constructor(private apiService:ApiService, private commonService: CommonService, private userService:UsersService) {}


  async fetchRankings(){
    this.rankings = [];

    let data = {
      userType:this.userService.getCurrentUser().userType,
      id:this.userService.getCurrentUser().id
    }
    console.log(data);
    await this.apiService.getRankings(data).then((data:any)=>{
      let res = data.data;
      if(res != 1 && res !=104){
        this.rankings = res;
      }
      console.log(this.rankings);

    });

  }

  getRankings(){
    return this.rankings;
  }

  randomCodeRanking(length: number, chars:string){


    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;

  }

  setCurrentRanking(ranking:ranking){
    this.currentRanking = ranking;
  }

  getCurrentRanking():ranking{
    return this.currentRanking;
  }

  fetchTasks(){
    this.apiService.getTasksById(this.currentRanking.id_ranking).then((data:any)=>{
      if(data.data){
        this.tasks = data.data;
      }
    })
  }


  getTasks(){
    return this.tasks;
  }

  async createRanking(ranking:any){
    await this.apiService.createRanking(ranking).then(async (data) =>{
      if (data.data == 3) {
        await this.fetchRankings().then(()=>{
          this.commonService.sweetalert("success","Ranking creado correctamente");
        });
      }
      else if (data.data == 2) {
        this.commonService.sweetalert("error","El codigo del ranking ya exite");
      }
      else if (data.data == 1){
        this.commonService.sweetalert("error","El ranking ya existe");
      }
    },
    (error) => {
      console.log(error);
    }
    )
  }

  async updateRanking(ranking:any){
    await this.apiService.updateRanking(ranking).then(async (data) =>{
      if (data.data == 2) {
        await this.fetchRankings();
        this.commonService.sweetalert("success","Ranking modificado correctamente");

      }
      else if (data.data == 1) {
        this.commonService.sweetalert("error","No se ha podido modificar el ranking");
      }
    },
    (error) => {
      console.log(error);
    }
    )
  }

  addUserIntoRanking(code:string){
    console.log(this.userService.getCurrentUser());
    let data = {
      code:code,
      id_user:this.userService.getCurrentUser().id
    }
    console.log(data);
    this.apiService.addUserIntoRanking(data).then((data:any)=>{
      let res = data.data;
      if(res == 3){
        this.commonService.sweetalert("success","Usuario añadido correctamente");
        this.fetchRankings();
      }else if(res == 2){
        this.commonService.sweetalert("error","El usuario no se ha podido añadir correctamente");
      }else if(res == 1){
        this.commonService.sweetalert("error","El usuario ya esta dentro de este ranking");
      }else if(res == 4){
        this.commonService.sweetalert("error","Codigo inexistente");
      }
    });
  }

}
