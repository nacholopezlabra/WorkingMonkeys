import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/commonService/common.service';


@Component({
  selector: 'app-add-rankings',
  templateUrl: './add-rankings.component.html',
  styleUrls: ['./add-rankings.component.css']
})
export class AddRankingsComponent {
  name = "";

  constructor(private modal:BsModalService, private commonService: CommonService){
  }

  closeDialog(){
    this.modal.hide();
  }

  crearRanking(){
    console.log(this.name);
    if (this.name=="") {
      this.commonService.sweetalert("error","Has de introduir un nombre de ranking");
    }
    else{
      this.commonService.sweetalert("success","Ranking creado correctamente").then((result)=>{
      this.modal.hide();
      })
    }


  }

}
