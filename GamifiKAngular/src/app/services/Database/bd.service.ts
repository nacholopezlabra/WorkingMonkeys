import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor() { }


  pushData(bdSlot:string,data:any):void{
    //save data inside localStorage, to use it you must put a string on bdSlot, ex:'users';
    localStorage.setItem(bdSlot,JSON.stringify(data));
  }

  fetchData(bdSlot:string){
    //return data from localStorage.
    return JSON.parse(localStorage.getItem(bdSlot)!);
  }


}
