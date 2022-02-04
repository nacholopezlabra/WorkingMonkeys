import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiService/api.service';
import { UsersService } from 'src/app/services/userService/users.service';
import * as sha512 from 'js-sha512';


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


  constructor(
    private router: Router,
    public apiService: ApiService,
    private userService: UsersService,

  ) {}

  //REGISTRO

  onSubmit() {
    this.user.nickname = this.validateUser.get('nickname')?.value;
    this.user.mail = this.validateUser.get('mail')?.value;
    this.user.name = this.validateUser.get('name')?.value;
    this.user.surname = this.validateUser.get('surname')?.value;
    this.user.center = this.validateUser.get('center')?.value;
    this.user.birthday = this.validateUser.get('birthday')?.value;
    this.user.userType = 1;
    this.user.password = this.cifrar(this.validateUser.get('password')?.value);
    this.register();
    console.log(this.user.password);
  }
cifrar(pass:string){
   return sha512.sha512(pass);
}


  async register() {
    let res: any;
    if (this.validateUser.get('password')?.value == this.validateUser.get('confirmPassword')?.value) {
      await this.apiService.register(this.user).subscribe(
        (data) => {
          console.log(data);
          if(data.data == 3){//el tres lo usamos para comprobar que la peticion se ha hecho correctamente
            this.logIn(this.user.nickname,this.user.password);
          }else if(data.data == 2){ //el dos lo usamos para decir que el correo que el usuario a puesta ya esta en uso
            console.log("email ya en uso");
          }else if(data.data == 1){ // el uno lo usamos para decir que el nickname del usuario ya existe
            console.log("usuario ya existe")
          }

        },
        (error) => {
          console.log(error)
        }
      );
    }else{
      console.log("la password no es igual");
    }
  }

  ngOnInit(): void {}

  //LOGIN
  async logIn(user?:string, pass?:string) {
    console.log(user,pass);
    let res: any;
    if(user != undefined && pass != undefined){ //el login del usuario cuando se registra
      await this.apiService.logIn(user,pass).subscribe((data) => {
          res = data.data;
          console.log(res);
          if(res.id){
            this.userService.fetchCurrentUser(res);
            this.router.navigate(['profile']);
          }else if (res == 2){
            console.log("la contraseña o el usuario no son validos");
          }

        },(error) => {
          console.log('Me ha dado error');
        }
      );
    }else{ //el login del usuario utilizando el html
      await this.apiService.logIn(this.validateLog.get('nickname')?.value,this.cifrar(this.validateLog.get('password')?.value))
      .subscribe((data) => {
          res = data.data;
          console.log(res);
        if(res.id){
          this.userService.fetchCurrentUser(res);
          this.router.navigate(['profile']);
        }else if (res == 2){
          console.log("la contraseña o el usuario no son validos");
        }

        },(error) => {
          console.log('Me ha dado error');
        }
      );
    }

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
