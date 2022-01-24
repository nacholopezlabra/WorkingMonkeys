import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiService/api.service';
import { UsersService } from 'src/app/services/userService/users.service';

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
    birthday: new Date(),
    userType: 0,
    image: '',
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    private userService: UsersService
  ) {}

  //REGISTRO

  onSubmit() {
    this.user.nickname = this.validateUser.get('nickname')?.value;
    this.user.mail = this.validateUser.get('mail')?.value;
    this.user.password = this.validateUser.get('password')?.value;
    this.user.name = this.validateUser.get('name')?.value;
    this.user.surname = this.validateUser.get('surname')?.value;
    this.user.center = this.validateUser.get('center')?.value;
    this.user.image = this.validateUser.get('image')?.value;
    this.user.birthday = this.validateUser.get('birthday')?.value;
    this.user.userType = 1;
  }

  async apicall() {
    let res: any;
    if (this.validateUser.get('password')?.value == this.validateUser.get('confirmPassword')?.value) {
      await this.apiService.register(this.user).subscribe(
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
    }else{
      console.log("la password no es igual");
    }
  }

  ngOnInit(): void {}

  //LOGIN
  async passwordMatchValidator() {
    console.log(this.validateLog.get('password'));
    let controlForm: boolean = true;

    let res: any;

    await this.apiService
      .logIn(
        this.validateLog.get('nickname')?.value,
        this.validateLog.get('password')?.value
      )
      .subscribe(
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
