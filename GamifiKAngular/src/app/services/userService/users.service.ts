import { Injectable } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { DbService } from '../Database/db.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  students:user[] = [];//array that fetch all students from database;
  currentUser:user|undefined = undefined; //we use this var for the logged user(can be a teacher or a student);


  constructor(private db: DbService) {
    this.fetchCurrentUser();
   }

  public fetchCurrentUser(data?:user):void{ //hardcoded user;

    //this.currentUser = {id:1, nickname:"wotroyer",mail:"joelhervera@gmail.com",password:"1234",name:"Joel",surname:"Hervera",birthday:new Date("17/09/1999"),userType:0,image:""};
    this.currentUser = {id:2, nickname:"fonsiii1",mail:"fonsi@gmail.com",password:"1234",name:"fonsi",surname:"Garcia",birthday:new Date("17/09/1999"),userType:1,image:""};
    if(!!data){
      this.currentUser = data;
    }

  }

  public getCurrentUser():user|undefined{
    if(this.currentUser){
      return this.currentUser;
    }
    return;

  }
  public logOut(){
    this.currentUser = undefined;
  }

}
