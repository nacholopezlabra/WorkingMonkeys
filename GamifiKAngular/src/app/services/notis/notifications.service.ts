import { Injectable } from '@angular/core';
import { notis, request } from 'src/app/model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notis:notis[] = [];
  request : request[] =[];

  constructor() { }

  getRequests(){

  }
}
