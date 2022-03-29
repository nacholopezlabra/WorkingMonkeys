import { Injectable } from '@angular/core';
import { notis, request, user } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private notis:notis[] = [];
  private request : request[] =[];

  constructor(private apiService:ApiService) { }

  async getData(user:user){
    if(user.userType == 1){
      await this.apiService.getRequests(user.id).then((data:any)=>{
        let res = data.data;
        if(!!res.length){
          this.request = res;
          console.log(this.request)
        }
      })
    }else if(user.userType == 0){
      await this.apiService.getNotis(user.id).then((data:any)=>{
        let res = data.data;
        if(!!res.length){
          this.notis = res;
          console.log(this.notis)
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
}
