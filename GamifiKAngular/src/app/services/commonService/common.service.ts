import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }


  public sweetalert(icon:SweetAlertIcon,title:string){
    return Swal.fire({
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 1000
    });
  }
  public sweetAlertWithTimer(icon:SweetAlertIcon,title:string,timer:number){
    return Swal.fire({
      icon:icon,
      title:title,
      showConfirmButton:false,
      timer:timer
    })
  }
  public sweetAlertWithOutTimer(icon:SweetAlertIcon,title:string,button?:string){
    return Swal.fire({
      icon:icon,
      title:title,
      showConfirmButton:true,
    })
  }
}
