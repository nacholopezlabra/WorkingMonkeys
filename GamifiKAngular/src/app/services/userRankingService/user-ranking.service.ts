import { Injectable } from '@angular/core';
import { score, scores, user } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';
import { RankingService } from '../rankingService/ranking.service';

@Injectable({
  providedIn: 'root'
})
export class UserRankingService {

  currentRankingUsers:user[]=[];
  score:scores[]=[];
  constructor(private apiService:ApiService, private rankingService:RankingService) { }

  async getUsersById(){
    await this.apiService.getUsersById(this.rankingService.currentRanking.id_ranking).subscribe((data:any)=>{
     if(data.data){
       this.currentRankingUsers = data.data;
       this.getUserScores()
     }
    })
  }

  async getUserScores(){
    let score:any[];
    await this.apiService.getScore().subscribe((data:any)=>{
      let res = data.data;
      console.log(res)
      score = res;

      this.filterScore(score);
    });


  }
  filterScore(score:any[]){
    this.currentRankingUsers.forEach(user =>{
      let scor:scores;
      console.log(user)
      score.forEach(sc => {
        console.log(sc)
        if(user.id == sc.id_student){
          this.rankingService.getTasks().forEach(task=>{
            console.log(task);
            if(sc.id_task == task.id_task){
              let sco: score;
              sco = sc;
              console.log(sco);
            }
          })
        }
      });
    })
  }

}
