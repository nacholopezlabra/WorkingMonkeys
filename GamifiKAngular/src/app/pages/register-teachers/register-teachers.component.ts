import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/model/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-teachers',
  templateUrl: './register-teachers.component.html',
  styleUrls: ['./register-teachers.component.css']
})
export class RegisterTeachersComponent implements OnInit {

  constructor(private router: Router) { }

//REGISTRO
  user: user = { id: 0, nickname: "", mail: "", password: "", name: "", surname: "", center: "", birthday: new Date(), userType: 0, image: "" };
  onSubmit() {
    this.user.nickname = this.validateUser.get('nick')?.value;
    this.user.mail = this.validateUser.get('mail')?.value;
    this.user.password = this.validateUser.get('password')?.value;
    this.user.name = this.validateUser.get('name')?.value;
    this.user.surname = this.validateUser.get('surname')?.value;
    this.user.center = this.validateUser.get('contrasena')?.value;
    this.user.image = this.validateUser.get('confirmarcontrasena')?.value;

  }
  validateUser: FormGroup = new FormGroup({
    nick: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl(''),
    namne: new FormControl(''),
    surname: new FormControl(''),
    center: new FormControl(''),
    image: new FormControl('')

  });

  ngOnInit(): void {
    this.validateUser = new FormGroup({
      nick: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      center: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl('', [Validators.required]),
    });
  }

  //LOGIN
passwordMatchValidator() {
    
       
  console.log(this.validateUser.get('password'));
  let controlForm:boolean = true;
  if(!this.validateUser.get('password')?.value == this.validateUser.get('password')?.value){
   controlForm = false;
  }


  if(controlForm){
   Swal.fire(
     'Correcto!',
     'Te has logeado exitosamente!',
     'success'
   )
   this.router.navigate(['profile']);
  
}
  }
}
