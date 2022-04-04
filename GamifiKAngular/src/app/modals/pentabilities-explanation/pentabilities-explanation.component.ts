import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pentabilities-explanation',
  templateUrl: './pentabilities-explanation.component.html',
  styleUrls: ['./pentabilities-explanation.component.css']
})
export class PentabilitiesExplanationComponent implements OnInit {

  constructor(private modal:BsModalService) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.modal.hide();
  }


}
