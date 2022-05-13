import { Component, OnInit } from '@angular/core';
import { pentabilities, user } from 'src/app/model/interfaces';
import { PentabilitiesServiceService } from 'src/app/services/pentabilitiesService/pentabilities-service.service';
import { UsersService } from 'src/app/services/userService/users.service';


@Component({
  selector: 'app-pentabilities-explanation',
  templateUrl: './pentabilities-explanation.component.html',
  styleUrls: ['./pentabilities-explanation.component.css']
})
export class PentabilitiesExplanationComponent implements OnInit {
  user: user;
  pentabilities: pentabilities = {id_pentabilitie: 1,name: "", explanation:"", image:""};
  apiService: any;
  imgBase64Path: string = '';
  isImageSaved: boolean = false;
  cardImageBase64: string = '';

  constructor(public usersService: UsersService, private pentabilitiesService: PentabilitiesServiceService) {
    this.user = this.usersService.getCurrentUser();
    console.log(this.user);
  }

  ngOnInit(): void {}

  crearPentabilities(){
    this.pentabilitiesService.createPentabilities(this.pentabilities);

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
          this.pentabilities.image = this.cardImageBase64;
          console.log(this.pentabilities)
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}



