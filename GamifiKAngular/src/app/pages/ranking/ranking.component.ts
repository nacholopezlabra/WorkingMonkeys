import { Component, OnInit } from '@angular/core';
import { ranking, user } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/apiService/api.service';
import { UsersService } from 'src/app/services/userService/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { AddRankingsComponent } from 'src/app/modals/add-rankings/add-rankings.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UpdateRankingComponent } from 'src/app/modals/update-ranking/update-ranking.component';
import { UserRankingService } from 'src/app/services/userRankingService/user-ranking.service';
import { JoinRankingComponent } from 'src/app/modals/join-ranking/join-ranking.component';
import { PentabilitiesExplanationComponent } from 'src/app/modals/pentabilities-explanation/pentabilities-explanation.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  user: user;
  ranking:ranking[]=[];

  constructor(public usersService: UsersService, public rankingService: RankingService, private modal:BsModalService,
    private apiService:ApiService, private router:Router, private userRankingService:UserRankingService) {
    this.user = this.usersService.getCurrentUser();
    console.log(this.user);

    if(this.usersService.isSession()){
      this.fetchRankings();
    }
  }

  ngOnInit(): void {}

  async fetchRankings(){
    await this.rankingService.fetchRankings().then(()=>{
      this.ranking = this.rankingService.getRankings();
    });

  }

  createRanking(){
    this.modal.show(AddRankingsComponent,{backdrop: 'static', keyboard: false});
  }

  addUserRanking(){
    this.modal.show(JoinRankingComponent,{backdrop: 'static', keyboard: false});
  }

  deleteRanking(ranking:ranking){
    Swal.fire({
      title: 'Estas seguro?',
      text: "??No podr??s revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '??S??, b??rralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteRankings(ranking.id_ranking, ranking.id_teacher).then(()=>{
          this.rankingService.fetchRankings().then(()=>{
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

   toRankingDetails(rank:any){
    this.rankingService.setCurrentRanking(rank);
    this.rankingService.fetchTasks().then(()=>{
      this.userRankingService.getUsersById().then((res)=>{
        this.router.navigate(['rankingDetails']);
      });
    });

  }
  modifyRanking(rank: any){
    this.rankingService.setCurrentRanking(rank);
    this.modal.show(UpdateRankingComponent,{backdrop: 'static', keyboard: false});
  }
}
