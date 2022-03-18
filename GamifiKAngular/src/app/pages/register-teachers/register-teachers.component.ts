import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/userService/users.service';
import * as sha512 from 'js-sha512';
import { CommonService } from 'src/app/services/commonService/common.service';
import { DbService } from 'src/app/services/Database/db.service';
import { Router } from '@angular/router';
import { RankingService } from 'src/app/services/rankingService/ranking.service';


@Component({
  selector: 'app-register-teachers',
  templateUrl: './register-teachers.component.html',
  styleUrls: ['./register-teachers.component.css'],
})
export class RegisterTeachersComponent implements OnInit {
  validateUser: FormGroup = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    center: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
  });
  validateLog: FormGroup = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  user: user = {
    id: 0,
    nickname: '',
    mail: '',
    password: '',
    name: '',
    surname: '',
    center: '',
    birthday: "",
    userType: 0,
    image: '',
  };

  imgBase64Path: string = '';
  isImageSaved: boolean = false;
  cardImageBase64: string = '';


  constructor( private userService: UsersService, private commonService: CommonService, private db:DbService,
    private router : Router, private rankingService:RankingService) {
      if(!!this.db.fetchData("sessionToken")){
        this.userService.setSession(this.db.fetchData("sessionToken"));
        this.userService.fetchCurrentUser(this.db.fetchData("user"));
        if(this.userService.isSession()){
          this.rankingService.fetchRankings();
          this.commonService.sweetalert("success","Iniciando Session").then(()=>{
            this.router.navigate(['ranking']);
          })
        }
      }
    }

  ngOnInit(): void {


  }

  //REGISTRO

  onSubmit() {
    this.user.nickname = this.validateUser.get('nickname')?.value;
    this.user.mail = this.validateUser.get('mail')?.value;
    this.user.name = this.validateUser.get('name')?.value;
    this.user.surname = this.validateUser.get('surname')?.value;
    this.user.center = this.validateUser.get('center')?.value;
    this.user.birthday = this.validateUser.get('birthday')?.value;
    this.user.userType = 1;
    this.user.password = this.encode(this.validateUser.get('password')?.value);
    this.register();
    console.log(this.user.password);
  }
encode(pass:string){
   return sha512.sha512(pass);
}



  async register() {

    if (this.validateUser.get('password')?.value == this.validateUser.get('confirmPassword')?.value) {
      this.userService.registerUser(this.user);
    }else{
      this.commonService.sweetalert("error","La contraseña no es la misma");
    }

  }


  //LOGIN
  async logIn() {
    let data = {
      user:this.validateLog.get('nickname')?.value,
      pass:this.encode(this.validateLog.get('password')?.value)
    }
    this.userService.logIn(data.user,data.pass);
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          this.imgBase64Path = e.target.result;
          this.cardImageBase64 = this.imgBase64Path;
          this.isImageSaved = true;
          this.user.image = this.cardImageBase64;
          console.log(this.user)
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }



}
