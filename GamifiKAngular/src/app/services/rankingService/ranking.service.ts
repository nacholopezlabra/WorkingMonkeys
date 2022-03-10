import { Injectable } from '@angular/core';
import { ranking } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  rankings:ranking[]=[];

  constructor(private apiService:ApiService) {}


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
}
