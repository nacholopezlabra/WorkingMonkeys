import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/apiService/api.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UsersService } from 'src/app/services/userService/users.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  user: user;
  imgBase64Path: string = '';

  constructor(
    private usersService: UsersService,
    public rankingService: RankingService,
  ) {
    this.user = this.usersService.getCurrentUser();
  }

  ngOnInit(): void {}
}
