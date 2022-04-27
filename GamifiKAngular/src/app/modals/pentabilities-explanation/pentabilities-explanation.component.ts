import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { pentabilities } from 'src/app/model/interfaces';
import { PentabilitiesServiceService } from 'src/app/services/pentabilitiesService/pentabilities-service.service';

@Component({
  selector: 'app-pentabilities-explanation',
  templateUrl: './pentabilities-explanation.component.html',
  styleUrls: ['./pentabilities-explanation.component.css']
})
export class PentabilitiesExplanationComponent implements OnInit {
  pentabilities: pentabilities[]=[];

  constructor(private modal:BsModalService, private pentabilitiesService: PentabilitiesServiceService) {
  this.pentabilitiesService.getPentabilities().then(()=>{
    this.pentabilities = this.pentabilitiesService.fetchPentabilities();
    console.log(this.pentabilities);
  });

  }


  ngOnInit(): void {
  }

  closeDialog(){
    this.modal.hide();
  }
}
