import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ranking, user } from 'src/app/model/interfaces';
import { CommonService } from 'src/app/services/commonService/common.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UsersService } from 'src/app/services/userService/users.service';


@Component({
  selector: 'app-add-rankings',
  templateUrl: './add-rankings.component.html',
  styleUrls: ['./add-rankings.component.css']
})
export class AddRankingsComponent implements OnInit {

  ranking: ranking = {id_ranking:1, name:"", id_teacher:17, code:"", image:""};
  apiService: any;
  imgBase64Path: string = '';
  isImageSaved: boolean = false;
  cardImageBase64: string = '';

  constructor(private modal:BsModalService, private commonService: CommonService, private rankingService: RankingService,
    private usersService: UsersService){
      this.ranking.id_teacher = this.usersService.getCurrentUser().id;
      this.ranking.code = this.rankingService.randomCodeRanking(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

  ngOnInit(): void {}

  closeDialog(){
    this.modal.hide();
  }

  crearRanking(){

    if (this.ranking.name=="") {
      this.commonService.sweetalert("error","Has de introduir un nombre de ranking");
    }
    else{
      this.rankingService.createRanking(this.ranking);
      this.modal.hide();
    }


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
