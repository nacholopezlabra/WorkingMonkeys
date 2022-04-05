import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/commonService/common.service';
import { ApiService } from 'src/app/services/apiService/api.service';
import { UsersService } from 'src/app/services/userService/users.service';
import * as sha512 from 'js-sha512';
import { SessionService } from 'src/app/services/session/session.service';
import { RankingService } from 'src/app/services/rankingService/ranking.service';
import { NotificationsService } from 'src/app/services/notis/notifications.service';
import { DbService } from 'src/app/services/Database/db.service';

@Component({
  selector: 'app-register-students',
  templateUrl: './register-students.component.html',
  styleUrls: ['./register-students.component.css']
})
export class RegisterStudentsComponent implements OnInit {
  validateUser: FormGroup = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required])
  });
  validateLog: FormGroup = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  user: user = { id: 0, nickname: "", mail: "", password: "", name: "", surname: "", birthday: "", userType: 0, image: "" };
  imgBase64Path: string = '';
  isImageSaved: boolean = false;
  cardImageBase64: string = '';

  constructor(private userService: UsersService, private commonService: CommonService, private db:DbService,
    private router : Router, private rankingService:RankingService, private notisService:NotificationsService,
    private sessionService:SessionService) {

      if(!!this.db.fetchData("sessionToken")){
        this.userService.setSession(this.db.fetchData("sessionToken"));
        this.userService.fetchCurrentUser(this.db.fetchData("user"));
        if(this.userService.isSession()){
          this.rankingService.fetchRankings();
          this.notisService.getData(this.userService.getCurrentUser());
          this.commonService.sweetalert("success","Iniciando Session").then(()=>{
            this.sessionService.startIdle();
            this.router.navigate(['ranking']);
          })
        }
      }
  }

  //REGISTRO

  onSubmit() {
    this.user.nickname = this.validateUser.get('nickname')?.value;
    this.user.mail = this.validateUser.get('mail')?.value;
    this.user.password = this.encode(this.validateUser.get('password')?.value);
    this.user.name = this.validateUser.get('name')?.value;
    this.user.surname = this.validateUser.get('surname')?.value;
    this.user.center = null;
    this.user.birthday = this.validateUser.get('birthday')?.value;
    this.user.userType = 0;
    this.register();
  }
  encode(pass:string){
    return sha512.sha512(pass);
 }

  register(): void {
    if (this.validateUser.get('password')?.value == this.validateUser.get('confirmPassword')?.value) {
      this.userService.registerUser(this.user);
    }else{
      this.commonService.sweetalert("error", "La password no es igual");
    }
  }

  ngOnInit(): void {}

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
