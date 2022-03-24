import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/apiService/api.service';
import { UsersService } from 'src/app/services/userService/users.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  user: user;
  constructor(public usersService: UsersService,  private apiService:ApiService) {
  this.user = this.usersService.getCurrentUser();
  console.log(this.user);
}
  ngOnInit(): void {
  }

}
