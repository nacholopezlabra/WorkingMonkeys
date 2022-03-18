import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { task } from 'src/app/model/interfaces';
import { CommonService } from 'src/app/services/commonService/common.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  task: task = {id_task:0, name:"", id_ranking:0}

  constructor(private modal:BsModalService, private commonService: CommonService){}

  ngOnInit():void {
  }

  closeDialog(){
    this.modal.hide();
  }

  async createRanking(){

    if (this.task.name=="") {
      this.commonService.sweetalert("error","Has de introduir un nombre de tarea");
    }
    else{
     // await this.rankingService
      this.commonService.sweetalert("success","Tarea creada correctamente").then((result)=>{
        console.log(this.task);
        this.modal.hide();
      })
    }


  }
}


