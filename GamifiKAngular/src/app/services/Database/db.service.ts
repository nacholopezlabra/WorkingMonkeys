import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }


  pushData(dbSlot:string,data:any):void{
    //save data inside localStorage, to use it you must put a string on bdSlot, ex:'users';
    localStorage.setItem(dbSlot,JSON.stringify(data));
  }

  fetchData(dbSlot:string){
    //return data from localStorage.
    return JSON.parse(localStorage.getItem(dbSlot)!);
  }

  clear(dbSlot:string){
    localStorage.removeItem(dbSlot);
  }

}
