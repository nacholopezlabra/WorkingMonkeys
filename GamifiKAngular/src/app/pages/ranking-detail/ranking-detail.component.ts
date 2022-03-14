import { Component, OnInit } from '@angular/core';
import { ranking } from 'src/app/model/interfaces';
import { RankingService } from 'src/app/services/rankingService/ranking.service';

@Component({
  selector: 'app-ranking-detail',
  templateUrl: './ranking-detail.component.html',
  styleUrls: ['./ranking-detail.component.css']
})
export class RankingDetailComponent implements OnInit {



  constructor(private rankingService:RankingService) {

   }

  ngOnInit(): void {

  }

}
