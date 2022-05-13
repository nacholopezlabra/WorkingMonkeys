import { Injectable } from '@angular/core';
import { pentabilities } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';
import { UsersService } from '../userService/users.service';
import { CommonService } from '../commonService/common.service';

@Injectable({
  providedIn: 'root'
})
export class PentabilitiesServiceService {

  pentabilities: pentabilities[]=[];
  constructor(private apiService:ApiService, private userService:UsersService, private commonService:CommonService) { }

  async getPentabilities(){
    this.pentabilities = [];
  let data = {
    userType:this.userService.getCurrentUser().userType,
    id:this.userService.getCurrentUser().id
  }
  await this.apiService.getPentabilities().then((data:any)=>{
    let res = data.data;
    if(res != 1 && res !=104){
      this.pentabilities = res;
    }
    console.log(this.pentabilities);

  });
  }

  fetchPentabilities(){
    return this.pentabilities;
  }

  async createPentabilities(pentabilities:any){
    this.apiService.createPentabilitie(pentabilities);
  }

}
