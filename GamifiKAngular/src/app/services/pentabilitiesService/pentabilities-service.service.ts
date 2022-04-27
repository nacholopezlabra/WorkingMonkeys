import { Injectable } from '@angular/core';
import { pentabilities } from 'src/app/model/interfaces';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class PentabilitiesServiceService {

  pentabilities: pentabilities[]=[];
  constructor(private apiService:ApiService) { }

  async getPentabilities(){
    await this.apiService.getPentabilities().then(async (data:any)=>{
      if(data.data != 1){
        this.pentabilities = data.data;
      }
    });
  }

  fetchPentabilities(){
    return this.pentabilities;
  }

}
