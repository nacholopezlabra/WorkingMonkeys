import { Component, OnInit } from '@angular/core';
import { pentabilities, user } from 'src/app/model/interfaces';
import { PentabilitiesServiceService } from 'src/app/services/pentabilitiesService/pentabilities-service.service';
import { UsersService } from 'src/app/services/userService/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ExplanationPentabilitiesComponent } from '../explanation-pentabilities/explanation-pentabilities.component';


@Component({
  selector: 'app-pentabilities-explanation',
  templateUrl: './pentabilities-explanation.component.html',
  styleUrls: ['./pentabilities-explanation.component.css']
})
export class PentabilitiesExplanationComponent implements OnInit {
  user: user;
  pentabilities: pentabilities[]=[];

  constructor(public usersService: UsersService, private pentabilitiesService: PentabilitiesServiceService, private modal:BsModalService) {
    this.user = this.usersService.getCurrentUser();
    console.log(this.user);

    this.pentabilitiesService.getPentabilities().then(()=>{
      this.pentabilities = this.pentabilitiesService.fetchPentabilities();
      console.log(this.pentabilities);
    });
  }

  ngOnInit(): void {}

  abrirmodal(item:any){
    this.pentabilitiesService.setCurrentPenta(item);
    this.modal.show(ExplanationPentabilitiesComponent,{backdrop: 'static', keyboard: false});
  }
}
