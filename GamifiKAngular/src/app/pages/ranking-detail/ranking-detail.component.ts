import { Component, OnInit } from '@angular/core';
import { ranking, user } from 'src/app/model/interfaces';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UserRankingService } from 'src/app/services/userRankingService/user-ranking.service';

@Component({
  selector: 'app-ranking-detail',
  templateUrl: './ranking-detail.component.html',
  styleUrls: ['./ranking-detail.component.css']
})
export class RankingDetailComponent implements OnInit {
user:user[]=[];



  constructor(private rankingService:RankingService, private UserRankingService:UserRankingService) {
    //if(this.usersService.isSession()){
      //this.ranking = this.rankingService.getRankings();
    //}
   }

  ngOnInit(): void {}
  getRankingUsers(){
  this.user = this.UserRankingService.currentRankingUsers;
  }

}
