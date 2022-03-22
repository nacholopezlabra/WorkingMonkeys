import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { task } from 'src/app/model/interfaces';
import { CommonService } from 'src/app/services/commonService/common.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {


  task: task = {id_task: 1, name: "", id_ranking: 1}

  apiService: any;
  constructor(private modal:BsModalService, private commonService: CommonService, private rankingService: RankingService,  private router:Router)
  {}

  ngOnInit(): void {
    this.task = this.rankingService.getCurrentTask();
    console.log(this.task);
  }

  closeDialog(){
    this.modal.hide();
  }

  async updateRanking(){
    if (this.task.name=="") {
      this.commonService.sweetalert("error","Has de introduir un nombre de tarea");
    }
    else{
      await this.rankingService.updateTask(this.task).then(()=>{
        this.modal.hide();
      });
    }
  }

}
