import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ranking } from 'src/app/model/interfaces';
import { RankingService } from 'src/app/services/rankingService/ranking.service';

@Component({
  selector: 'app-join-ranking',
  templateUrl: './join-ranking.component.html',
  styleUrls: ['./join-ranking.component.css']
})
export class JoinRankingComponent implements OnInit {

  constructor(private modal:BsModalService,private rankingService:RankingService) { }
code:string ="";
  ngOnInit(): void {
  }
  addUserRanking(){
    this.rankingService.addUserIntoRanking(this.code);
  }
  closeDialog(){
    this.modal.hide();
  }
}

