import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/apiService/api.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { UsersService } from 'src/app/services/userService/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: user | undefined = undefined;
  passwordShowed: boolean = false;
  lastPassword : string = "";
  newPassword: string = "";
  repeatNewPassword: string = "";


  constructor(
    private usersService: UsersService,
    public rankingService: RankingService,
    private apiService: ApiService
  ) {
    this.user = this.usersService.getCurrentUser();
  }




  ngOnInit(): void {}

  showPassword(): void {
    if (!this.passwordShowed) {
      this.passwordShowed = true;
    } else {
      this.passwordShowed = false;
    }
  }
  changePassword(){

  }

}
