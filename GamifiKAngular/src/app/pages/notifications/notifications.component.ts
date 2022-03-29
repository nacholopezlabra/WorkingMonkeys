import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/apiService/api.service';
import { NotificationsService } from 'src/app/services/notis/notifications.service';
import { UsersService } from 'src/app/services/userService/users.service';

@Component({
  selector: 'app-notificacions',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  user: user;
  constructor(public usersService: UsersService,  private apiService:ApiService, public notisService:NotificationsService) {
  this.user = this.usersService.getCurrentUser();
}
  ngOnInit(): void {
    this.notisService.getData(this.user);
  }




}
