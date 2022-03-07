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
    })
  }

}
