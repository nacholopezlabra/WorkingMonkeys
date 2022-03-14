import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/apiService/api.service';
import { UsersService } from 'src/app/services/userService/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { AddRankingsComponent } from 'src/app/modals/add-rankings/add-rankings.component';

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
    public rankingService: RankingService
  ) {
    this.user = this.usersService.getCurrentUser();
  }

  ngOnInit(): void {}

  createRanking(){
    this.modal.show(AddRankingsComponent);
  }
}
