import { Injectable } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';
import { RankingService } from '../rankingService/ranking.service';

@Injectable({
  providedIn: 'root'
})
export class UserRankingService {

  currentRankingUsers:user[]=[];
  constructor(private apiService:ApiService, private rankingService:RankingService) { }

  getUsersById(){
    this.apiService.getUsersById(this.rankingService.currentRanking.id_ranking).subscribe((data:any)=>{
     if(data.data){
       this.currentRankingUsers = data.data;
     }
    })
  }



}
