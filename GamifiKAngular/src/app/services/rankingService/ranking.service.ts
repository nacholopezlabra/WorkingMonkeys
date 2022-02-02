import { Injectable } from '@angular/core';
import { ranking } from 'src/app/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  rankings:ranking[]=[{id:1,name:"daw2",memberCount:1,members:[1],teacher:2},{id:2,name:"daw1",memberCount:0,members:[],teacher:2},{id:3,name:"dam2",memberCount:0,members:[],teacher:2},{id:1,name:"dam1",memberCount:0,members:[],teacher:2}];

  constructor() { }
  
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
          if(ranking.teacher == id){
            userRanking.push(ranking);
          }
      });

      return userRanking;
    }
    return;
  }
}
