import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ranking } from 'src/app/model/interfaces';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { CommonService } from 'src/app/services/commonService/common.service';


@Component({
  selector: 'app-join-ranking',
  templateUrl: './join-ranking.component.html',
  styleUrls: ['./join-ranking.component.css']
})
export class JoinRankingComponent implements OnInit {

  constructor(private modal:BsModalService,private rankingService:RankingService, private CommonService: CommonService) { }
code:string ="";
  ngOnInit(): void {
  }
  addUserRanking(){
    if (this.code =="") {
      this.CommonService.sweetalert("error","Has de introduir un nombre de ranking");
    }
    else{
      this.rankingService.addUserIntoRanking(this.code);
      this.modal.hide();
    }
  }
  closeDialog(){
    this.modal.hide();
  }
}


