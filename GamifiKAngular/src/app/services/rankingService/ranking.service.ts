import { Injectable } from '@angular/core';
import { ranking, task } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';
import { CommonService } from '../commonService/common.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  rankings:ranking[]=[];
  currentRanking: any;
  tasks:task[] = [];

  constructor(private apiService:ApiService, private commonService: CommonService) {}


  async fetchRankings(data:any){

    await this.apiService.getRankings(data).subscribe((data:any)=>{
      let res = data.data;
      this.rankings = res;
    });

  }

  getRankings(){
    return this.rankings;
  }

  randomNumberRanking(){

    let min = 0;
    let max = 99999999;
    let code: number;
    code = min + Math.floor(Math.random()*max);
    return code.toString().padStart(8,"0");

  }

  setCurrentRanking(ranking:ranking){
    this.currentRanking = ranking;
  }

  getCurrentRanking():ranking{
    return this.currentRanking;
  }

  fetchTasks(){
    this.apiService.getTasksById(this.currentRanking.id_ranking).subscribe((data:any)=>{
      if(data.data){
        this.tasks = data.data;
      }
    })
  }


  getTasks(){
    return this.tasks;
  }

  createRanking(ranking:any){
    this.apiService.createRanking(ranking).subscribe((data) =>{
      if (data.data == 3) {
        this.commonService.sweetalert("success","Ranking creado correctamente");
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

  updateRanking(ranking:any){
    this.apiService.updateRanking(ranking).subscribe((data) =>{
      if (data.data == 2) {
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

}
