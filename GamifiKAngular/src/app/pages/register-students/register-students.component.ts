import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiService/api.service';
import { UsersService } from 'src/app/services/userService/users.service';

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
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required])
  });
  validateLog: FormGroup = new FormGroup({
    nickname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  user: user = { id: 0, nickname: "", mail: "", password: "", name: "", surname: "", birthday: new Date(), userType: 0, image: "" };

  constructor(private router: Router, private apiService: ApiService, private userService: UsersService) { }

  //REGISTRO

  onSubmit() {
    this.user.nickname = this.validateUser.get('nick')?.value;
    this.user.mail = this.validateUser.get('mail')?.value;
    this.user.password = this.validateUser.get('password')?.value;
    this.user.name = this.validateUser.get('name')?.value;
    this.user.surname = this.validateUser.get('surname')?.value;
    this.user.image = this.validateUser.get('confirmarcontrasena')?.value;
  }

  ngOnInit(): void {

  }

  //LOGIN
  async passwordMatchValidator() {


    console.log(this.validateLog.get('password'));
    let controlForm: boolean = true;

    let res: any;

    await this.apiService.logIn(this.validateLog.get("nickname")?.value,this.validateLog.get("password")?.value ).subscribe(
      (data) => {
        res = data.data;
        console.log(res);
        this.userService.fetchCurrentUser(res);
        this.router.navigate(['profile']);
      },
      (error) => {
        console.log('Me ha dado error');
      }
    );
  }
}
