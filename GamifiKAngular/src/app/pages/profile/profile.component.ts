import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/users';
import { UsersService } from 'src/app/services/userService/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:user|undefined = undefined;
  passwordShowed:boolean =false;
  constructor(private usersService:UsersService) {

    this.user = this.usersService.getCurrentUser();

   }

  ngOnInit(): void {
  }

  showPassword():void{
    if(!this.passwordShowed){
      this.passwordShowed = true;
    }else{
      this.passwordShowed = false;
    }

  }






}
