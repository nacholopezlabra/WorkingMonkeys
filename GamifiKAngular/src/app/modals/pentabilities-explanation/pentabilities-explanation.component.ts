import { Component, OnInit } from '@angular/core';
import { pentabilities, user } from 'src/app/model/interfaces';
import { PentabilitiesServiceService } from 'src/app/services/pentabilitiesService/pentabilities-service.service';
import { UsersService } from 'src/app/services/userService/users.service';


@Component({
  selector: 'app-pentabilities-explanation',
  templateUrl: './pentabilities-explanation.component.html',
  styleUrls: ['./pentabilities-explanation.component.css']
})
export class PentabilitiesExplanationComponent implements OnInit {
  user: user;
  pentabilities: pentabilities[]=[];

  constructor(public usersService: UsersService, private pentabilitiesService: PentabilitiesServiceService) {
    this.user = this.usersService.getCurrentUser();
    console.log(this.user);

    this.pentabilitiesService.getPentabilities().then(()=>{
      this.pentabilities = this.pentabilitiesService.fetchPentabilities();
      console.log(this.pentabilities);
    });
  }

  ngOnInit(): void {}
}
