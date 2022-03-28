import { Injectable } from '@angular/core';
import { score, scores, user } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';
import { RankingService } from '../rankingService/ranking.service';

@Injectable({
  providedIn: 'root'
})
export class UserRankingService {

  currentRankingUsers:user[]=[];
  private score:scores[]=[];
  constructor(private apiService:ApiService, private rankingService:RankingService) { }

  async getUsersById(){
    await this.apiService.getUsersById(this.rankingService.currentRanking.id_ranking).then(async (data:any)=>{
     if(data.data){
       this.currentRankingUsers = data.data;
       await this.getUserScores();
       console.log(this.currentRankingUsers);
     }
    });
  }

  async fetchUsers(){
    this.getUsersById().then((data:any)=>{
      if(data.data){
        this.currentRankingUsers = data.data;
      }
    })
  }

  private async getUserScores(){

    let score:any[];
    await this.apiService.getScore().then((data:any)=>{
      let res = data.data;
      score = res;
      this.filterScore(score);

    });


  }
  filterScore(score:any[]){

    this.score = [];
    this.currentRankingUsers.forEach(user =>{
      let scor:scores = {id_student:0,scores:[],totalScore:0};
      scor.id_student = user.id;
      score.forEach(sc => {
        if(user.id == sc.id_student){
          this.rankingService.getTasks().forEach(task=>{
            if(sc.id_task == task.id_task){
              let sco: score;
              sco = sc;
              scor.totalScore = scor.totalScore + Number(sco.score);
              scor.scores.push(sco);
            }
          });
        }
      });
      if(scor.id_student != 0){
        this.score.push(scor);
      }
    });

  }

  getScore(){
    return this.score;
  }
}
