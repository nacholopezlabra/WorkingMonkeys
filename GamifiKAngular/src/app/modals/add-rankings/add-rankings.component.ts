import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ranking, user } from 'src/app/model/interfaces';
import { CommonService } from 'src/app/services/commonService/common.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UsersService } from 'src/app/services/userService/users.service';


@Component({
  selector: 'app-add-rankings',
  templateUrl: './add-rankings.component.html',
  styleUrls: ['./add-rankings.component.css']
})
export class AddRankingsComponent implements OnInit {

  ranking: ranking = {id_ranking:1, name:"", id_teacher:17, code:""};
  apiService: any;

  constructor(private modal:BsModalService, private commonService: CommonService, private rankingService: RankingService,
    private usersService: UsersService){
      this.ranking.id_teacher = this.usersService.getCurrentUser().id;
      this.ranking.code = this.rankingService.randomNumberRanking();
    }

  ngOnInit(): void {}

  closeDialog(){
    this.modal.hide();
  }

  crearRanking(){

    if (this.ranking.name=="") {
      this.commonService.sweetalert("error","Has de introduir un nombre de ranking");
    }
    else{
      this.rankingService.createRanking(this.ranking);
      this.modal.hide();
    }


  }

}
