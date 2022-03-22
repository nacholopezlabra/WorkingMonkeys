import { Component, OnInit } from '@angular/core';
import { AddTasksComponent } from 'src/app/modals/add-tasks/add-tasks.component';
import { ranking, task, user } from 'src/app/model/interfaces';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UserRankingService } from 'src/app/services/userRankingService/user-ranking.service';
import { UsersService } from 'src/app/services/userService/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateTaskComponent } from 'src/app/modals/update-task/update-task.component';
import { CommonService } from 'src/app/services/commonService/common.service';
@Component({
  selector: 'app-ranking-detail',
  templateUrl: './ranking-detail.component.html',
  styleUrls: ['./ranking-detail.component.css']
})
export class RankingDetailComponent implements OnInit {
  user:user[]=[];
  ranking:ranking = {id_ranking:0,id_teacher:0,name:"",code:""  }
  currentTask:task = {id_task:0,name:"",id_ranking:0};
  user2:user;


  constructor(public rankingService:RankingService, private UserRankingService:UserRankingService, public usersService:UsersService,
    private modal:BsModalService, private commonService: CommonService) {
    this.user2 = this.usersService.getCurrentUser();
    if(this.usersService.isSession()){
      this.ranking = this.rankingService.getCurrentRanking();
      this.getRankingUsers();
    }
   }

  ngOnInit(): void {}

  getRankingUsers(){

  this.user = this.orderUsersByScore();
  console.log(this.user)
  }

  findUserScore(user:user){

    let userScore:number = 0;
    this.UserRankingService.getScore().forEach((score)=>{
      if(score.id_student == user.id){
        userScore = score.totalScore;
      }
    });

    return userScore;

  }
  orderByScore(){
    console.log(this.UserRankingService.getScore());
    let data = this.UserRankingService.getScore().sort((n1,n2) => {
      if (n1.totalScore > n2.totalScore) {
          return 1;
      }

      if (n1.totalScore < n2.totalScore) {
          return -1;
      }

      return 0;
  })
  console.log(data)
    return data.reverse();
  }

  orderUsersByScore(){

    let users:any[]=[];
    let score = this.orderByScore();
    console.log(score);
    score.forEach(score=>{
      this.UserRankingService.currentRankingUsers.forEach(user=>{
        if(user.id == score.id_student){
          users.push(user);
        }
      });
    });
    console.log(users);
    return users;

  }

  addtask(){
      this.modal.show(AddTasksComponent,{backdrop: 'static', keyboard: false});
  }

  edittask(){
    console.log(this.currentTask);
    this.rankingService.getTasks().forEach(element => {
      if(element.id_task == this.currentTask.id_task){
        this.rankingService.setCurrentTask(element);
      }
    });
    if (!!this.rankingService.getCurrentTask()) {
      this.modal.show(UpdateTaskComponent,{backdrop: 'static', keyboard: false});
    }else{
      this.commonService.sweetalert("error","No has selecionado ninguna tarea");
    }

  }

  deletetask(){}
}
