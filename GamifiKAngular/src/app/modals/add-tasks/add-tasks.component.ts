import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { task } from 'src/app/model/interfaces';
import { CommonService } from 'src/app/services/commonService/common.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UserRankingService } from 'src/app/services/userRankingService/user-ranking.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  task: task = {id_task: 1, name: "", id_ranking: 1}

  apiService: any;

  constructor(private modal:BsModalService, private commonService: CommonService, private rankingService: RankingService,
    private userRankingService:UserRankingService){
      this.task.id_ranking = this.rankingService.getCurrentRanking().id_ranking;
    }

  ngOnInit(): void {}

  closeDialog(){
    this.modal.hide();
  }

  crearRanking(){

    if (this.task.name=="") {
      this.commonService.sweetalert("error","Has de introduir un nombre de ranking");
    }
    else{
      this.rankingService.createTask(this.task).then(()=>{
        this.userRankingService.getUserScores().then(()=>{
          this.modal.hide();
        })
      });

    }


  }

}
