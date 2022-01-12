import { Injectable } from '@angular/core';
import { user } from 'src/app/model/users';
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

  private fetchCurrentUser():void{ //hardcoded user;
    this.currentUser = {id:1, nickname:"wotroyer",mail:"joelhervera@gmail.com",password:"1234",name:"Joel",surname:"Hervera",birthday:new Date("17/09/1999"),userType:0,image:""};
  }

  public getCurrentUser():user|undefined{
    if(this.currentUser){
      return this.currentUser;
    }
    return;

  }

}
