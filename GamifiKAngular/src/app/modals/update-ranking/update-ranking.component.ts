import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ranking } from 'src/app/model/interfaces';
import { CommonService } from 'src/app/services/commonService/common.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-ranking',
  templateUrl: './update-ranking.component.html',
  styleUrls: ['./update-ranking.component.css']
})
export class UpdateRankingComponent implements OnInit {
  codeUpdated:boolean =false;
  ranking: ranking = {id_ranking: 0, name: '', id_teacher: 0,code: '', image:""};
  apiService: any;
  imgBase64Path: string = '';
  isImageSaved: boolean = false;
  cardImageBase64: string = '';

  constructor(private modal:BsModalService, private commonService: CommonService, private rankingService: RankingService,  private router:Router)
  {}

  ngOnInit(): void {
    this.ranking = this.rankingService.getCurrentRanking();
    console.log(this.ranking);
  }

  closeDialog(){
    this.modal.hide();
  }

  async updateRanking(){
    if (this.ranking.name=="") {
      this.commonService.sweetalert("error","Has de introduir un nombre de ranking");
    }
    else{
      await this.rankingService.updateRanking(this.ranking).then(()=>{
        this.modal.hide();
      });
    }
  }
  generateCode(){
    this.ranking.code=this.rankingService.randomCodeRanking(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    this.codeUpdated=true;
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          this.imgBase64Path = e.target.result;
          this.cardImageBase64 = this.imgBase64Path;
          this.isImageSaved = true;
          this.ranking.image = this.cardImageBase64;
          console.log(this.ranking)
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
