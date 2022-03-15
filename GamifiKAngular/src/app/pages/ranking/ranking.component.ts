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

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  user: user;
  ranking:ranking[]=[];
  constructor(private usersService: UsersService, public rankingService: RankingService, private modal:BsModalService,
    private apiService:ApiService, private router:Router, private userRankingService:UserRankingService) {
    this.user = this.usersService.getCurrentUser();
    if(this.usersService.isSession()){
      this.ranking = this.rankingService.getRankings();
    }
  }

  ngOnInit(): void {}

  createRanking(){
    this.modal.show(AddRankingsComponent);
  }

  borrarRanking(data:any){

    Swal.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteRankings(data);
        Swal.fire({
          title:'Eliminado!',
          text:'Su ranking ha sido eliminado.',
          icon:'success',
          showConfirmButton: false,
          timer: 1000
        });
      }
    });

  }

  toRankingDetails(rank:any){

    this.rankingService.setCurrentRanking(rank);
    this.rankingService.fetchTasks();
    this.userRankingService.getUsersById();
    this.router.navigate(['rankingDetails']);

  }

  editarRanking(){
    this.modal.show(UpdateRankingComponent);
  }
}
