import { Component, OnInit } from '@angular/core';
import { AddTasksComponent } from 'src/app/modals/add-tasks/add-tasks.component';
import { ranking, task, user } from 'src/app/model/interfaces';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UserRankingService } from 'src/app/services/userRankingService/user-ranking.service';
import { UsersService } from 'src/app/services/userService/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UpdateTaskComponent } from 'src/app/modals/update-task/update-task.component';
import { CommonService } from 'src/app/services/commonService/common.service';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/apiService/api.service';
@Component({
  selector: 'app-ranking-detail',
  templateUrl: './ranking-detail.component.html',
  styleUrls: ['./ranking-detail.component.css']
})
export class RankingDetailComponent implements OnInit {
  user:user[]=[];
  ranking:ranking = {id_ranking:0,id_teacher:0,name:"",code:"", image:""  }
  currentTask:task = {id_task:0,name:"",id_ranking:0};
  user2:user;


  constructor(public rankingService:RankingService, private UserRankingService:UserRankingService, public usersService:UsersService,
    private modal:BsModalService, private commonService: CommonService, private apiService:ApiService) {
    this.user2 = this.usersService.getCurrentUser();
    if(this.usersService.isSession()){
      this.ranking = this.rankingService.getCurrentRanking();
      this.getRankingUsers();
    }
   }

  ngOnInit(): void {}

  getRankingUsers(){
  this.user = this.orderUsersByScore();
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
        console.log(user,score);
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

  deletetask(){
    console.log(this.currentTask);
    this.rankingService.getTasks().forEach(element => {
      if(element.id_task == this.currentTask.id_task){
        this.rankingService.setCurrentTask(element);
      }
    });
    if (!!this.rankingService.getCurrentTask()) {
      Swal.fire({
        title: 'Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórrala!'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(this.currentTask.id_task)
          this.apiService.deleteTask(this.currentTask.id_task).then(()=>{
            this.rankingService.fetchTasks().then(()=>{
              Swal.fire({
                title:'Eliminado!',
                text:'Su tarea ha sido eliminada.',
                icon:'success',
                showConfirmButton: false,
                timer: 1000
              })
            })

          });
        }
      });
    }else{
      this.commonService.sweetalert("error","No has selecionado ninguna tarea");
    }
  }

  deleteUser(user: user){
    Swal.fire({
      title: 'Estas seguro que quieres eliminar a este usuario del ranking?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUserRanking(user.id, this.ranking.id_ranking).then(()=>{
          this.UserRankingService.getUsersById().then(()=>{
            Swal.fire({
              title:'Eliminado!',
              text:'Su ranking ha sido eliminado.',
              icon:'success',
              showConfirmButton: false,
              timer: 1000
            })
          })
        });
      }
    });
  }
}
