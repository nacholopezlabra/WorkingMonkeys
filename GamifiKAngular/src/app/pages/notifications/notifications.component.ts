import { Component, OnInit } from '@angular/core';
import { request, user } from 'src/app/model/interfaces';
import { ApiService } from 'src/app/services/apiService/api.service';
import { CommonService } from 'src/app/services/commonService/common.service';
import { NotificationsService } from 'src/app/services/notis/notifications.service';
import { UsersService } from 'src/app/services/userService/users.service';

@Component({
  selector: 'app-notificacions',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  user: user;
  constructor(public usersService: UsersService, public notisService:NotificationsService, private common:CommonService) {
  this.user = this.usersService.getCurrentUser();
}
  ngOnInit(): void {
    this.notisService.getData(this.user);
  }


}
