import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { pentabilities, user } from 'src/app/model/interfaces';
import { PentabilitiesServiceService } from 'src/app/services/pentabilitiesService/pentabilities-service.service';


@Component({
  selector: 'app-explanation-pentabilities',
  templateUrl: './explanation-pentabilities.component.html',
  styleUrls: ['./explanation-pentabilities.component.css']
})
export class ExplanationPentabilitiesComponent implements OnInit {
  pentabilities: pentabilities;
  constructor(private modal:BsModalService, private pentabilitiesService: PentabilitiesServiceService)
  {this.pentabilities = this.pentabilitiesService.getCurrentPenta(); }

  ngOnInit(): void {
  }

  closeDialog(){
    this.modal.hide();
  }

}
