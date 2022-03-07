import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-rankings',
  templateUrl: './add-rankings.component.html',
  styleUrls: ['./add-rankings.component.css']
})
export class AddRankingsComponent {

  @ViewChild("myModalInfo", {static: false}) myModalInfo: TemplateRef<any> | undefined;
  @ViewChild("myModalConf", {static: false}) myModalConf: TemplateRef<any> | undefined;

  constructor(private modalService: NgbModal){

  }

  mostrarModalInfo(){
    this.modalService.open(this.myModalInfo);
  }

  mostrarModalConf(){
    this.modalService.open(this.myModalConf).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
    }, error => {
      console.log(error);
    });
  }
}
