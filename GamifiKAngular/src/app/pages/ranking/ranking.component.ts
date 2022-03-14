import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/apiService/api.service';
import { UsersService } from 'src/app/services/userService/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { AddRankingsComponent } from 'src/app/modals/add-rankings/add-rankings.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  user: user;

  constructor(
    private usersService: UsersService,
    private modal:BsModalService,
    public rankingService: RankingService,
    private apiService:ApiService
  ) {
    this.user = this.usersService.getCurrentUser();
  }

  ngOnInit(): void {}

  createRanking(){
    this.modal.show(AddRankingsComponent);
  }

  borrarRanking(data:any){
    Swal.fire({
      title: 'Estas segur?',
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
        })
      }
    })
  }
}
