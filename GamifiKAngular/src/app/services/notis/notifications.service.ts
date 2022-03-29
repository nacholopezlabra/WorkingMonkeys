import { Injectable } from '@angular/core';
import { notis, request, user } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';
import { CommonService } from '../commonService/common.service';
import { UsersService } from '../userService/users.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notis:notis[] = [];
  private request : request[] =[];

  constructor(private apiService:ApiService, private common:CommonService, private userService:UsersService) { }

  async getData(user:user){
    if(user.userType == 1){
      await this.apiService.getRequests(user.id).then((data:any)=>{
        let res = data.data;
        if(!!res.length){
          this.request = res;
          console.log(this.request)
        }else{
          this.request = [];
        }
      })
    }else if(user.userType == 0){
      await this.apiService.getNotis(user.id).then((data:any)=>{
        let res = data.data;
        if(!!res.length){
          this.notis = res;
          console.log(this.notis)
        }else{
          this.notis = [];
        }
      });
    }

  }

  getNotis(){
    return this.notis;
  }

  getRequests(){
    return this.request;
  }

  async answerRequest(req:request,status:number /*status can be 1 or 2 (1 to accept 2 to deny)*/){
    await this.apiService.acceptRequest(req.id,status).then((data:any)=>{
      if(data.data == 3){
        this.common.sweetalert('success',"El usuario ha sido acceptado");
        this.getData(this.userService.getCurrentUser());
      }else if (data.data == 5){
        this.common.sweetalert('success',"El usuario ha sido rechazado");
        this.getData(this.userService.getCurrentUser());
      }
    })
  }

  deleteNoti(id:number){
    this.apiService.deleteNotis(id).then((data:any)=>{
      if(data.data == 3){
        this.common.sweetalert('success',"La notificación ha sido borrada");
        this.getData(this.userService.getCurrentUser());
      }
    })
  }
}
