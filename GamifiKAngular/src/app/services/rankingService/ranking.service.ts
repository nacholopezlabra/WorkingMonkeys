import { Injectable } from '@angular/core';
import { ranking } from 'src/app/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  rankings:ranking[]=[{id_ranking:1,name:"daw2",memberCount:1, members:[1],id_teacher:2, code:0},{id_ranking:2,name:"daw1",memberCount:0,members:[],id_teacher:2, code:0},{id_ranking:3,name:"dam2",memberCount:0,members:[],id_teacher:2, code:0},{id_ranking:1,name:"dam1",memberCount:0,members:[],id_teacher:2, code:0}]

  constructor() {
  }

  fetchStudentRankings(id:number|undefined){

    if(id != undefined){
      let userRanking: ranking[]=[];
      this.rankings.forEach(ranking => {
        ranking.members.forEach(member =>{
          if(member == id){
            userRanking.push(ranking);
          }
        })
      });

      return userRanking;

    }
    return;
  }

  fetchTeacherRankings(id:number|undefined){
    if(id != undefined){
      let userRanking: ranking[]=[];
      this.rankings.forEach(ranking => {
          if(ranking.id_teacher == id){
            userRanking.push(ranking);
          }
      });

      return userRanking;
    }
    return;
  }

  randomNumberRanking(){
    let min = 0;
    let max = 99999999;
    let code: number;
    code = min + Math.floor(Math.random()*max);

    console.log(code.toString().padStart(8,"0"));
  }
}
