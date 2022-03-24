import { Injectable } from '@angular/core';
import { notis, request } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notis:notis[] = [];
  request : request[] =[];

  constructor(private apiSerivce:ApiService) { }

  async getRequests(id:number){
    await this.apiSerivce.getRequests(id).then((data:any)=>{
      let res = data.data;
      if(!res.length){
        this.request = res;
        console.log(this.request)
      }
    })
  }
}
