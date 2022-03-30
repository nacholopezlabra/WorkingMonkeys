import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ranking } from 'src/app/model/interfaces';
import { CommonService } from 'src/app/services/commonService/common.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-ranking',
  templateUrl: './update-ranking.component.html',
  styleUrls: ['./update-ranking.component.css']
})
export class UpdateRankingComponent implements OnInit {
  codeUpdated:boolean =false;
  ranking: ranking = {id_ranking: 0, name: '', id_teacher: 0,code: '', image:""};
  apiService: any;
  constructor(private modal:BsModalService, private commonService: CommonService, private rankingService: RankingService,  private router:Router)
  {}

  ngOnInit(): void {
    this.ranking = this.rankingService.getCurrentRanking();
    console.log(this.ranking);
  }

  closeDialog(){
    this.modal.hide();
  }

  async updateRanking(){
    if (this.ranking.name=="") {
      this.commonService.sweetalert("error","Has de introduir un nombre de ranking");
    }
    else{
      await this.rankingService.updateRanking(this.ranking).then(()=>{
        this.modal.hide();
      });
    }
  }
  generateCode(){
    this.ranking.code=this.rankingService.randomCodeRanking(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    this.codeUpdated=true;
  }
}
